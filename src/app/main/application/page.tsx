import { Topimagesbox } from '@/components/application/topImage';
import { CommonBarButton } from '@/components/home/buttonBox/button/barButton';
import { AllApply } from '@/components/application/dayApply';

export default async function Application() {
  return (
    <div className="w-[1200px] pb-[900px] m-auto mt-[100px] relative flex">
      <div className="w-[1200px] h-[50px] top-[10px] pl-[20px] text-[20px] font-bold absolute">
        <Topimagesbox />
        <div className="w-[150px] absolute right-[10px] text-[15px] font-LINESeedKRBd">
          <CommonBarButton />
        </div>
      </div>
      <AllApply />
    </div>
  );
}
