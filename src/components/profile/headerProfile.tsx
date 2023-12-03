'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DefaultImage from '@/assets/default.png';
import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';

type TextProps = {
  headerText: {
    signout: string;
  };
};

export const HeaderProfile = ({ headerText }: TextProps) => {
  const router = useRouter();
  const [proflieImage, setProflieImage] = useState(DefaultImage);
  const { user, isLoading, isError } = useUser();

  useEffect(() => {
    if (user && user.response) {
      if (user?.response?.profileImage === '/image/default.png') {
        setProflieImage(DefaultImage);
      } else {
        setProflieImage(user.response.profileImage);
      }
    }
  }, [user]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const userData = user.response;

  const signOut = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="flex w-[200px] h-[60px]">
      <Image
        src={proflieImage}
        alt="titlelogo"
        width={60}
        height={60}
        className="w-[60px] h-[60px] mr-[30px] bg-white rounded-[60px] cursor-pointer"
        onClick={() => {
          router.push('/main/profile');
        }}
        priority
      />
      <div className="info flex flex-col justify-between font-bold mt-[5px]">
        <div>{userData.username}</div>
        <button
          className="text-[13px] mb-[5px] font-normal cursor-pointer hover:underline"
          onClick={signOut}
        >
          {headerText.signout}
        </button>
      </div>
    </div>
  );
};
