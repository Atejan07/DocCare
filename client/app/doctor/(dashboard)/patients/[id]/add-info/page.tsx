/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
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

const initialMedicalInfo = {
  prescription: '',
  doctor_notes: '',
};
const initialSummary = {
  newPatientSummary: '',
};

export default function AddInfo({ params }: { params: { id: string } }) {
  const [medicalInfo, setMedicalInfo] = useState(initialMedicalInfo);
  const [summary, setSummary] = useState(initialSummary);
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;
  const currentPatient = patients?.find((patient) => {
    return patient.id?.toString() == params.id;
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (messageContent) {
      openMessage(
        messageApi,
        'updatable',
        messageContent,
        router,
        `/doctor/patients/${currentPatient?.id}`
      );
    }
  }, [messageContent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMedicalInfo((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    setSummary((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSummarySubmit = async (
    e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const data = await apiService.createPatientSummary(
      currentPatient?.id as string,
      summary,
      getAccessToken() as string
    );

    const { message, result, error } = data;

    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        console.log(result);
        setMessageContent(message as string);
      }
    }
    setSummary(initialSummary);
  };

  const handleMedicalInfoSubmit = async (
    e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const newMedicalInfo = {
      prescription: medicalInfo.prescription,
      doctorNote: medicalInfo.doctor_notes,
      doctorName: currentDoctor.name,
    };

    const data = await apiService.getMedicalInfo(
      currentPatient?.id as string,
      newMedicalInfo,
      getAccessToken() as string
    );

    const { message, result, error } = data;

    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        setMessageContent(message as string);
      }
    }
    setMedicalInfo(initialMedicalInfo);
  };

  return (
    <>
      <AuthNavbar user={'doctor'} auth={'login'} />
      {contextHolder}
      <div className='button-and-title'>
        <button onClick={() => router.back()}>
          <LeftCircleOutlined />
        </button>
      </div>
      <main className='grid-container'>
        <div className='profile-box'>
          <div className='dashboard-container add-info-container'>
            <h3>Add summary</h3>
            <div>
              <form onSubmit={handleSummarySubmit}>
                <Form.Item htmlFor='newPatientSummary'>
                  <Input
                    type='text'
                    id='newPatientSummary'
                    name='newPatientSummary'
                    value={summary.newPatientSummary}
                    onChange={(e) => handleSummaryChange(e)}
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

        <div className='doctor-appointments-box'>
          <div className='dashboard-container add-info-container'>
            <h3>Add prescription</h3>
            <div>
              <form onSubmit={handleMedicalInfoSubmit}>
                <Form.Item htmlFor='prescription'>
                  <Input
                    type='text'
                    id='prescription'
                    name='prescription'
                    value={medicalInfo.prescription}
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

        <div className='doctor-patients-box'>
          <div className='dashboard-container add-info-container'>
            <h3>Add notes</h3>
            <div>
              <form onSubmit={handleMedicalInfoSubmit}>
                <Form.Item htmlFor='doctor_notes'>
                  <Input
                    type='text'
                    id='doctor_notes'
                    name='doctor_notes'
                    value={medicalInfo.doctor_notes}
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
