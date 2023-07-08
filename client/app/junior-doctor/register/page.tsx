/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Form, Input, Radio, RadioChangeEvent, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './navbar';
import Footer from '@/app/(components)/footer';
import apiService from '@/services/APIservices';
import '../../css/globals.css';
import { openMessage } from '@/app/helper';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Register() {
  const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const initialState = {
    email: '',
    password: '',
    name: '',
    address: '',
    phoneNumber: '',
    licenseNumber: '',
    profilePicture: '',
  };
  const [state, setState] = useState(initialState);
  const [images, setImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(
        messageApi,
        'updatable',
        messageContent,
        router,
        '/junior-doctor'
      );
    }
  }, [messageContent]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImages((prevImg) => ({
        ...prevImg,
        profilePicture: file,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | RadioChangeEvent
  ) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    setState((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  // const submitForm = async (e: FormEvent<HTMLFormElement>) => {
  //   // e.preventDefault();
  //   const data = await apiService.register(state, 'junior-doctor');
  //   const { message, result, error, accessToken } = data;
  //   if (error) {
  //     setMessageContent(error);
  //   } else {
  //     if (result) {
  //       localStorage.setItem('accessToken', accessToken);
  //       localStorage.setItem('userType', result.userType as string);
  //       setMessageContent(message as string);
  //     }
  //   }
  //   setState(initialState);
  // };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('please work');
    console.log(e.target);
    console.log('got here');
    e.preventDefault();
    const fileInput = e.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const formData = new FormData();
    console.log({ file });
    formData.append('file', file);
    formData.append('api_key', process.env.CLOUDINARY_API_KEY as string);
    formData.append('folder', 'next');
    formData.append('upload_preset', 'jujbod4w');

    await apiService.saveImage(formData).then((data: any) => {
      // console.log(data);
      // console.log(data.data);
      // console.log(data.data.secure_url);
      state.profilePicture = data.data.secure_url && data.data.secure_url;
    });

    const data = await apiService.register(state, 'junior-doctor');
    const { message, result, error, accessToken } = data;
    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userType', result.userType as string);
        setMessageContent(message as string);
      }
    }
    setState(initialState);
  };
  return (
    <>
      <Navbar />
      {contextHolder}
      <main className='flex min-h-screen flex-col items-center justify-center my-6'>
        <h2 className='font-bold text-2xl text-primary'>Register</h2>
        <h3>Explore the future with us.</h3>
        <form
          // labelCol={{ span: 6 }}
          // wrapperCol={{ span: 14 }}
          // layout='horizontal'
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize as SizeType}
          // style={{ maxWidth: 900, minWidth: 600 }}
          // action='/'
          // method='post'
          // onFinish={submitForm}
          onSubmit={handleFormSubmit}
        >
          <Form.Item label='Name' htmlFor='name'>
            <Input
              type='text'
              id='name'
              name='name'
              value={state.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='Email' htmlFor='email'>
            <Input
              type='email'
              id='email'
              name='email'
              value={state.email}
              onChange={(e) => handleChange(e)}
              required
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
          <Form.Item label='Phone Number' htmlFor='phoneNumber'>
            <Input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              value={state.phoneNumber}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='Address' htmlFor='address'>
            <Input
              type='text'
              id='address'
              name='address'
              value={state.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='License Number' htmlFor='licenseNumber'>
            <Input
              type='text'
              id='licenseNumber'
              name='licenseNumber'
              value={state.licenseNumber}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='Gender' htmlFor='gender'>
            <Radio.Group id='gender' name='gender'>
              <Radio
                id='male'
                value='male'
                onChange={(value) => handleChange(value)}
              >
                Male
              </Radio>
              <Radio
                id='female'
                value='female'
                onChange={(value) => handleChange(value)}
              >
                Female
              </Radio>
              <Radio
                id='other'
                value='other'
                onChange={(value) => handleChange(value)}
              >
                Other
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Profile Picture' htmlFor='profile'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
          </Form.Item>
          <button
            className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
            type='submit'
          >
            Register
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
