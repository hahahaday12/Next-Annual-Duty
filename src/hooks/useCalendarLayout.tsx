import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CustomEvent } from '@/components/styleCommon/styleCommon';

interface CalendarCommonProps<T> {
  viewDrow: T[];
}

type Event = {
  _def: any;
  title: string;
};

const useCalendar = <T,>({ viewDrow }: CalendarCommonProps<T>) => {
  const [CalDate, setCalDate] = useState<number>(2023);
  const calendarRef = useRef<FullCalendar | null>(null);

  const eventContent = ({ event }: { event: Event }) => {
    return (
      <CustomEvent title={event._def.extendedProps.type}>
        {event.title}
      </CustomEvent>
    );
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

  const CalendarComponent = () => (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      timeZone="Asia/Seoul"
      eventContent={eventContent}
      datesSet={handleDatesSet}
      ref={calendarRef}
      dayMaxEvents={true}
      events={viewDrow as unknown as EventInit[]}
      locale={'ko'}
    />
  );

  return { CalendarComponent, setCalDate };
};

export default useCalendar;
