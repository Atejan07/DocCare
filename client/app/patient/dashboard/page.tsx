/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Profile from './profile';
import Appointments from './appointments';
import Prescriptions from './prescriptions';
import DoctorList from './doctor-list';
import AuthNavbar from '@/app/(components)/auth-navbar';
import PatientMessages from './patient-messages';
import { useRouter } from 'next/navigation';
import '../../css/globals.css';
import '../../css/patient.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import LoadingSpinner from '@/app/(components)/loading';
import { getAccessToken, getUserType } from '@/app/helper';

// import Cal from './calendar'

export default function Patient() {
  const router = useRouter();
  const [loaded, setLoaded] = useState<Boolean>(false);
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const { id } = currentPatient;

  useEffect(() => {
    const userType = getUserType();
    const token = getAccessToken();
    if (!userType || userType !== 'patient' || !token) {
      router.push('/home');
    }
  }, []);

  useEffect(() => {
    if (id !== '') {
      console.log(id);
      setLoaded(true);
    }
  }, [id]);

  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
      {loaded ? (
        <main className='grid-container'>
          <Profile />
          <Appointments />
          <Prescriptions />
          <DoctorList />
          <PatientMessages />
        </main>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
