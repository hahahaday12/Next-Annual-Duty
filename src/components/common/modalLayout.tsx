interface ModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const CommonModal = ({ children }: ModalProps) => {
  return (
    <div className=" w-[400px] pb-[40px] flex bg-white absolute top-[250px] z-50 m-auto rounded-[10px] border-solid border-2 border-violet-900 left-0 right-0 font-LINESeedKRBd">
      <div className="w-11/12 text-[25px] font-bold mt-[30px] relative pb-[40px] m-auto">
        {children}
      </div>
    </div>
  );
};
