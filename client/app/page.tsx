import Link from 'next/link';
import Footer from './(components)/footer';
import Navbar from './(components)/navbar';

export default function Main() {
  return (
    <main className='flex min-h-screen flex-col box-border'>
      <Navbar />
      <h1>Home page working!</h1>
      <Link href='/home'>Go home!</Link>
      <Footer />
    </main>
  );
}
