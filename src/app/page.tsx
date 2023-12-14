import Image from 'next/image';
import { SignIn } from './(form)/SignInpage';
import BackgroundImage from '@/assets/bgblue.avif';

export default function Home() {
  return (
    <main>
      <Image
        src={BackgroundImage}
        alt="backgroundImage"
        className="w-full"
        width={1000}
        height={1000}
      />
      <div className="h-screen m-auto absolute top-0 right-0 bottom-0 left-0 flex flex-col w-[568px] bg-slate-300">
        <SignIn />
      </div>
    </main>
  );
}
