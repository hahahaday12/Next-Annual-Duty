import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  DrowItem,
  DutyItemType,
  AnnualDrowItem,
} from '../application/dayApply';
import { DateClickArg } from 'fullcalendar/index.js';
import { MutableRefObject } from 'react';

type ApplyCalendarProps = {
  handleModalClick: (info: DateClickArg | Date) => void;
  handleDatesSet: () => void;
  viewDrow: DrowItem[] | DutyItemType[] | AnnualDrowItem[];
  calendarRef: MutableRefObject<FullCalendar | null>;
};

export const CommonApplyCalendar = ({
  handleModalClick,
  handleDatesSet,
  viewDrow,
  calendarRef,
}: ApplyCalendarProps) => {
  return (
    <div className="w-[1200px] m-auto top-[70px] rounded-[10px] bg-white shadow-[1px_2px_7px_1px_#50515985] absolute font-LINESeedKRBd">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={(info) => handleModalClick(info)}
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
