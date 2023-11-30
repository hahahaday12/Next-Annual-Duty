'use client';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { ExcelAnnualList, ExcelDutyList } from '@/components/api/userInfo';
import { ExcelCategory } from '@/constants/excelCategory';
import { useState } from 'react';

export const ExCelbox = () => {
  const [selectedOption, setSelectedOption] = useState('엑셀로 다운받기');

  const handleExcel = async () => {
    try {
      if (selectedOption === '연차') {
        const res = await ExcelAnnualList('2023');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `연차.xlsx`;
        link.click();
      } else if (selectedOption === '당직') {
        const res = await ExcelDutyList('2023');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `당직.xlsx`;
        link.click();
      }
    } catch (error) {
      console.error('Error fetching or generating Excel data:', error);
    }
  };

  // const renderBox = () => (
  //     <option value="excel" selected>
  //       엑셀로 다운받기
  //     </option>
  //     {ExcelCategory.map((item) => (
  //       <option key={item.id}>{item.name}</option>
  //     ))}
  // );

  return (
    <div className="w-[180px] h-[40px] pb-[5px] float-left rounded-[3px] mt-1 bg-[#1b9c85] text-[10px] cursor-pointer">
      <select
        className="w-[120px] h-[40px] text-[13px] bg-[#1b9c85] rounded-none font-bold relative text-white "
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {ExcelCategory.map((item) => (
          <option key={item.id}>{item.name}</option>
        ))}
      </select>

      <AiOutlineCheckCircle
        onClick={handleExcel}
        style={{
          fontSize: '24px',
          color: '#ffff',
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          left: '142px',
        }}
      />
    </div>
  );
};
