import { useEffect, useState } from 'react';
import { ItemUsername } from '@/constants/customStatus';

export type Item = {
  title: string;
  start: string;
  end: string;
  type: string;
  status: string;
  username: string;
};

type User = {
  startDate: string;
  endDate: string;
  username: string;
  response: any;
  status: 'PENDING' | 'APPROVE' | 'REJECT' | 'CANCELLED';
};

type Duty = {
  title: string;
  response: any;
  dutyDate: string;
  email: string;
  username: string;
  status: 'PENDING' | 'APPROVE' | 'REJECT' | 'CANCELLED';
};

export const useCalendarData = (
  fetchDataFunction1: Promise<User>,
  fetchDataFunction2: Promise<Duty>,
  getMyTitle: (item: ItemUsername) => string,
  CalDate: number
) => {
  const [viewDrow, setViewDrow] = useState<Item[]>([
    {
      title: '',
      start: '',
      end: '',
      status: '',
      type: '',
      username: '',
    },
  ]);

  useEffect(() => {
    Promise.all([fetchDataFunction1, fetchDataFunction2])
      .then(([data1, data2]) => {
        const processedData1 = data1.response.map((item: User) => ({
          title: getMyTitle(item),
          start: new Date(item.startDate).toISOString(),
          end: new Date(item.endDate).toISOString(),
          type: 'ANNUAL',
          status: '',
        }));

        const processedData2: Duty[] = data2.response.map((item: Duty) => ({
          ...item,
          title: getMyTitle(item),
          date: new Date(item.dutyDate),
          type: 'DUTY',
          status: '',
        }));
        const combinedData = [...processedData1, ...processedData2];
        setViewDrow(combinedData);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [CalDate]);

  return { viewDrow };
};
