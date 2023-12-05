import '@/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <meta name="theme-color" content="#2656f6" />
      <title>당연하지</title>
      <body>{children}</body>
    </html>
  );
}
