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

type Annual = {
  title: string;
  response: any;
  startDate: Date;
  endDate: Date;
  type: string;
  status: string;
  username: string;
};

type Duty = {
  title: string;
  response: any;
  dutyDate: Date;
  email: string;
  username: string;
  status: string;
};

export type CombinedDataItem = Annual | Duty;

export const useCalendarData = (
  fetchDataFunction1: Promise<Annual>,
  fetchDataFunction2: Promise<Duty>,
  getStatus: (item: ItemUsername) => string,
  CalDate: string
) => {
  const [viewDrow, setViewDrow] = useState<CombinedDataItem[]>([]);

  useEffect(() => {
    Promise.all([fetchDataFunction1, fetchDataFunction2])
      .then(([data1, data2]) => {
        const processedData1: Annual[] = data1.response.map((item: Annual) => ({
          title: getStatus(item),
          start: new Date(item.startDate).toISOString(),
          end: new Date(item.endDate).toISOString(),
          type: 'ANNUAL',
          status: '',
          username: '',
        }));

        const processedData2: Duty[] = data2.response.map((item: Duty) => ({
          ...item,
          title: getStatus(item),
          start: item.dutyDate,
          end: '',
          type: 'DUTY',
          status: '',
          username: '',
        }));
        const combinedData: CombinedDataItem[] = [
          ...processedData1,
          ...processedData2,
        ];
        setViewDrow(combinedData);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [CalDate]);
  return { viewDrow };
};
