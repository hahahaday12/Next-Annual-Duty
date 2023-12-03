'use client';
import { links, headerText } from '@/constants/headerLinks';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import TitleLogo from '@/assets/service-title.avif';
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

  return (
    <>
      <div className="flex justify-center items-center w-full h-[100px] fixed z-[200] shadow-[0_4px_6px_rgba(0,0,0,0.4)] bg-white overflow-hidden">
        <div className="w-[1080px] h-[100px] flex items-center content-between">
          <div className="flex items-center font-LINESeedKRBd">
            <Image
              src={TitleLogo}
              alt="titlelogo"
              width={200}
              height={100}
              priority
              className="mr-[40px] mb-[50px] cursor-pointer"
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
