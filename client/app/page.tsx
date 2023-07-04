/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserType } from './helper';

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const userType = getUserType() as string;
    if (userType) {
      router.push(`/${userType}/dashboard`);
    } else {
      router.push('/home');
    }
  }, []);
  return null;
}
