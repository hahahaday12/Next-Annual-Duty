import { CenterBarBox } from '@/components/home/buttonBox/barBox';
import { AllCalendarList } from '@/components/home/calendar/allCalendar';
import AllAnnualDuty from '@/components/home/mainHome';

export default function HomeMain() {
  return (
    <>
      <meta name="description" content="Put your description here."></meta>
      <div className="relative flex content-center">
        <div className="h-[1280px] relative font-LINESeedKRBd top-[40px] m-auto bg-fuchsia-500">
          <div className="w-full mt-[60px] flex">
            <AllAnnualDuty />
          </div>
          <CenterBarBox />
          <AllCalendarList />
        </div>
      </div>
    </>
  );
}
