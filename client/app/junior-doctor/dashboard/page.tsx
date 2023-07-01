/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import '.././junior-doctor.css';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';
import { TypePatient } from '../../../../server/types/types';
import AllPatients from './patients';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { displayChat } from '@/redux/features/display-chat';
import { TUser } from '@/types/types';
import JuniorDoctorMessages from './messages';
import { setAllPatient } from '@/redux/features/all-patients-slice';
import { io } from "socket.io-client";
const socket = io("ws://localhost:3001");

export default function JuniorDoctorDashBoard() {
  const [allPatients, setAllPatients] = useState<TypePatient[]>([]);
  const [logged, setLogged] = useState<Boolean>(true)
  const dispatch = useDispatch<AppDispatch>();
  const displayChat = useAppSelector((state) => state.toggleDisplayChat.value)
  const currentJunior = useAppSelector(
    (state) => state.currentJuniorReducer.value
  );

  async function getPatients(token: string) {
    const patients = await apiService.getAllPatients(token);
    setAllPatients(patients as TypePatient[]);
    dispatch(setAllPatient(patients as TypePatient[]))
  }

  useEffect(() => {
    const token =
      typeof window !== 'undefined' &&
      (localStorage.getItem('accessToken') as string);
    const userType =
      typeof window !== 'undefined' &&
      (window.localStorage.getItem('userType') as string);
    if (token && userType === 'junior-doctor') {
      getPatients(token);
    }
  }, [logged]);

  socket.on('patient logged', async () => {
    setLogged(!logged)
  })


  return (
    <main>
      <AuthNavbar user={'junior-doctor'} auth={'login'} />
      <AllPatients allPatients={allPatients} />
      {displayChat && (
                    <div className='message-container'>
                    <JuniorDoctorMessages
                      currentJunior={currentJunior as TUser}
                    />
                   </div>
                )}
    </main>
  );
}







