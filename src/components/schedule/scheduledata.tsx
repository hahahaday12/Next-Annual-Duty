'use client';

import { MyAnnualList, MyDutyList } from '../api/allApis';
import { getMyTitleWithStatus } from '@/constants/customStatus';
import { CommonCalendar } from '@/components/common/calendar';
import { useMemo, useState } from 'react';
import { useCalendarData } from '@/hooks/useCalendarData';

export const Schedule = () => {
  const [CalDate, setCalDate] = useState<number>(2023);

  const fetchDataFunction1 = useMemo(
    () => MyAnnualList(CalDate.toString()),
    [CalDate]
  );

  const fetchDataFunction2 = useMemo(
    () => MyDutyList(CalDate.toString()),
    [CalDate]
  );

  const { viewDrow } = useCalendarData(
    fetchDataFunction1,
    fetchDataFunction2,
    getMyTitleWithStatus,
    CalDate.toString()
  );

  return (
    <div className="w-full h-[900px] pb-[50px] relative m-auto top-[10px] shadow-[1px_2px_7px_1px_#50515985] rounded-[10px] bg-white">
      <div className=" w-[1025px] m-auto  top-[10px] pb-[30px]">
        <CommonCalendar
          viewDrow={viewDrow}
          CalDate={CalDate}
          setCalDate={setCalDate}
        />
      </div>
    </div>
  );
};
