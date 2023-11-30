'use client';
import { AnnualContainer } from '@/components/home/annual/annual';
import { DutyContainer } from '@/components/home/duty/duty';
import { useCallback, useEffect, useState } from 'react';
import {
  DeleteAnnualList,
  DeleteDutyList,
  MyAnnualList,
  MyDutyList,
} from '@/components/api/userInfo';
import { mainTexts } from '@/constants/mainHome';
import { CenterBarBox } from '@/components/home/buttonBox/barBox';
import { AllCalendarList } from '@/components/home/calendar/allCalendar';

export default function HomeMain() {
  const [CalDate] = useState<number>(2023);
  const [annualDataList, setAnnualDataList] = useState([]);
  const [dutyDataList, setDutyDataList] = useState([]);

  const searchData = useCallback(() => {
    MyAnnualList(CalDate.toString())
      .then((data) => {
        console.log(data.response);
        const returnDatalist = data.response;
        setAnnualDataList(returnDatalist);
        return MyDutyList(CalDate.toString());
      })
      .then((data) => {
        console.log(data.response);
        const returnDatalist = data.response;
        setDutyDataList(returnDatalist);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [CalDate]);

  useEffect(() => {
    searchData();
  }, []);

  const extractDate = (dateString: string) => {
    if (dateString) {
      const date = dateString.split('T')[0];
      return date;
    }
    return '';
  };

  const datalist = useCallback((datalist: any[]) => {
    const filterViewData = datalist.filter((item: { status: string }) => {
      return item.status !== 'CANCELLED';
    });
    return filterViewData;
  }, []);

  const deleteButton = useCallback(
    async (type: string, id: string) => {
      if (!window.confirm(`${type}를 취소 하시겠습니까?`)) {
        alert(mainTexts.cancelText);
        return;
      }

      try {
        let deleteFunction;
        if (type === '연차') {
          deleteFunction = DeleteAnnualList;
        } else {
          deleteFunction = DeleteDutyList;
        }

        const response = await deleteFunction(id);
        console.log(response);
        if (response.status === 200) {
          alert(`${type}가 취소되었습니다.`);
          searchData();
        } else {
          alert(mainTexts.failCancelText);
        }
      } catch (error) {
        console.error(error);
        alert(mainTexts.areadyApply);
      }
    },
    [searchData]
  );

  return (
    <>
      <div className="w-[1060px] h-[1280px] top-[40px] relative font-LINESeedKRBd">
        <div className="mt-[60px] flex gap-5 content-between">
          {/* 여기에 연차 컨테이너 */}
          <AnnualContainer
            datalist={datalist}
            annualDataList={annualDataList}
            extractDate={extractDate}
            deleteButton={deleteButton}
          />
          {/* 여기에 당직 컨테이너*/}
          <DutyContainer
            datalist={datalist}
            dutyDataList={dutyDataList}
            extractDate={extractDate}
            deleteButton={deleteButton}
          />
        </div>
        <CenterBarBox />
        <AllCalendarList />
      </div>
    </>
  );
}
