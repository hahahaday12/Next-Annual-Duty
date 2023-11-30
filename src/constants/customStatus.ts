export type ItemUsername = {
  username: string;
  status: 'PENDING' | 'APPROVE' | 'REJECT' | 'CANCELLED';
};

export const getTitleWithStatus = (item: ItemUsername): any => {
  if (item.username) {
    switch (item.status) {
      case 'PENDING':
        return `${item.username} (승인 대기)`;
      case 'APPROVE':
        return `${item.username} (승인 완료)`;
      case 'REJECT':
        return `${item.username} (승인 거절)`;
      case 'CANCELLED':
        return `${item.username} (승인 취소)`;
      default:
        return item.username;
    }
  }
};

export const getMyTitleWithStatus = (item: ItemUsername): string => {
  switch (item.status) {
    case 'PENDING':
      return `승인대기`;
    case 'APPROVE':
      return `승인`;
    case 'REJECT':
      return `반려`;
    default:
      return `승인대기`;
  }
};
export const convertStatusToText = (status: string) => {
  switch (status) {
    case 'PENDING':
      return '승인대기';
    case 'APPROVE':
      return '승인완료';
    case 'REJECT':
      return '승인거절';
    case 'CANCELLED':
      return '승인취소';
    default:
      return status;
  }
};
