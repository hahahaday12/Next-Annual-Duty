import { Chango, Inter } from 'next/font/google';
// inter 에서 가져오는 기본 글꼴

export const inter = Inter({ subsets: ['latin'] });

export const changoKr = Chango({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['400'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});
