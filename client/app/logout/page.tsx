'use client';
import { Form, message } from 'antd';

import React, { useState } from 'react';
import Footer from '@/app/(components)/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { logout } from '@/redux/features/auth-slice';
import { io } from 'socket.io-client';
import apiService from '@/services/APIservices';
import { TypePatient } from '../../../server/types/types';
import { clearLocalStorage } from '../helper';
const socket = io('ws://localhost:3001');

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );
  const [messageContent, setMessageContent] = useState('');
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  // const userType = typeof window !== 'undefined' && localStorage.getItem('userType') as string;

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  function handleClick() {
    console.log(currentPatient, 'logout');
    if (currentPatient.name !== '') {
      apiService
        .logoutPatient(
          currentPatient.id as string,
          currentPatient as TypePatient
        )
        .then((res) => {
          console.log(res);
          setMessageContent(res?.message as string);
          socket.emit('patient logged');
        });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    clearLocalStorage();
    dispatch(logout());
    router.push('/home');
  }

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h2 className='font-bold text-2xl text-primary'>
          Are you sure you want to log out?
        </h2>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 900 }}
        >
          <Link
            href='/'
            className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
            type='submit'
          >
            No
          </Link>
          <button
            className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
            type='submit'
            onClick={() => handleClick()}
          >
            Yes
          </button>
        </Form>
      </div>
      <Footer />
    </>
  );
}
