/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckSquareOutlined,
  CheckSquareTwoTone,
  FieldTimeOutlined,
} from '@ant-design/icons';
import apiService from '@/services/APIservices';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { formatDate, formatTime, getAccessToken } from '@/app/helper';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;
  console.log(appointments);

  function handleAttendAppointment(clickedId: string) {
    console.log('clicked');
    console.log(clickedId);
    const token = getAccessToken() as string;
    return appointments?.map(async (appointment) => {
      if (appointment.id === clickedId) {
        console.log(appointment.id);
        await apiService.attendAppointment(appointment.id, token);
        setMessageContent('Appointment maked as attended');
      }
    });
  }

  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');
  const key = 'updatable';

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: messageContent,
        duration: 2,
      });
      setTimeout(() => {
        router.push('/doctor/dashboard');
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (messageContent) {
      openMessage();
    }
  }, [messageContent]);

  return (
    <main className='doctor-appointments-box'>
      {contextHolder}
      <div className='dashboard-container doctor-patients-container'>
        <h3>My appointments</h3>
        {appointments
          ?.filter(
            (appointment) =>
              new Date(`${appointment.date}`).valueOf() > Date.now().valueOf()
          )
          .slice(0, 3)
          .map((appointment, idx) => (
            <div
              className='profile-boxes profile-boxes-blue each-item each-item-appointments'
              key={idx}
            >
              <div>
                <p id='name'>{appointment.patientAppointment?.name}</p>
                <p id='gender'>{appointment.patientAppointment?.gender}</p>
              </div>
              <div className='time-of-appointment'>
                <p>{formatDate(appointment.date)}</p>
                <p>
                  {' '}
                  <FieldTimeOutlined />{' '}
                  {formatTime(appointment.time.slice(0, 5))}
                </p>
              </div>
              <div>
                {' '}
                <span
                  className='attend-btn'
                  onClick={() =>
                    handleAttendAppointment(appointment.id as string)
                  }
                >
                  <CheckSquareOutlined />
                </span>
              </div>
            </div>
          ))}

        <Link
          href='/doctor/dashboard/appointments'
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded btn-see-all'
        >
          See all
        </Link>
      </div>
    </main>
  );
}
