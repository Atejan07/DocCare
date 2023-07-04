/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import Footer from '../(components)/footer';
import Navbar from './navbar';
import Users from './users';
import About from './Info-about'
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '../css/home.css';
import '../css/globals.css';

export default function Home() {
  const router = useRouter();
  const usersRef = useRef<HTMLElement | null>(null);
  const executeScroll = () => usersRef?.current?.scrollIntoView();
  useEffect(() => {
    const userType = localStorage.getItem('userType') as string;
    if (userType) {
      router.push(`/${userType}/dashboard`);
    } else {
      router.push('/home');
    }
  }, []);

  return (
    <div>
      <main className='flex min-h-screen flex-col box-border'>
        <div className='grid-home'>
          <div className='home-left'>
            <div className='flex flex-col items-center justify-center'>
              <Image
                className=''
                src='/logo-light.png'
                alt='Logo'
                height={150}
                width={150}
              />
            </div>
            <div className='home-text'>
              <h1>Connect with top Rated Doctors</h1>
              <h2>Convenient way to get diagnosed quickly</h2>
              <div className='home-btns'>
                <button className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 mr-2 rounded'>
                  Try for free
                </button>
                <button
                  className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 mr-2 border border-tertiary hover:border-transparent rounded'
                  onClick={executeScroll}
                >
                  See how it works
                </button>
              </div>
            </div>
          </div>
          <div className='home-right'>
            <Navbar />
            <div className='home-right-image'>
              <Image
                className=''
                src='/doctor1.jpg'
                alt='doctor'
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
        <main ref={usersRef}>
          {' '}
          <Users />
        </main>
        <div className='about-info'>
          <About/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
