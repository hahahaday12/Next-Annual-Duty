import { Header } from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-500">
      <div className="w-full flex-none md:w-64">
        <Header />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}