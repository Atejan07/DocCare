/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Form, Input, Radio, RadioChangeEvent, message } from 'antd';
import React, { FormEvent, useEffect, useState } from 'react';
import Footer from '@/app/(components)/footer';
import apiService from '../../../services/APIservices';
import { useRouter } from 'next/navigation';
import { openMessage } from '../../helper';
import AuthNavbar from '@/app/(components)/auth-navbar';
import '../../css/globals.css';

const { TextArea } = Input;
const initialState = {
  email: '',
  password: '',
  name: '',
  address: '',
  phoneNumber: '',
  dateOfBirth: '',
  bloodType: '',
  medications: '',
  allergies: '',
  surgicalHistory: '',
  familyMedicalHistory: '',
  profilePicture: '',
  summary: '',
};

export default function Register() {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [images, setImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(messageApi, 'updatable', messageContent, router, '/patient');
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
    setState((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const fileInput = e.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', process.env.CLOUDINARY_API_KEY as string);
    formData.append('folder', 'next');
    formData.append(
      'upload_preset',
      process.env.CLOUDINARY_PRESET || ('mmsru1ic' as string)
    );

    await apiService.saveImage(formData).then((data: any) => {
      state.profilePicture = data.data.secure_url && data.data.secure_url;
    });

    const data = await apiService.register(state, 'patient');
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
      <AuthNavbar user={'patient'} auth={'login'} />
      {contextHolder}
      <main className='flex min-h-screen flex-col items-center justify-center my-6'>
        <h2 className='font-bold text-2xl text-primary'>Register</h2>
        <h3>Your health in your hands.</h3>
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
          <Form.Item label='Date of Birth' htmlFor='dateOfBirth'>
            <Input
              type='date'
              id='dateOfBirth'
              name='dateOfBirth'
              value={state.dateOfBirth}
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
              id='profilePicture'
              onChange={handleImageChange}
              required
            />
          </Form.Item>

          <Form.Item label='Blood Type' htmlFor='bloodType'>
            <Input
              type='text'
              id='bloodType'
              name='bloodType'
              value={state.bloodType}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='Allergies' htmlFor='allergies'>
            <TextArea
              rows={2}
              id='allergies'
              name='allergies'
              value={state.allergies}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='Medications' htmlFor='medications'>
            <TextArea
              rows={2}
              id='medications'
              name='medications'
              value={state.medications}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item label='Surgical History' htmlFor='surgicalHistory'>
            <TextArea
              rows={2}
              id='surgicalHistory'
              name='surgicalHistory'
              value={state.surgicalHistory}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Item>
          <Form.Item
            label='Family Medical History'
            htmlFor='familyMedicalHistory'
          >
            <TextArea
              rows={2}
              id='familyMedicalHistory'
              name='familyMedicalHistory'
              value={state.familyMedicalHistory}
              onChange={(e) => handleChange(e)}
              required
            />
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
