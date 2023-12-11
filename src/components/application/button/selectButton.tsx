'use client';
import { ButtonStyle } from '@/components/styleCommon/styleCommon';
import { dayApplyTexts } from '@/constants/applicationTexts';
import { useState } from 'react';
import { useButtonStore } from '@/utils/store';

export const SelectButton = () => {
  const { setSelectedButton } = useButtonStore();
  const [activeButton, setActiveButton] = useState('DUTY');

  const handleButtonClick = (button: 'ANNUAL' | 'DUTY') => {
    console.log(button);
    setSelectedButton(button);
    setActiveButton(button);
  };

  return (
    <div className="w-[110px] top-[90px] relative felx gap-[15px] float-left ml-[-100px] font-LINESeedKRBd text-white font-normal">
      <ButtonStyle
        isActive={activeButton === 'ANNUAL'}
        onClick={() => handleButtonClick('ANNUAL')}
        data-select="ANNUAL"
      >
        <p className="font-normal">{dayApplyTexts.anuualSchedule}</p>
      </ButtonStyle>
      <ButtonStyle
        isActive={activeButton === 'DUTY'}
        onClick={() => handleButtonClick('DUTY')}
        data-select="DUTY"
      >
        {dayApplyTexts.dutySchedule}
      </ButtonStyle>
    </div>
  );
};
