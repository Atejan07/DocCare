/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckSquareOutlined,
  FieldTimeOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import apiService from '@/services/APIservices';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import {
  formatDate,
  formatTime,
  getAccessToken,
  openMessage,
} from '@/app/helper';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;

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

  useEffect(() => {
    if (messageContent) {
      openMessage(messageApi, 'updatable', messageContent, router, '/doctor');
    }
  }, [messageContent]);

  return (
    <main className='doctor-appointments-box'>
      {contextHolder}

      <div className='dashboard-container doctor-patients-container'>
        <h3>Next appointment</h3>
        {appointments
          ?.filter(
            (appointment) =>
              new Date(`${appointment.date}`).valueOf() < Date.now().valueOf()
          )
          // .sort((a, b) => {
          //   const first = Number(a.time.slice(0, 2));
          //   const second = Number(b.time.slice(0, 2));
          //   return first - second;
          // })
          .slice(0, 1)
          .map((appointment, idx) => (
            <div
              className='profile-boxes profile-boxes-violet each-item-appointments'
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
                <span className='attend-btn'>
                  <a
                    href={`tel:${appointment.patientAppointment?.phoneNumber}`}
                  >
                    <PhoneOutlined style={{ fontSize: '30px' }} />
                  </a>
                </span>
              </div>
            </div>
          ))}
        <h3>My appointments</h3>
        {appointments
          ?.filter(
            (appointment) =>
              new Date(`${appointment.date}`).valueOf() > Date.now().valueOf()
          )
          .slice(1, 3)
          .map((appointment, idx) => (
            <div
              className='profile-boxes-blue each-item each-item-appointments'
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
          href='/doctor/appointments'
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded btn-see-all'
        >
          See all
        </Link>
      </div>
    </main>
  );
}
