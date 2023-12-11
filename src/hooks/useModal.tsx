'use client'

type ApplyALLType<T> = (updatedData: T) => Promise<any>;
type SearchDataType = () => void;
type CloseType = () => void;

export const useCommonModal = <T,>(
  ApplyALL: ApplyALLType<T>,
  searchData: SearchDataType,
  close: CloseType
) => {
  const UTCchangeKST = (date: Date) => {
    let krDate = new Date(date);
    krDate.setHours(krDate.getHours() + 9);
    return krDate.toISOString();
  };

  const sendReg = async (updatedData: T) => {
    try {
      const response = await ApplyALL(updatedData);
      if (response.status === 200) {
        alert('신청 되었습니다.');
        searchData();
        close();
      } else {
        alert('신청 실패했습니다. 관리자에게 문의하세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return {
    UTCchangeKST,
    sendReg,
    isWeekday,
  };
};
