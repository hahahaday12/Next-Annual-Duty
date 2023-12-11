import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { CommonModal } from '@/components/common/modalLayout';
import { useCommonModal } from '@/hooks/useModal';
import { ApplyDuty } from '@/components/api/allApis';
import { DataItem } from '../dayApply';

type DuttyModalProps = {
  close: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date | null) => void;
  searchData: () => void;
  data: DataItem[];
  username: string;
};

export type DutyData = {
  dutyDate: string;
}

export const DuttyModal = ({
  close,
  selectedDate,
  setSelectedDate,
  searchData,
  data,
  username,
}: DuttyModalProps) => {
  const SubmitText = {
    ApplyDutty: '당직 신청',
    SelectDate: '날짜 선택',
  };
  const { UTCchangeKST, sendReg, isWeekday } = useCommonModal<DutyData>(
    ApplyDuty,
    searchData,
    close
  );
  const [dutyDate] = useState(selectedDate || new Date());
  const [ViewData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const submitButton = () => {
    const isDuplicateDate = data.filter((item) => {
      const itemDay = item.date;
      itemDay.setHours(9, 0, 0, 0);
      selectedDate.setHours(9, 0, 0, 0);
      if (
        selectedDate.getTime() === itemDay.getTime() &&
        item.username === username
      ) {
        return item;
      }
    });
    if (isDuplicateDate.length > 0) {
      alert('이미 해당 날짜에 신청한 당직이 존재합니다.');
      return false;
    }
    const updatedData = {
      ...ViewData,
      dutyDate: UTCchangeKST(dutyDate),
    };

    if (confirm('당직 신청 하시겠습니까?')) {
      sendReg(updatedData);
    }
    return false;
  };

  return (
    <>
      <CommonModal>
        <button
          className="w-[24px] h-[25px] absolute top-[-15px] z-50 bg-white border-solid border-2 border-violet-900 text-[15px] right-[-5px]"
          onClick={close}
        >
          <p className="mt-[-3px]">x</p>
        </button>
        <div className="w-full flex m-auto text-[25px] font-bold relative mt-[20px]">
          <p className="w-2/6 relative m-auto">{SubmitText.ApplyDutty}</p>
        </div>
        <div className="w-[70px] relative top-[20px] m-auto text-[15px]">
          {SubmitText.SelectDate}
        </div>
        <div className="w-[200px] h-[50px] mt-[30px] flex gap-[30px] left-0 right-[10px] top-[40px] m-auto relative">
          <DatePicker
            selected={selectedDate}
            minDate={new Date()}
            onChange={(date) => setSelectedDate(date)}
            selectsStart
            startDate={dutyDate}
            dateFormat="yyyy/MM/dd"
            filterDate={isWeekday}
            className="w-[107px] h-[39px] pl-[16px] p-[5px] rounded-[5px] border-none cursor-pointer relative bottom-[29px] ml-[41px] text-[13px] bg-[#a8a3e29a]"
          />
        </div>
        <div
          className="w-[200px] p-[10px] relative top-[30px] ml-[80px] pb-[10px] bg-[#a8a3e29a] border-none rounded-[10px] font-bold cursor-pointer text-[15px]"
          onClick={submitButton}
        >
          <p className="w-[30px] m-auto flex">등록</p>
        </div>
      </CommonModal>
    </>
  );
};
