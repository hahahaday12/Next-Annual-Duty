import { Schedule } from '@/components/schedule/scheduledata';
import { CommonBarButton } from '@/components/home/buttonBox/button/barButton';

export default async function SchedulePage() {
  return (
    <div className="w-[1060px] h-[1000px] top-[20px] relative">
      <div className="w-[210px] h-[50px] ml-[800px] mt-[100px] font-semibold">
        <CommonBarButton />
      </div>
      <Schedule />
    </div>
  );
}
