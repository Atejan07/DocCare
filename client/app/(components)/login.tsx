/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Form, Input } from 'antd';

import React, { FormEvent, useEffect, useState } from 'react';

import Footer from '@/app/(components)/footer';
import apiService from '@/services/APIservices';
import { login } from '../../redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import { getUserType, openMessage } from '../helper';

type SizeType = Parameters<typeof Form>[0]['size'];

interface Props {
  user: string;
}

export default function Login(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const initialState = { email: '', password: '' };
  const [state, setState] = useState(initialState);
  const [formError, setFormError] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(
        messageApi,
        'updatable',
        messageContent,
        router,
        `/${getUserType()}`
      );
    }
  }, [messageContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await apiService.login(state, props.user);
    const { message, result } = data;
    if (result) {
      const username = result.userAuthenticated.name as string;
      const userType = result.userAuthenticated.userType as string;
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('userType', userType);
      setFormError('');
      dispatch(login(username));
      setMessageContent(message);
    } else {
      setFormError(`${data}`);
    }
    setState(initialState);
  };

  return (
    <>
      {contextHolder}
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <h2 className='font-bold text-2xl text-primary'>Login</h2>
        <h3>Explore the future with us.</h3>
        <form onSubmit={submitForm}>
          <Form.Item label='Email' htmlFor='email'>
            <Input
              type='email'
              id='email'
              name='email'
              required
              value={state.email}
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item label='Password' htmlFor='password'>
            <Input
              type='password'
              id='password'
              name='password'
              value={state.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          {formError && (
            <p className='error-message'>
              <ExclamationCircleTwoTone /> {formError}
            </p>
          )}
          <button
            className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
            type='submit'
            id='submit-login'
          >
            Login
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
