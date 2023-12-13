import { ApplyInfobox } from '@/components/home/applyLayout/boxComponets';
import { mainTexts } from '@/constants/mainHome';
import { StatusBox, CancelBox } from '@/components/styleCommon/styleCommon';
import { convertStatusToText } from '@/constants/customStatus';
import { CombinedDatalist } from '../mainHome';

export type DutyItem = {
  id: number;
  dutyDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
};

type DutyProps = {
  dutyDataList: CombinedDatalist[];
  extractDate: (dateString: string) => string;
  deleteButton: (type: string, id: string) => void;
  datalist: (datalist: CombinedDatalist[]) => any;
};

export const DutyContainer = ({
  dutyDataList,
  extractDate,
  deleteButton,
  datalist,
}: DutyProps) => {
  return (
    <>
      <ApplyInfobox>
        <div className="w-[430px] pb-1 relative left-[33px] top-[20px] flex gap-[250px] text-[15px] font-bold">
          <span>{mainTexts.applyDutyTexts}</span>
        </div>
        <div className="w-[453px] h-[200px] relative top-3 m-auto overflow-y-auto max-h-[200px]">
          {datalist(dutyDataList).map((el: DutyItem) => (
            <div className="w-full h-[30px] m-auto flex mt-[20px]" key={el.id}>
              <h2>📌 {extractDate(el.dutyDate)}</h2>
              <StatusBox status={el.status}>
                {convertStatusToText(el.status)}
              </StatusBox>
              <div
                className="w-[70px] absolute right-[20px] pl-[25px] cursor-pointer text-[12px] rounded-[5px] p-[5px] bg-[#212a3e] text-white"
                onClick={() => deleteButton('당직', el.id.toString())}
              >
                {mainTexts.dutyCancel}
              </div>
            </div>
          ))}
        </div>
      </ApplyInfobox>
    </>
  );
};
