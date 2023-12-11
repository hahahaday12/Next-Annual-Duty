'use client';
import { CommonApplyCalendar } from '../common/applyCalendar';
import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { useUser } from '@/hooks/useUser';
import { getTitleWithStatus } from '@/constants/customStatus';
import { allAnnualList, allDutyList } from '../api/allApis';
import { AnnualModal } from './modal/annualModal';
import { DuttyModal } from './modal/duttyModal';
import { useButtonStore } from '@/utils/store';
import { SelectButton } from './button/selectButton';
import { DateClickArg } from 'fullcalendar/index.js';

export type DataItem = {
  title: string;
  username: string;
  start: Date;
  end: Date;
  type: 'ANNUAL' | 'Duty';
  date: Date;
};

export type Event = {
  _def: any;
  title: string;
};

export type DrowItem = {
  email: string;
  title: string;
  start: string;
  end: string;
  username: string;
  status: string;
};

export type AnnualDrowItem = {
  title: string;
  username: string;
  startDate: string;
  endDate: string;
  type: string;
};

export type DutyItemType = {
  email: string;
  title: string | undefined;
  username: string;
  dutyDate: Date;
  type: 'ANNUAL' | 'Duty';
};

export const AllApply = () => {
  const { selectedButton } = useButtonStore();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedModal, setSelectedModal] = useState<
    'ANNUAL_MODAL' | 'DUTY_MODAL' | boolean
  >(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [CalDate, setCalDate] = useState<number>(2023);
  const [username, SetuserName] = useState('');
  const [data, setData] = useState<DataItem[]>([]);
  const [viewDrow, setViewDrow] = useState<
    DrowItem[] | DutyItemType[] | AnnualDrowItem[]
  >([
    {
      email: '',
      title: '',
      start: '',
      end: '',
      username: '',
      status: '',
    },
  ]);

  const { user } = useUser();
  const userName = user?.response?.username;

  useEffect(() => {
    if (userName) {
      SetuserName(userName);
      setSelectedModal(false);
    }
  }, [userName, selectedButton]);

  const handleModalClick = (info: DateClickArg | Date) => {
    //let dateSelect = new Date(info.date);
    let dateSelect: Date;

    if ('date' in info) {
      dateSelect = new Date(info.date);
    } else {
      dateSelect = info;
    }
    if (dateSelect.getDay() === 0 || dateSelect.getDay() === 6) {
      alert('토요일 또는 일요일은 선택할 수 없습니다.');
      return false;
    }
    dateSelect.setHours(9, 0, 0, 0);
    const dupuleData = data.filter((item) => {
      if (item.type === 'ANNUAL') {
        const startDay = item.start;
        const endDay = item.end;
        startDay.setHours(9, 0, 0, 0);
        endDay.setHours(9, 0, 0, 0);
        if (
          dateSelect >= startDay &&
          dateSelect <= endDay &&
          item.username === username
        ) {
          return item;
        }
      } else {
        const dutyDate = item.date;
        dutyDate.setHours(9, 0, 0, 0);
        if (dateSelect === dutyDate && item.username === username) {
          return item;
        }
      }
      return false;
    });

    if (dupuleData.length > 0) {
      alert('이미 해당 날짜에 신청한 연차가 존재합니다.');
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); //시간 분 초 초기화

    if (dateSelect < today) {
      alert('오늘 날짜 이전은 선택할 수 없습니다.');
      return false;
    }
    viewDrow.find((item) => {
      const start = new Date((item as DrowItem).start);
      const end = new Date((item as DrowItem).end);
      if (!start || !end) {
        return false;
      }
      const inRange =
        dateSelect.getTime() >= start.getTime() &&
        dateSelect.getTime() <= end.getTime();
      return inRange;
    });
    setSelectedModal(
      selectedButton === 'ANNUAL' ? 'ANNUAL_MODAL' : 'DUTY_MODAL'
    );
    setSelectedDate(dateSelect);
    return false;
  };

  const CloseModal = () => {
    setSelectedModal(false);
  };

  const handleDatesSet = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const date = calendarApi.getDate();
      const year = date.getFullYear();
      if (year !== CalDate) {
        setCalDate(year);
      }
    }
  };

  const searchData = () => {
    if (calendarRef.current) {
      if (selectedButton === 'ANNUAL') {
        allAnnualList(CalDate.toString())
          .then((data) => {
            const returnAnnualDatalist = data.response;
            const allAnnualDatalist = returnAnnualDatalist.map(
              (item: AnnualDrowItem) => ({
                title: getTitleWithStatus(item),
                username: item.username,
                start: new Date(item.startDate),
                end: new Date(item.endDate),
                type: 'ANNUAL',
              })
            );
            setViewDrow(allAnnualDatalist);
            setData(allAnnualDatalist);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } else {
        allDutyList(CalDate.toString())
          .then((data) => {
            const returnDatalist = data.response;
            const allDutyDatalist = returnDatalist.map(
              (item: DutyItemType) => ({
                ...item,
                title: getTitleWithStatus(item),
                username: item.username,
                date: new Date(item.dutyDate),
                type: 'DUTY',
              })
            );
            setViewDrow(allDutyDatalist);
            setData(allDutyDatalist);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      console.log('년도를 찾을수 없습니다.');
    }
  };

  useEffect(() => {
    searchData();
  }, [selectedButton, CalDate]);

  return (
    <>
      <SelectButton />
      <CommonApplyCalendar
        handleModalClick={handleModalClick}
        handleDatesSet={handleDatesSet}
        viewDrow={viewDrow}
        calendarRef={calendarRef}
      />
      {selectedModal === 'ANNUAL_MODAL' && (
        <AnnualModal
          close={CloseModal}
          selectedDate={selectedDate || new Date()}
          setSelectedDate={setSelectedDate}
          searchData={searchData}
          data={data}
          username={username}
        />
      )}
      {selectedModal === 'DUTY_MODAL' && (
        <DuttyModal
          close={CloseModal}
          selectedDate={selectedDate || new Date()}
          setSelectedDate={setSelectedDate}
          searchData={searchData}
          data={data}
          username={username}
        />
      )}
    </>
  );
};
