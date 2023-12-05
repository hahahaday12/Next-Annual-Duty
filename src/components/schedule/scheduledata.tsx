'use client';
import { useState } from 'react';
import { MyAnnualList, MyDutyList } from '../api/allApis';
import { getMyTitleWithStatus } from '@/constants/customStatus';
import { useCalendarData } from '@/hooks/useCalendarData';
import useCalendar from '@/hooks/useCalendarLayout';

export const Schedule = () => {
  const [CalDate] = useState<number>(2023);

  const { viewDrow } = useCalendarData(
    MyAnnualList(CalDate.toString()),
    MyDutyList(CalDate.toString()),
    getMyTitleWithStatus,
    CalDate
  );

  const { CalendarComponent } = useCalendar({ viewDrow });

  return (
    <div className="w-full h-[900px] pb-[50px] relative m-auto top-[10px] shadow-[1px_2px_7px_1px_#50515985] rounded-[10px] bg-white">
      <div className=" w-[1025px] m-auto  top-[10px] pb-[30px]">
        <CalendarComponent />
      </div>
    </div>
  );
};
