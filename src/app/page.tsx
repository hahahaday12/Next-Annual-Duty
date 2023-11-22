'use client';
import Image from 'next/image';
import { SignIn } from './(form)/formSignin';

export default function Home() {
  return (
    <main>
      <Image
        src="/bgblue.png"
        alt="backgroundImage"
        className="w-full h-screen md:max-md"
        width={1000}
        height={1000}
      />
      <div className="bg-red-400">
        <SignIn />
      </div>
    </main>
  );
}
