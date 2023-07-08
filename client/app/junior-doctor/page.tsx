/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';
import { TypePatient } from '../../../server/types/types';
import AllPatients from './(dashboard)/patients';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { TUser } from '@/types/types';
import JuniorDoctorMessages from './(dashboard)/messages';
import { io } from 'socket.io-client';
import LoadingSpinner from '@/app/(components)/loading';
import { getAccessToken, getUserType } from '@/app/helper';
import '../css/junior-doctor.css';
const socket = io('ws://localhost:3001');

export default function JuniorDoctorDashBoard() {
  const [allPatients, setAllPatients] = useState<TypePatient[]>([]);
  const [onlinePatientsId, setOnlinePatientsId] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<Boolean>(false);
  const [logged, setLogged] = useState<Boolean>(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1000
  );
  const dispatch = useDispatch<AppDispatch>();
  const displaySection = useAppSelector(
    (state) => state.toggleDisplaySection.value
  );

  const displayChat = useAppSelector((state) => state.toggleDisplayChat.value);
  const currentJunior = useAppSelector(
    (state) => state.currentJuniorReducer.value
  );

  async function getPatients(token: string) {
    const patients = (await apiService.getAllPatients(token)) as TypePatient[];
    setAllPatients(patients);
    const ids = patients.map((patient) => {
      if (patient.status === 'Online') {
        return patient.id;
      }
    });
    setOnlinePatientsId(ids as string[]);
    setLoaded(true);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [displaySection]);

  useEffect(() => {
    socketConnect();
  }, []);

  function socketConnect() {
    socket.auth = { name: 'junior' };
    socket.connect();
  }

  useEffect(() => {
    const token = typeof window !== 'undefined' && (getAccessToken() as string);
    const userType = typeof window !== 'undefined' && (getUserType() as string);
    if (token && userType === 'junior-doctor') {
      getPatients(token);
    }
  }, [logged]);

  socket.on('patient logged', () => {
    console.log('logged');
    setLogged(!logged);
  });
  const isMobile = windowWidth < 500;

  return (
    <div>
      <AuthNavbar user={'junior-doctor'} auth={'login'} />
      <div
        className={
          isMobile
            ? 'messages-container-juniorDoctor-no-margin'
            : 'messages-container-juniorDoctor'
        }
      >
        {loaded ? (
          <>
            {isMobile && displaySection && <AllPatients />}
            {isMobile && displayChat && (
              <JuniorDoctorMessages currentJunior={currentJunior as TUser} />
            )}
            {!isMobile && <AllPatients />}
            {!isMobile && displayChat && (
              <JuniorDoctorMessages currentJunior={currentJunior as TUser} />
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
