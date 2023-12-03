'use client';
import { mainTexts } from '@/constants/mainHome';
import { useRouter } from 'next/navigation';
import { IoReload } from 'react-icons/io5';
import { CommonBarButton } from './button/barButton';
import { ExCelbox } from './button/excelButton';

export const CenterBarBox = () => {
  const router = useRouter();

  const onChangeClick = () => {
    router.push('/application');
  };

  const onClickLoad = () => {
    window.location.reload();
  };

  return (
    <div className="relative mt-[10px] flex content-between justify-between">
      <div className="w-[250px] relative mt-[13px] flex">
        <div
          className="w-[150px] text-white bg-[#1c3879d9] text-[15px] rounded-[10px] h-[40px] border-none font-bold cursor-pointer p-[10px] pl-[25px]"
          onClick={onChangeClick}
        >
          {mainTexts.applyAnnualDuty}
        </div>
        <IoReload
          onClick={onClickLoad}
          style={{
            fontSize: '28px',
            color: '#1c3879d9',
            cursor: 'pointer',
            marginLeft: '170px',
            marginTop: '5px',
            position: 'absolute',
          }}
        />
      </div>
      <div className="w-[380px] h-[50px] relative mt-[10px]">
        <ExCelbox />
        <div className="w-[140px] ml-[200px] mt-[5px]">
          <CommonBarButton />
        </div>
      </div>
    </div>
  );
};
