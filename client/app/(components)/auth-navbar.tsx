/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AppDispatch, useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';
import { setCurrentPatient } from '@/redux/features/patient-slice';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/features/auth-slice';
import { setCurrentDoctor } from '@/redux/features/doctor-slice';
import { setCurrentJunior } from '@/redux/features/junior-slice';
import { setAllMessages } from '@/redux/features/messages-slice';
import { getAccessToken, getUserType } from '../helper';

interface Props {
  user: string;
  auth: string;
}

function toFirstLetterUpperCase(text: string) {
  const arr = text.split('');
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
}

export default function AuthNavbar(props: Props) {
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
  const dispatch = useDispatch<AppDispatch>();

  async function getCurrentUser() {
    const token = getAccessToken();
    const userType = getUserType() as string;
    if (token) {
      try {
        const user = await apiService.getUser(token, userType);
        if (userType === 'patient') {
          const patient = user;
          dispatch(setCurrentPatient(patient.result));
        } else if (userType === 'doctor') {
          const doctor = user;
          dispatch(setCurrentDoctor(doctor.result));
        } else if (userType === 'junior-doctor') {
          const juniorDoctor = user;
          dispatch(setCurrentJunior(juniorDoctor));
        }
        apiService.getAllMessages().then((res) => {
          dispatch(setAllMessages(res));
        });
        dispatch(login(userType as string));
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const navPatientItem =
    props.user === 'patient'
      ? {
          name: 'Make an appointment',
          href: '/patient/appointment',
          current: false,
        }
      : undefined;
  const navItem = isAuth
    ? [
        {
          name: 'Logout',
          href: '/logout',
          current: false,
        },
        ...(navPatientItem ? [navPatientItem] : []),
      ]
    : [
        {
          name: toFirstLetterUpperCase(props.auth),
          href: `/${props.user}/${props.auth}`,
          current: false,
        },
      ];
  const navigation = [
    { name: 'Home', href: '/home', current: true },
    ...navItem,
  ];

  function combineStrings(...args: string[]) {
    return args.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as='nav' className='bg-primary'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'></div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={combineStrings(
                          item.current
                            ? 'bg-gray-950 text-white'
                            : 'text-gray-300 hover:bg-cyan-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={combineStrings(
                    item.current
                      ? 'bg-gray-950 text-white'
                      : 'text-gray-300 hover:bg-cyan-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
