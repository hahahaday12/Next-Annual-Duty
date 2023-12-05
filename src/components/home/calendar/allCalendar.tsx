'use client';
import { useMemo, useState } from 'react';
import { allAnnualList, allDutyList } from '@/components/api/allApis';
import { getTitleWithStatus } from '@/constants/customStatus';
import { useCalendarData } from '@/hooks/useCalendarData';
import useCalendar from '@/hooks/useCalendarLayout';

export const AllCalendarList = () => {
  const [CalDate] = useState<number>(2023);

  const fetchDataFunction1 = useMemo(
    () => allAnnualList(CalDate.toString()),
    [CalDate]
  );
  const fetchDataFunction2 = useMemo(
    () => allDutyList(CalDate.toString()),
    [CalDate]
  );

  const { viewDrow } = useCalendarData(
    fetchDataFunction1,
    fetchDataFunction2,
    getTitleWithStatus,
    CalDate
  );

  const { CalendarComponent } = useCalendar({ viewDrow });

  return (
    <div className="w-full h-[870px] pb-[40px] bg-[#ffff] relative top-[30px] rounded-[10px] shadow-[1px_2px_7px_1px_rgba(0,0,0,0.3)]">
      <div className=" w-[1025px] relative m-auto h-[700px] top-[10px] font-LINESeedKR-Bd pb-[40px]">
        <CalendarComponent />
      </div>
    </div>
  );
};
