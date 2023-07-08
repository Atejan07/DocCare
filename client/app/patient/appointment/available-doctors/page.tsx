/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import '../../../css/patient.css';
import '../../../css/globals.css';
import apiService from '@/services/APIservices';
import { IllnessOptions } from '../../../../../server/types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { addAppointment } from '@/redux/features/appointment-slice';

import Image from 'next/image';
import { openMessage } from '@/app/helper';

export default function AvailableDoctorList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const availableSpecialists = useAppSelector(
    (state) => state.AvailableSpecialist.value
  );
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

  async function makeAppointment(
    date: string,
    time: string,
    illness: IllnessOptions,
    doctorId: string
  ) {
    console.log(time);
    const appointment = {
      date,
      time: `${time}:00`,
      illness,
      attended: false,
    };
    if (currentPatient && currentPatient.id) {
      const data = await apiService.createAppointment(
        currentPatient.id,
        appointment,
        doctorId
      );
      const { message, result } = data;
      if (result) {
        setMessageContent(message as string);
        setFormError('');
        //adding appoitment to redux to be able to view it in confirmation
        dispatch(addAppointment(appointment));
      } else {
        setFormError(`${data}`);
      }
    }
  }

  function availableSlots(slots: number[]) {
    const filledSlots = [] as number[];
    for (let slot = 9; slot <= 17; slot++) {
      filledSlots.push(slot);
    }
    if (slots.length === 0) {
      return filledSlots;
    } else {
      const unavailableSlots = [...slots] as number[];
      const newSlots = filledSlots.filter((slot) => {
        if (!unavailableSlots.includes(slot)) {
          return slot;
        }
      });
      return newSlots;
    }
  }

  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(
        messageApi,
        'updatable',
        messageContent,
        router,
        '/patient/appointment/confirmation'
      );
    }
  }, [messageContent]);

  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
      {contextHolder}
      {availableSpecialists.length > 0 ? (
        <main>
          <h2 className='text-2xl text-primary text-black m-4'>
            Choose your doctor and time slot
          </h2>

          <div>
            {availableSpecialists.map((available, idx) => {
              const doctorName = available.doctorName;
              const doctorId = available.doctorId;
              const doctorAbout = available.doctorAbout;
              const doctorProfilePic = available.doctorProfilePic;
              const illness = available.illness as IllnessOptions;
              const date = available.date;
              const slots = availableSlots(available.slots);
              console.log(doctorProfilePic);
              return (
                <div className='doctors-list each-doctor' key={idx}>
                  <Image
                    src={doctorProfilePic}
                    alt={doctorProfilePic}
                    width={70}
                    height={70}
                    className='profile-pic-70 mr-4'
                    style={{ marginRight: '1rem' }}
                  ></Image>
                  <div className='each-doctor-name'>
                    <h2>{doctorName}</h2>
                    <p>{doctorAbout}</p>
                    {formError && (
                      <p className='error-message'>
                        <ExclamationCircleTwoTone /> {formError}
                      </p>
                    )}
                    <div className='slots'>
                      {slots.map((slot, idx) => (
                        <div key={idx}>
                          <button
                            className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 m-1 border border-tertiary hover:border-transparent rounded'
                            id={slot.toString()}
                            onClick={() =>
                              makeAppointment(
                                date,
                                slot.toString(),
                                illness,
                                doctorId
                              )
                            }
                          >
                            {slot}:00
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      ) : (
        <main>
          <h2 className='text-2xl text-primary text-black m-4'>
            Choose your doctor and time slot
          </h2>
          <button
            className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 m-2 border border-tertiary hover:border-transparent rounded'
            onClick={() => router.back()}
          >
            Please, select another date
          </button>
        </main>
      )}
    </div>
  );
}
