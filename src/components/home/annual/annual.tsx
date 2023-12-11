'use client';
import { mainTexts } from '@/constants/mainHome';
import { useUser } from '@/hooks/useUser';
import { convertStatusToText } from '@/constants/customStatus';
import { StatusBox } from '@/components/styleCommon/styleCommon';
import { ApplyInfobox } from '@/components/home/applyLayout/boxComponets';

interface Item {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const AnnualContainer = ({
  datalist,
  annualDataList,
  extractDate,
  deleteButton,
}: any) => {
  const { user } = useUser();

  const remaindata = user?.response?.remainVacation;

  return (
    <>
      <ApplyInfobox>
        <div className="w-[430px] pb-1 relative left-[33px] top-[20px] flex gap-[250px] text-[15px] font-bold">
          <span>{mainTexts.applyAnnualText}</span>
          <span>
            {mainTexts.remainText}: {remaindata}개
          </span>
        </div>
        <div className="w-[453px] h-[200px] relative top-3 m-auto overflow-y-auto max-h-[200px]">
          {datalist(annualDataList).map((item: Item) => (
            <div
              className="w-full h-[30px] m-auto flex mt-[20px]"
              key={item.id}
            >
              <div className="w-[250px] p-[7px] pb-[10px]">
                📌 {extractDate(item.startDate)} ~ {extractDate(item.endDate)}
              </div>
              <StatusBox status={item.status}>
                {convertStatusToText(item.status)}
              </StatusBox>
              <div
                className="w-[70px] absolute right-[20px] pl-[25px] cursor-pointer text-[12px] rounded-[5px] p-[5px] bg-[#212a3e] text-white"
                onClick={() => deleteButton('연차', item.id)}
              >
                {mainTexts.annualCancel}
              </div>
            </div>
          ))}
        </div>
      </ApplyInfobox>
    </>
  );
};
