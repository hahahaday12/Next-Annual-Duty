'use client';
import { useCallback, useEffect, useState } from 'react';
import { AnnualContainer } from './annual/annual';
import { DutyContainer } from './duty/duty';
import {
  DeleteAnnualList,
  DeleteDutyList,
  MyAnnualList,
  MyDutyList,
} from '../api/userInfo';
import { mainTexts } from '@/constants/mainHome';

export default function AllAnnualDuty() {
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
      <AnnualContainer
        datalist={datalist}
        annualDataList={annualDataList}
        extractDate={extractDate}
        deleteButton={deleteButton}
      />
      <DutyContainer
        datalist={datalist}
        dutyDataList={dutyDataList}
        extractDate={extractDate}
        deleteButton={deleteButton}
      />
    </>
  );
}
