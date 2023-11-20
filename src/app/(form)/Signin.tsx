'use client';
import { signIn } from '@/app/utils/postSignin';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface IForm {
  email: string;
  password: string;
}

export const SigninForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit: handleSubmit,
    formState: { isSubmitting },
  } = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      email: 'testtest@gmail.com',
      password: 'Test123456!',
    },
  });

  async function onSubmit(data: IForm) {
    console.log(data);

    if (data.email === undefined || data.email === '' || data.email === null) {
      alert('이메일을 입력해주세요!');
      return false;
    }

    if (
      data.password === undefined ||
      data.password === '' ||
      data.password === null
    ) {
      alert('비밀번호를 입력해주세요!');
      return false;
    }

    try {
      const res = await signIn(data.email, data.password);
      let headers = res.headers;
      if (headers) {
        let jwtToken = headers.get('authorization');
        localStorage.setItem('token', jwtToken as string);
        alert('로그인 되었습니다!');
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      alert('로그인에 실패하였습니다:(');
    }
  }

  return (
    <>
      <form
        className="flex flex-col relative mt-[100px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="padding-[10px] inline-[16px] font-bold w-[400px]">
          이메일
        </div>
        <input
          className="border-solid border-[1px] #d9d9d9 pl-[10px] h-[60px] mb-[6px] rounded-[10px]"
          placeholder="이메일을 입력해 주세요"
          type="email"
          {...register('email')}
        />
        <div className="padding-[10px] inline-[16px] font-bold w-[400px]">
          비밀번호
        </div>
        <input
          className="border-solid border-[1px] #d9d9d9 pl-[10px] h-[60px] mb-[6px] rounded-[10px]"
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          {...register('password')}
        />
        <button
          className="w-[400px] h-[60px] text-center boder-[10px] mb-[36px] mt-[18px] cursor-pointer bg-[#2656f6] rounded-[10px]"
          type="submit"
          disabled={isSubmitting}
        >
          로그인
        </button>
      </form>
    </>
  );
};
