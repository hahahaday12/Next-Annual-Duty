import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DrowItem } from '../application/dayApply';
import { DateClickArg } from 'fullcalendar/index.js';
import { Event } from '../application/dayApply';
import { MutableRefObject } from 'react';

type ApplyCalendarProps = {
  handleModalClick: (info: DateClickArg) => void;
  eventContent: ({ event }: { event: Event }) => JSX.Element;
  handleDatesSet: () => void;
  viewDrow: DrowItem[];
  calendarRef: MutableRefObject<FullCalendar | null>;
};

export const CommonApplyCalendar = ({
  handleModalClick,
  eventContent,
  handleDatesSet,
  viewDrow,
  calendarRef,
}: ApplyCalendarProps) => {
  return (
    <div className="w-[1200px] m-auto top-[70px] rounded-[10px] bg-yellow-700 shadow-[1_px_2px_7px_1px_#50515985] relative">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={(info) => handleModalClick(info)}
        eventContent={eventContent}
        datesSet={handleDatesSet}
        ref={calendarRef}
        timeZone="Asia/Seoul"
        events={viewDrow as unknown as EventInit[]}
        dayMaxEvents={true}
        locale={'ko'}
      />
    </div>
  );
};
