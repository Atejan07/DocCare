/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import '../../css/patient.css';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';
import React, { useEffect, useState } from 'react';
const { TextArea } = Input;
import { useRouter } from 'next/navigation';
import apiService from '@/services/APIservices';
import { TypeDoctor } from '@/../server/types/types';
import { TypeAvailableSpecialist } from '@/types/types';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setAvailableSpecialist } from '@/redux/features/available-doctors-slice';
import Image from 'next/image';
import { futureDate, getAccessToken } from '@/app/helper';

const initialState = {
  date: '',
  illnesses: '',
};

export default function PatientAppointment() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const [openForm, setOpenForm] = useState(true);
  const [state, setState] = useState(initialState);
  const [illness, setIllness] = useState<string>('');
  const [specialists, setSpecialists] = useState<TypeDoctor[]>([]);
  const [allDoctors, setAllDoctors] = useState<TypeDoctor[]>([]);
  const [availableSpecialists, setAvailableSpecialists] = useState<
    TypeAvailableSpecialist[]
  >([]);

  const handleNextButtonClick = () => {
    setOpenForm(false);
  };

  type SizeType = Parameters<typeof Form>[0]['size'];
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RadioChangeEvent
  ) {
    const { name, value } = e.target;

    setIllness(e.target.title as string);
    setState((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  }

  function formatStateDate(date: string) {
    const [year, month, day] = date.split('-');
    const formattedMonth = month.startsWith('0') ? month.substring(1) : month;
    const formattedDay = day.startsWith('0') ? day.substring(1) : day;
    console.log(year);
    console.log([year, formattedMonth, formattedDay]);
    return [Number(year), Number(formattedMonth), Number(formattedDay)];
  }

  async function getAllTheDoctors() {
    const token = getAccessToken() as string;
    const allTheDoctors = await apiService
      .getAllDoctors(token)
      .then((doctors) => {
        console.log(doctors);
        setAllDoctors(doctors as TypeDoctor[]);
      });
  }

  useEffect(() => {
    getAllTheDoctors();
  }, []);

  function getSpecialists() {
    return allDoctors.filter((docs) => {
      return docs.specialisation === state.illnesses && docs;
    });
  }

  function displayAvailability(
    stateDate: string,
    formatedDate: number[],
    illness: string
  ) {
    const [stateYear, stateMonth, stateDay] = formatedDate;
    return specialists.map((docs) => {
      console.log(docs.availability && docs.availability[stateMonth][stateDay]);
      return (
        docs.availability && {
          doctorName: docs.name,
          doctorId: docs.id,
          doctorAbout: docs.about,
          doctorProfilePic: docs.profilePicture,
          slots: docs.availability[stateMonth][stateDay],
          date: stateDate,
          illness,
        }
      );
    });
  }

  useEffect(() => {
    setSpecialists(getSpecialists());
    if (state.date && state.illnesses) {
      const availableDoctors = displayAvailability(
        state.date,
        formatStateDate(state.date),
        state.illnesses
      ) as TypeAvailableSpecialist[];
      dispatch(setAvailableSpecialist(availableDoctors));
      setAvailableSpecialists(availableDoctors);
    }
  }, [state]);
  console.log({ availableSpecialists });

  function submitForm() {
    // e.preventDefault();

    if (futureDate(state.date)) {
      setFormError('Plase choose a future date.');
      return;
    }
    if (state.date && state.illnesses) {
      const availableDoctors = displayAvailability(
        state.date,
        formatStateDate(state.date),
        illness
      ) as TypeAvailableSpecialist[];
      dispatch(setAvailableSpecialist(availableDoctors));
      setAvailableSpecialists(availableDoctors);
    }
    router.push('/patient/appointment/available-doctors');
  }

  return (
    <div className='patient-appointment-main'>
      <AuthNavbar user={'patient'} auth={'login'} />
      {openForm ? (
        <main>
          <div className='make-appointment-container'>
            <h2>Make an Appointment</h2>
            <div>
              <div className='appointment-description'>
                <Image src='/1.png' alt='icon' width={100} height={100}></Image>
                <div>
                  <h3>Request Consultation</h3>
                  <p>Describe your illness and choose the date.</p>
                </div>
              </div>
              <div className='appointment-description'>
                <Image src='/2.png' alt='icon' width={100} height={100}></Image>
                <div>
                  <h3>Find a Doctor</h3>
                  <p>
                    Find a doctor related to the disease you are suffering from
                    to get the best consultation.
                  </p>
                </div>
              </div>
              <div className='appointment-description'>
                <Image src='/3.png' alt='icon' width={100} height={100}></Image>
                <div>
                  <h3>Get a Solution</h3>
                  <p>
                    Our doctor will give you a solution regarding the illness
                    you're suffering from.
                  </p>
                </div>
              </div>
            </div>
            <div className='appointment-button'>
              <button
                onClick={handleNextButtonClick}
                className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 m-2 border border-tertiary hover:border-transparent rounded'
              >
                Make an appointment
              </button>
            </div>
            <div className='female-doctor'>
              <Image
                src='/Female-Doctor-PNG-Image.png'
                alt='doctor'
                width={400}
                height={400}
              ></Image>
            </div>
          </div>
        </main>
      ) : (
        <main className='flex min-h-screen flex-col items-center justify-center my-6'>
          <div className='flex min-h-screen flex-col items-center justify-center'>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              layout='horizontal'
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 900 }}
              action='/'
              method='post'
              onFinish={submitForm}
            >
              <div className='appointment-date'>
                <h2 className='text-2xl text-primary text-black my-2'>
                  Appointment Date
                </h2>
                <Form.Item htmlFor='appointment'>
                  <Input
                    type='date'
                    id='date'
                    name='date'
                    value={state.date}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Item>
              </div>
              <h2 className='text-2xl text-primary text-black my-2'>
                What kind of Illness are you experiencing?
              </h2>
              <div className='form'>
                <Form.Item htmlFor='illness'>
                  <Radio.Group
                    id='illness'
                    name='illnesses'
                    className='form-radio-group'
                  >
                    <Radio
                      id='illness1'
                      title='Common illnesses, minor injuries, preventive care, general health issues'
                      value='General Practice'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Common illnesses, minor injuries, preventive care, general
                      health issues{' '}
                    </Radio>
                    <Radio
                      id='illness2'
                      value='Internal Medicine'
                      title='Chronic diseases, infections, autoimmune disorders, organ diseases'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Chronic diseases, infections, autoimmune disorders, organ
                      diseases{' '}
                    </Radio>
                    <Radio
                      id='illness3'
                      value='Pediatrics'
                      title='Childhood illnesses, growth and development issues, vaccinations, pediatric infections'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Childhood illnesses, growth and development issues,
                      vaccinations, pediatric infections{' '}
                    </Radio>
                    <Radio
                      id='illness4'
                      title='Pregnancy-related conditions, gynecological disorders, fertility issues, childbirth complications'
                      value='Obstetrics and Gynecology'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Pregnancy-related conditions, gynecological disorders,
                      fertility issues, childbirth complications{' '}
                    </Radio>
                    <Radio
                      id='illness5'
                      title='Surgical conditions, injuries requiring surgical intervention, post-operative care'
                      value='Surgery'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Surgical conditions, injuries requiring surgical
                      intervention, post-operative care{' '}
                    </Radio>
                    <Radio
                      id='illness6'
                      title='Mental health disorders, anxiety, depression, bipolar disorder, schizophrenia'
                      value='Psychiatry'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Mental health disorders, anxiety, depression, bipolar
                      disorder, schizophrenia{' '}
                    </Radio>
                    <Radio
                      id='illness7'
                      title='Skin conditions, dermatitis, acne, psoriasis, skin cancer'
                      value='Dermatology'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Skin conditions, dermatitis, acne, psoriasis, skin cancer{' '}
                    </Radio>
                    <Radio
                      id='illness8'
                      title='Eye diseases, vision problems, cataracts, glaucoma, macular degeneration'
                      value='Ophthalmology'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Eye diseases, vision problems, cataracts, glaucoma,
                      macular degeneration
                    </Radio>
                    <Radio
                      id='illness9'
                      title='Ear infections, sinusitis, tonsillitis, hearing loss, vocal cord disorders'
                      value='Ear Nose and Throat (ENT)'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Ear infections, sinusitis, tonsillitis, hearing loss,
                      vocal cord disorders{' '}
                    </Radio>
                    <Radio
                      id='illness10'
                      title='Heart diseases, hypertension, heart failure, arrhythmias, coronary artery disease'
                      value='Cardiology'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Heart diseases, hypertension, heart failure, arrhythmias,
                      coronary artery disease{' '}
                    </Radio>
                    <Radio
                      id='illness11'
                      title='Diabetes, thyroid disorders, hormonal imbalances, metabolic disorders'
                      value='Endocrinology'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Diabetes, thyroid disorders, hormonal imbalances,
                      metabolic disorders
                    </Radio>
                    <Radio
                      id='illness12'
                      title={`Digestive system disorders, gastrointestinal cancers, irritable bowel syndrome, Crohn's disease`}
                      value='Gastroenterology'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Digestive system disorders, gastrointestinal cancers,
                      irritable bowel syndrome, Crohn's disease{' '}
                    </Radio>
                    <Radio
                      id='illness13'
                      value='Neurology'
                      title='Neurological disorders, migraines, epilepsy, stroke, multiple sclerosis'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Neurological disorders, migraines, epilepsy, stroke,
                      multiple sclerosis{' '}
                    </Radio>
                    <Radio
                      id='illness14'
                      value='Oncology'
                      title='Cancer, various types and stages, chemotherapy, radiation therapy, palliative care'
                      onChange={(value) => handleChange(value)}
                      className='radio-form'
                    >
                      Cancer, various types and stages, chemotherapy, radiation
                      therapy, palliative care{' '}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {formError && <p className='error-message'>{formError}</p>}
              <button
                className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 m-2 border border-tertiary hover:border-transparent rounded'
                type='submit'
              >
                Next
              </button>
            </Form>
          </div>
        </main>
      )}
    </div>
  );
}
