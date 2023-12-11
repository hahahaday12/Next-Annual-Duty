interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ApplyInfobox({ children, className }: ButtonProps) {
  return (
    <div className="w-[518px] h-[266px] rounded-[10px] bg-[#e37f7f] pb-[50px] shadow-[1px_2px_7px_1px_#50515985]">
      {children}
    </div>
  );
}
