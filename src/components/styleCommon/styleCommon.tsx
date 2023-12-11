import clsx from 'clsx';
import React, { ReactNode } from 'react';

type StatusBoxProps = {
  status: string;
  children: ReactNode;
};

type TitleBoxProps = {
  title: string;
  children: ReactNode;
};

type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export const StatusBox: React.FC<StatusBoxProps> = ({ status, children }) => {
  const backgroundColorClass = clsx({
    'bg-lightgray': !status || status === 'OTHER_STATUS',
    'bg-purple-700': status === 'PENDING',
    'bg-rose-800': status === 'REJECT',
    'bg-indigo-800': status === 'APPROVE',
  });

  return (
    <div
      className={clsx(
        'w-[75px]',
        'rounded-[3px]',
        'right-[100px]',
        'p-[5px]',
        'pl-[13px]',
        'text-[12px]',
        'text-white',
        'absolute',
        backgroundColorClass
      )}
    >
      {children}
    </div>
  );
};

export const CancelBox: React.FC<StatusBoxProps> = ({ status }) => {
  return (
    <div
      className={clsx(
        'w-[75px]',
        'rounded-[5px]',
        'right-[20px]',
        'p-[9px]',
        'text-[12px]',
        'text-white',
        'pl-[25px]',
        'absolute'
      )}
    >
      {status}
    </div>
  );
};

// export const CustomEvent: React.FC<TitleBoxProps> = ({ title, children }) => {
//   const backgroundColor = title === 'ANNUAL' ? 'bg-[#190482]' : 'bg-[#7752FE]';

//   return (
//     <div
//       className={`text-[15px] w-full h-[20px] m-auto rounded-[3px] pl-[3px] text-[#ffff] border-none font-LINESeedKRBd mt-[10px] ${backgroundColor}`}
//     >
//       {children}
//     </div>
//   );
// };

export const ButtonStyle: React.FC<ButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  const backgroundColor = clsx({
    'bg-[#0C356A]': isActive === true,
    'bg-[#1a3ba5e2]': isActive === false,
  });

  const marginLeft = clsx({
    'ml-[-20px]': isActive === true,
    'ml-[-10px]': isActive === false,
  });

  return (
    <div
      className={clsx(
        'w-[125px]',
        'mt-[10px]',
        'rounded-[10px]',
        'p-[20px]',
        'border-none',
        'cursor-pointer',
        'font-normal',
        backgroundColor,
        marginLeft
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
