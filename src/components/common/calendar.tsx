import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useRef } from 'react';
import { CustomEvent } from '@/components/styleCommon/styleCommon';
import { Item } from '@/hooks/useCalendarData';

type Event = {
  _def: any;
  title: string;
};

export const CalendarCommon = ({ viewDrow }: { viewDrow: Item[] }) => {
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

  return (
    <>
      <div className="w-full h-[870px] pb-[40px] bg-[#ffff] relative top-[30px] rounded-[10px] shadow-[1px_2px_7px_1px_rgba(0,0,0,0.3)]">
        <div className=" w-[1025px] relative m-auto h-[700px] top-[10px] font-LINESeedKR-Bd pb-[40px]">
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
        </div>
      </div>
    </>
  );
};
