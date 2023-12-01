import Image from 'next/image';
import { SigninForm } from '@/components/form/Signin';
import MainImage from '@/assets/main.png'

export const SignIn = () => {
  return (
    <div className="w-[568px] h-full bg-white absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center m-auto">
      <Image
        src={MainImage}
        alt="mainImage"
        className="top-[70px] absolute z-10"
        width={400}
        height={400}
      />
      <div className="w-[400px] h-[500px] absolute bottom-[30px]">
        <SigninForm />
      </div>
    </div>
  );
};
