import Image from 'next/image';
import ImageLogo from '@/assets/animation logo.png';
import LogoText from '@/assets/animationText.png';

export const Topimagesbox = () => {
  return (
    <div className="w-[1060px] absolute t-[-14px]">
      <div className="w-[300px] m-auto animate-bounce flex">
        <Image src={ImageLogo} alt="topImage" width={100} height={100} />
        <Image
          src={LogoText}
          alt="topImage"
          width={200}
          height={120}
          className="top-[-20px] absolute ml-[120px]"
        />
      </div>
    </div>
  );
};
