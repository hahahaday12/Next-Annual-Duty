import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import { AnnualDrowItem, DutyItemType } from '../application/dayApply';
import { CombinedDataItem } from '@/hooks/useCalendarData';

interface CommonCalendarProps {
  viewDrow: CombinedDataItem[];
  CalDate: number;
  setCalDate: (value: number) => void;
}

export const CommonCalendar = ({
  viewDrow,
  CalDate,
  setCalDate,
}: CommonCalendarProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);

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

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="Asia/Seoul"
        datesSet={handleDatesSet}
        ref={calendarRef}
        dayMaxEvents={true}
        events={viewDrow as unknown as EventInit[]}
        locale={'ko'}
      />
    </>
  );
};
