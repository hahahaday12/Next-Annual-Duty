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

export const CustomEvent: React.FC<TitleBoxProps> = ({ title, children }) => {
  const backgroundColor = clsx({
    'bg-[#190482]': title === 'ANNUAL',
    'bg-[#7752FE]': title === 'DUTY',
  });

  return (
    <div
      className={clsx(
        'text-[15px]',
        'w-full',
        'h-[20px]',
        'm-auto',
        'rounded-[3px]',
        'pl-[3px]',
        'text-[#ffff]',
        'border-none',
        'overflow-hidden',
        backgroundColor
      )}
    >
      {children}
    </div>
  );
};

// const ButtonStyle = ({ isActive }: { isActive: boolean }) => {
//   const buttonClasses = clsx(
//     'w-32', // Width 125px
//     'text-white', // Text color
//     'rounded-2xl', // Border radius 10px
//     'p-5', // Padding 20px
//     'font-semibold', // Font weight 800
//     'border-none', // No border
//     'cursor-pointer', // Cursor pointer
//     'mt-3', // Margin top 10px
//     'bg-blue-800', // Background color when active
//     'ml-3', // Margin left when not active
//     { '-ml-10': isActive } // Conditional margin left when active
//   );

//   return <button className={buttonClasses}>Your Button Text</button>;
// };

export const ButtonStyle: React.FC<ButtonProps> = ({
  isActive,
  onClick,
  children,
}) => {
  const backgroundColor = clsx({
    'bg-[#190482]': isActive === true,
    'bg-[#7752FE]': isActive === false,
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
        backgroundColor,
        marginLeft
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
