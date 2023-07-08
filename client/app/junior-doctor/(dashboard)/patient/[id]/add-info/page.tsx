/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { LeftCircleOutlined } from '@ant-design/icons';
import '../../../../../css/globals.css';
import '../../../../../css/patient.css';
import '../../../../../css/doctor.css';
import { Form, Input, message } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import apiService from '@/services/APIservices';
import { getAccessToken, openMessage } from '@/app/helper';
// import { TypeSummary } from '@/types/types';
import { useDispatch } from 'react-redux';
import { setPatientToView } from '@/redux/features/patient-to-view-slice';

export default function AddInfo({ params }: { params: { id: string } }) {
  const [juniorNote, setJuniorNote] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const selectedPatient = useAppSelector(
    (state) => state.patientToViewReducer.value
  );

  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(
        messageApi,
        'updatable',
        messageContent,
        router,
        `/junior-doctor/patient/${selectedPatient?.id}`
      );
    }
  }, [messageContent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJuniorNote(value);
  };

  console.log(selectedPatient, 'PATIEEEENT');

  const handleNoteSubmit = async (
    e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const data = await apiService.addJuniorNote(
      selectedPatient?.id as string,
      juniorNote,
      getAccessToken() as string
    );

    const { message, result, error } = data;

    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        setMessageContent(message as string);
        dispatch(setPatientToView(result));
      }
    }
    setJuniorNote('');
  };

  return (
    <>
      <AuthNavbar user={'junior-doctor'} auth={'login'} />
      {contextHolder}
      <div className='button-and-title'>
        <button onClick={() => router.back()}>
          <LeftCircleOutlined />
        </button>
      </div>
      <main className='grid-container'>
        <div className='profile-box'>
          <div className='dashboard-container add-info-container'>
            <h3>Add note</h3>
            <div>
              <form onSubmit={handleNoteSubmit}>
                <Form.Item htmlFor='newPatientSummary'>
                  <Input
                    type='text'
                    id='newPatientSummary'
                    name='newPatientSummary'
                    value={juniorNote}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Item>
                <button
                  className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
                  type='submit'
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
