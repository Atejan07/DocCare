'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge, toFirstLetterUpperCase } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { FieldTimeOutlined } from '@ant-design/icons';
import '../../../../css/globals.css';
import '../../../../css/patient.css';
import '../../../../css/doctor.css';
import Image from 'next/image';
import { TypeAppointment } from '../../../../../../server/types/types';

export default function Patient({ params }: { params: { id: string } }) {
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;
  const currentPatient = patients?.find((patient) => {
    return patient.id?.toString() == params.id;
  });

  return (
    <>
      <AuthNavbar user={'doctor'} auth={'login'} />

      <main className='grid-container'>
        <div className='patient-picture-box'>
          <Image
            src='{currentPatient?.profilePicture}'
            className='profile-image-patient'
            alt='profile-image-patient'
            height={150}
            width={150}
          />
        </div>

        <div className='main-info-patient-box main-info-patient'>
          <h3 className='text-3xl'>{currentPatient?.name}</h3>
          <h3 className='text-xl'>
            {calculateAge(currentPatient?.dateOfBirth as string).toString()}{' '}
            years old
          </h3>
          <p className='text-xl'>{currentPatient?.gender}</p>
          <h3 className='text-base'>Date Of Birth: {currentPatient?.dateOfBirth}</h3>
          <div className='phone-email-container'>
            <a href={`tel:${currentPatient?.phoneNumber}`}>
              {currentPatient?.phoneNumber}
              <PhoneOutlined style={{ fontSize: '30px' }} />
            </a>
          </div>
          <div className='phone-email-container'>
            <a href={`mailto:${currentPatient?.email}`}>
              <div className='email'>
                {' '}
                <p>{currentPatient?.email}</p>
                <MailOutlined style={{ fontSize: '20px' }} />
              </div>
            </a>
          </div>
          <div>
            {currentPatient?.patientAppointments
              ?.filter(
                (appointment) =>
                  appointment.doctor_id === currentDoctor.id &&
                  !appointment.attended
              )
              .map((appointment, idx) => (
                <div className='illnesses-container' key={idx}>
                  {idx === 0 && (
                    <>
                    <h3>Illnesses</h3>
                    <div>
                      {appointment.illness.split(',').map((word, index) => (
                        <p className='each-illness' key={index}>
                          {toFirstLetterUpperCase(word) + word.slice(2)}
                        </p>
                      ))}
                    </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className='small-appointment-box'>
          <div className='dashboard-container prescriptions-container'>
            <h3>Medications</h3>
            <div className='each-medication-container'>
              <Image
                src='/medicine-emoji.png'
                alt='medicine-emoji'
                width={100}
                height={100}
              ></Image>
              <p>{currentPatient?.medications.toString()}</p>
            </div>
          </div>
        </div>

        <div className='small-medications-box'>
          <div className='dashboard-container prescriptions-container'>
            <h3>Next appointments</h3>
            <div className='all-appointments'>
              {currentPatient?.patientAppointments
                ?.filter(
                  (appointment) =>
                    appointment.doctor_id === currentDoctor.id &&
                    !appointment.attended
                )
                .map((appointment, idx) => (
                  <div
                    key={idx}
                    className='profile-boxes profile-boxes-blue each-item doctor-appointment w-full'
                  >
                    <div className='time-of-appointment'>
                      <p>{appointment.doctorAppointment?.name}</p>
                      <p>{appointment.date}</p>
                      <p>
                        <FieldTimeOutlined />
                        {appointment.time.slice(0, 5)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
