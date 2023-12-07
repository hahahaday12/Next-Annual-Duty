import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChangeEvent, useState } from 'react';
import { CommonModal } from '@/components/common/modalLayout';
import { useCommonModal } from '@/hooks/useModal';
import { ApplyAnnual } from '@/components/api/allApis';
import { DataItem } from '../dayApply';
import { CategoryBox } from '@/constants/applyCategory';

type ModalProps = {
  close: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date | null) => void;
  searchData: () => void;
  data: DataItem[];
  username: string;
};

export const AnnualModal = ({
  close,
  selectedDate,
  setSelectedDate,
  searchData,
  data,
  username,
}: ModalProps) => {
  const SubmitText = {
    ApplyAnnual: '연차 신청',
    SelectDate: '날짜 선택',
    SelectReason: '사유선택',
  };

  const { UTCchangeKST, sendReg, isWeekday } = useCommonModal(
    ApplyAnnual,
    searchData,
    close
  );

  const [startDate] = useState(selectedDate || new Date());
  const [endDate, setEndDate] = useState(selectedDate || new Date());
  const [getReason, setReason] = useState('연차');
  const [ViewData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const submitButton = () => {
    if (selectedDate === null) {
      console.error('날짜가 선택되지 않았습니다');
      return;
    }
    selectedDate.setHours(9, 0, 0, 0);
    const isDuplicateDate = data.filter((item) => {
      console.log(item);
      const startDay = item.start;
      const endDay = item.end;
      startDay.setHours(9, 0, 0, 0);
      endDay.setHours(9, 0, 0, 0);
      endDate.setHours(9, 0, 0, 0);

      if (
        endDate >= startDay &&
        endDate <= endDay &&
        item.username === username
      ) {
        return item;
      }
    });

    if (isDuplicateDate.length > 0) {
      alert('이미 해당 날짜에 신청한 연차가 존재합니다.');
      return false;
    }

    const updatedData = {
      ...ViewData,
      startDate: UTCchangeKST(startDate),
      endDate: UTCchangeKST(endDate),
      reason: getReason,
    };

    if (confirm('연차 신청 하시겠습니까?')) {
      sendReg(updatedData);
    }
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value);
  };

  const renderBox = () =>
    CategoryBox.map((item) => {
      return <option key={item.id}>{item.name}</option>;
    });

  return (
    <>
      <CommonModal>
        <div
          className="w-[20px] absolute top-[-10px] right-[10px] z-50 bg-white"
          onClick={close}
        >
          x
        </div>
        <div className="w-full flex m-auto text-[25px] font-bold relative mt-[5px]">
          <p className="w-2/6 relative m-auto">{SubmitText.ApplyAnnual}</p>
        </div>
        <div className="w-[70px] relative top-[10px] m-auto text-[15px]">
          {SubmitText.SelectDate}
        </div>
        <div className="w-[250px] h-[60px] flex gap-[30px] left-0 right-[10px] m-auto relative mt-[30px]">
          <DatePicker
            selected={selectedDate}
            minDate={new Date()}
            onChange={(date) => setSelectedDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            filterDate={isWeekday}
            className="w-[107px] h-[39px] pl-[16px] p-[5px] rounded-[5px] border-none cursor-pointer relative text-[13px] bg-[#a8a3e29a]"
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date || new Date())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
            filterDate={isWeekday}
            className="w-[107px] h-[39px] pl-[16px] p-[5px] rounded-[5px] border-none cursor-pointer relative text-[13px] bg-[#a8a3e29a]"
          />
        </div>
        <div className="w-[60px] top-[20px] m-auto relative text-[15px]">
          {SubmitText.SelectReason}
        </div>
        <div className="w-[150px] relative mt-[30px] m-auto">
          <select
            className="w-[150px] bg-white p-[10px] border-solid border-2 border-violet-900 rounded-[10px] text-[15px]"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
          >
            {renderBox()}
          </select>
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
