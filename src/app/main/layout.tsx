import { Header } from '@/components/common/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-[#f5f6fa]">
      <div className="w-full flex-none">
        <Header />
      </div>
      <div className="flex-grow p-6 ">{children}</div>
    </div>
  );
}
