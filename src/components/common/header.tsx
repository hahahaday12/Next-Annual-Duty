'use client';
import { links, headerText } from '@/constants/headerLinks';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import TitleLogo from '@/assets/titlelogo.png';
import { HeaderProfile } from '../profile/headerProfile';

export interface InfoResponse extends Response {
  response: {
    email: string;
    hireDate: string;
    profileImage: string;
    remainVacation: number;
    usedVacation: number;
    username: string;
  };
}

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const signOut = () => {
    localStorage.removeItem('token');
    router.push('/main/home');
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-[100px] fixed z-[200] shadow-[0_4px_6px_rgba(0,0,0,0.4)] bg-white">
        <div className="w-[1080px] h-[100px] flex items-center content-between">
          <div className="flex items-center font-LINESeedKRBd">
            <Image
              src={TitleLogo}
              alt="titlelogo"
              width={100}
              height={100}
              priority
              className="w-[210px] h-[80px] mr-[40px] cursor-pointer bg-white"
              onClick={() => router.push('/main/home')}
            />
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx('text-[#000000] mr-[70px] whitespace-pre', {
                    'text-[#2656f6] whitespace-pre decoration-4 underline-offset-[44px] underline':
                      pathname === link.href,
                  })}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <HeaderProfile headerText={headerText} />
        </div>
      </div>
    </>
  );
};
