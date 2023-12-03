import Image from 'next/image';
import { SigninForm } from '@/components/form/Signin';
import MainImage from '@/assets/main.avif';

export const SignIn = () => {
  return (
    <div className="w-[568px] h-[500px] m-auto relative top-[-150px] bottom-0 left-0 right-0 flex flex-col items-center content-center bg-slate-600">
      <Image
        src={MainImage}
        alt="mainImage"
        className="top-[-350px] z-10"
        width={400}
        height={400}
      />
      <SigninForm />
    </div>
  );
};
