'use client';
import { allAnnualList, allDutyList } from '@/components/api/allApis';
import { getTitleWithStatus } from '@/constants/customStatus';
import { useEffect, useState } from 'react';
import { useUpdateDate } from '@/utils/store';
import { CommonCalendar } from '@/components/common/calendar';
import {
  AnnualDrowItem,
  DutyItemType,
} from '@/components/application/dayApply';
import { CombinedDataItem } from '@/hooks/useCalendarData';

export const AllCalendarList = () => {
  const [CalDate, setCalDate] = useState<number>(2023);
  const [viewDrow, setViewDrow] = useState<CombinedDataItem[]>([]);
  const { annualDataList, dutyDataList } = useUpdateDate();

  useEffect(() => {
    searchCalendar();
  }, [CalDate, annualDataList, dutyDataList]);

  const searchCalendar = () => {
    Promise.all([
      allAnnualList(CalDate.toString()),
      allDutyList(CalDate.toString()),
    ])
      .then(([annualDataList, dutyDataList]) => {
        const annualReturnData = annualDataList.response.map(
          (item: AnnualDrowItem) => ({
            title: getTitleWithStatus(item),
            username: item.username,
            start: new Date(item.startDate).toISOString(),
            end: new Date(item.endDate).toISOString(),
            type: 'ANNUAL',
          })
        );

        const dutyReturnData = dutyDataList.response.map(
          (item: DutyItemType) => ({
            ...item,
            title: getTitleWithStatus(item),
            username: item.username,
            date: new Date(item.dutyDate),
            type: 'DUTY',
          })
        );

        const combinedData = [...annualReturnData, ...dutyReturnData];
        setViewDrow(combinedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
      <div className="w-[1200px] h-[1028px] flex m-auto top-[30px] rounded-[10px] pb-[124px]">
        <div className="w-full h-[980px] pb-[40px] bg-[#ffff] relative rounded-[10px] shadow-[1px_2px_7px_1px_rgba(0,0,0,0.3)] m-auto">
          <CommonCalendar
            viewDrow={viewDrow}
            CalDate={CalDate}
            setCalDate={setCalDate}
          />
        </div>
      </div>
    </>
  );
};
