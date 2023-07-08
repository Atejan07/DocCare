/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';
const { TextArea } = Input;
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
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

  // const onFormLayoutChange = ({ size }: { size: SizeType }) => {
  //   setComponentSize(size);
  // };

  const initialState = {
    email: '',
    password: '',
    name: '',
    address: '',
    phoneNumber: '',
    licenseNumber: '',
    about: '',
    profilePicture: '',
  };
  const [state, setState] = useState(initialState);
  const [images, setImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(messageApi, 'updatable', messageContent, router, '/doctor');
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
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RadioChangeEvent
  ) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    setState((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

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
      console.log(data);
      console.log(data.data);
      console.log(data.data.secure_url);
      state.profilePicture = data.data.secure_url && data.data.secure_url;
    });

    const data = await apiService.register(state, 'doctor');
    const { message, result, error, accessToken } = data;
    console.log(result);
    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userType', result.userType as string);
        console.log(result);
        setMessageContent(message as string);
      }
    }
    setState(initialState);
  };

  // const submitForm = async (e: FormEvent<HTMLFormElement>) => {
  //   // e.preventDefault();
  // const data = await apiService.register(state, 'doctor');
  // const { message, result, error, accessToken } = data;
  // console.log(result);
  // if (error) {
  //   setMessageContent(error);
  // } else {
  //   if (result) {
  //     localStorage.setItem('accessToken', accessToken);
  //     localStorage.setItem('userType', result.userType as string);
  //     console.log(result);
  //     setMessageContent(message as string);
  //   }
  // }
  // setState(initialState);
  // };
  return (
    <>
      <Navbar />
      {contextHolder}
      <main className='flex min-h-screen flex-col items-center justify-center my-6'>
        <h2 className='font-bold text-2xl text-primary'>Register</h2>
        <h3>Explore the future with us.</h3>
        <form onSubmit={handleFormSubmit}>
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
          <Form.Item label='About' htmlFor='about'>
            <TextArea
              rows={4}
              id='about'
              name='about'
              required
              value={state.about}
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item label='Profile Picture' htmlFor='profile'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              id='profilePicture'
              required
            />
          </Form.Item>

          <Form.Item
            label='Specialisation'
            htmlFor='specialisation'
            className='max-w-screen-md'
          >
            <Radio.Group id='specialisation' name='specialisation'>
              <Radio
                id='specialisation1'
                value='General Practice'
                onChange={(value) => handleChange(value)}
              >
                General Practice
              </Radio>
              <Radio
                id='specialisation2'
                value='Internal Medicine'
                onChange={(value) => handleChange(value)}
              >
                Internal Medicine
              </Radio>
              <Radio
                id='specialisation3'
                value='Pediatrics'
                onChange={(value) => handleChange(value)}
              >
                Pediatrics
              </Radio>
              <Radio
                id='specialisation4'
                value='Obstetrics and Gynecology'
                onChange={(value) => handleChange(value)}
              >
                Obstetrics and Gynecology
              </Radio>
              <Radio
                id='specialisation5'
                value='Surgery'
                onChange={(value) => handleChange(value)}
              >
                Surgery
              </Radio>
              <Radio
                id='specialisation6'
                value='Psychiatry'
                onChange={(value) => handleChange(value)}
              >
                Psychiatry
              </Radio>
              <Radio
                id='specialisation7'
                value='Dermatology'
                onChange={(value) => handleChange(value)}
              >
                Dermatology
              </Radio>
              <Radio
                id='specialisation8'
                value='Ophthalmology'
                onChange={(value) => handleChange(value)}
              >
                Ophthalmology
              </Radio>
              <Radio
                id='specialisation9'
                value='Ear Nose and Throat (ENT)'
                onChange={(value) => handleChange(value)}
              >
                Ear Nose and Throat (ENT)
              </Radio>
              <Radio
                id='specialisation10'
                value='Cardiology'
                onChange={(value) => handleChange(value)}
              >
                Cardiology
              </Radio>
              <Radio
                id='specialisation11'
                value='Endocrinology'
                onChange={(value) => handleChange(value)}
              >
                Endocrinology
              </Radio>
              <Radio
                id='specialisation12'
                value='Gastroenterology'
                onChange={(value) => handleChange(value)}
              >
                Gastroenterology
              </Radio>
              <Radio
                id='specialisation13'
                value='Neurology'
                onChange={(value) => handleChange(value)}
              >
                Neurology
              </Radio>
              <Radio
                id='specialisation14'
                value='Oncology'
                onChange={(value) => handleChange(value)}
              >
                Oncology
              </Radio>
            </Radio.Group>
          </Form.Item>
          <button
            className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
            type='submit'
            id='submit-register'
          >
            Register
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
