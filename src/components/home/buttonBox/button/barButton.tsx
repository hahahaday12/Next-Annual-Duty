import { commonTexts } from '@/constants/commonTexts';

export const CommonBarButton = () => {
  return (
    <>
      <div className="w-[100px] h-[13px] rounded-[30px] bg-[#190482] relative">
        <p className="w-[50px] ml-[110px]">{commonTexts.annualText}</p>
      </div>
      <div className="w-[100px] h-[13px] rounded-[30px] bg-[#7752fe] relative mt-[10px]">
        <p className="w-[50px] ml-[110px]">{commonTexts.dutyText}</p>
      </div>
    </>
  );
};
