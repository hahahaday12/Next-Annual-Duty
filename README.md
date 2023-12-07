# FE_Client

<div style="text-align: center;">
  <img src="https://github.com/FastCampus-Mini5/BE_server/assets/86757234/55cceba1-9349-4336-9439-8fd86e195f24"/>
</div>

<h1> 🐻‍❄ 프로젝트 소개</h1>
-> nextJs 로 마이그레이션 한 당직, 연차 관리 개인 프로젝트 입니다. <br> nextJs의 장점을 이용해서 프로젝트를 구현하려고 하였습니다.<br>
기본적인 코드는 같으나, 리팩토링이 필요한 코드는 수정하였습니다.

<div align=center><h1> ⚙ 프로젝트 설계 </h1></div><br>


🔥오류 고찰 및 변경점🔥<br>
📌 1. token 가져오기 , token 저장
next에서는 axios 보다는 fetch를 권하고 있음. 따라, 모든 api 를 fetch로 변경. <br>
하지만, fetch에는 axios의 장점인 intercepter 이 없으며 , 인증을 위한 token값을 매번 헤더에 넣어줘야 하는 번거로움이 있음.<br>
따라 상태관리 라이브러리 zustand 를 이용하여 로그인시 token값을 저장하고 업데이트 된 값을 api header에 넣었지만 함수 구성 요소의 본문 내부에서만 호출할수 있기 때문에 실패.
따라서 `localStorage.getItem('token')` 을 통해 직접 가져와서 넣는것을 선택. <br>

📌 2.  userInfo에 있는 data값을 전역적으로 쓰지 위해 Recoil을 사용하려고 함<br>
하지만, 최상위 layout에 `RecoilRoot` 를  감싸는것도 실패함. nextJs 공식 문서에서는 swr 의 라이브러리를 주로 사용하고 있음. <br>
SWR 키를 사용하며 그 요청이 자동으로 중복 제거, 캐시, 공유되므로, 단 한 번의 요청만 API로 전송 되는 장점이 있음.
이후 header에 유저 정보를 가져오기 위해 swr 을 이용해서 custom hook을 만듬. hook 안에서 userinfo의 api를 get한후에 서버에서 오는 이미지를 출력함 . <br>
또한, '프로필 수정' 컴포넌트에서도 userInfo 의 데이터가 필요하기 때문에 , <br/>
SWR 를  이용하여 구현 .

📌 3. 일정 관리 사이트 이다 보니 fullCalendar 를 연동하는 로직이 많이 중복 되었다는 느낌을 받음.  <br>
따라 calenndarLayout 이라는 custom hook 을 생성한뒤 중복되는 로직에 해당 훅을 사용

📌 4. 기존에 상위페이지에서 (연차/당직 버튼, 연차 신청 모달, 당직 신청 모달) 컴포넌트에 props 로 데이터를 전달해 주었고, 각각 모달 컴포넌트 안에서 필요한 코드 로직을 작성 하였음.<br>
하지만, 각각의 모달 컴포넌트 에서 중복 되는 로직을 customhook으로 변경 하였고, 상위 컴포넌트에서 props로 받아온 함수 데이터는 , 다시 customhook에 props로 전달.







6.

-------------------------------------
🔥성능 변화 기록🔥<br>

1. 🌺 메인 홈 페이지 🌺

✨ AS-IS <br>
-> nextJs 마이그레이션 전 main페이지 성능<br> 
<img width="300" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b7aa7be6-44a9-48ce-98fd-2735d2d2d7dd"><br>

✨ TO-BE <br>
-> nextJs 마이그레이션 후 main페이지 성능<br> 
<img width="300" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/a54534c5-03b6-431d-b269-0b366776fd2e"><br>

-> 페이지 초기 렌더링 속도가 4.5 초 에서 0.2 초로  nextJs로 마이그레이션후 훨씬더 빠르게 로딩되는 모습을 볼수 있다. <br>
  react18 버전 이후 출시된 Next.js  App 디렉토리 에서는 RSC, RCC 의 기능을 사용할수 있게 되었다. <br>
  또한 next.js의 13 이상의 버전에서 app directory 에서는 기본적으로 모든 컴포넌트가 RSC 이다. <br> 
  RSC 를 사용하게 되면 서버에서 이미 모두 실행된 후 직렬화된 JSON 형태로 전달되기 때문에 어떠한 bundle도 필요하지 않기 때문에 번들사이즈를 감량할수 있다.<br>
  따라서 기존 react 로 구현 하였을때 보다 훨씬더 빠른 초기 로딩속도를 경험 할수 있던것 같다.<br>
  하지만 아직 성능과, 접근성, 검색엔진 최적화의 성능이 보통이기 때문에 진단 사항을 통해 조금더 개선 해본다.<br> 

📌 1) < title > 요소가 없음<br>
<img width="260" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b65a17c7-e988-4f69-a1f8-6c8c1e4e2598">

📌 2) 주소 표시줄의 테마 색상을 설정하지 않음<br>
<img width="325" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b38fb3e0-87ef-49e8-9aa9-2cbfd6e3b340">

✅ 1,2 번 수정 코드 <br>
```javascript
 return (
    <html lang="ko">
      <meta name="theme-color" content="#2656f6" />
      <title>당연하지</title>
      <body>{children}</body>
    </html>
  );
```
📌 3) 네트워크 페이로드 크기에 대해 나왔는데 그중 home/page.tsx 의 페이로드가 크다는것을 보았다. <br/>
실제로 app 디렉토리의 하위 폴더는 기본적으로 RSC 가 적용되어있어서 <br>
'use client' 즉 , 클라이언트 컴포넌트가 되지 않는것을 권장하는데 해당 페이지에 state, 와 이벤트 값을 썼기 때문에 코드가 길어짐에 따라 페이로드 크기도 커진것 같다.
따라 page.tsx 에는 기본적인 정적 레이아웃만 넣어 놓고 , 이외의 코드는 따로 app 폴더의 동일 선상에 있는 components/ home/homepage.tsx 파일에 분리 해서 작성 하였다.

📍페이로드 크기 사진<br>
<img width="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/14cbfffa-74b0-48e1-a01f-db31732592ba">

✨이전 코드
```javascript
'use client';
import { AnnualContainer } from '@/components/home/annual/annual';
import { DutyContainer } from '@/components/home/duty/duty';

export default function HomeMain() {
  const [CalDate] = useState<number>(2023);
  const [annualDataList, setAnnualDataList] = useState([]);
  const [dutyDataList, setDutyDataList] = useState([]);
  (코드 생략)
  const datalist = useCallback((datalist: any[]) => {
    const filterViewData = datalist.filter((item: { status: string }) => {
      return item.status !== 'CANCELLED';
    });
    return filterViewData;
  }, []);

  return (
    <div className="w-[1060px] h-[1280px] top-[40px] relative font-LINESeedKRBd">
      <div className="mt-[60px] flex gap-5 content-between">
        <AnnualContainer
          datalist={datalist}
          annualDataList={annualDataList}
          extractDate={extractDate}
          deleteButton={deleteButton}
        />
        <DutyContainer
          datalist={datalist}
          dutyDataList={dutyDataList}
          extractDate={extractDate}
          deleteButton={deleteButton}
        />
      </div>
      <CenterBarBox />
      <AllCalendarList />
    </div>
  );
}
```

✨수정 코드
```javascript
export default function HomeMain() {
  return (
    <>
      <meta name="description" content="Put your description here."></meta>
      <div className="w-[1060px] h-[1280px] top-[40px] relative font-LINESeedKRBd">
        <div className="mt-[60px] flex gap-5 content-between">
          <AllAnnualDuty />
        </div>
        <CenterBarBox />
        <AllCalendarList />
      </div>
    </>
  );
}
```
✅ 수정 결과<br>
-> props 와 이벤트 코드가 쓰이는 부분을 다른 컴포넌트 로 분리해서 수정하였지만, 분리 해도 실행되는 api와 실행 코드는 똑같기 때문에 페이로드 크기가 변동 되지 않았다.
하지만 RSC 와 RCC 의 컴포넌트를 적절하게 나눴다고 생각하기 때문해 해당 부분은 일단 보류 해둔다.<br> 

📌 4) 저대비 색상 문제<br> 
  -> 저대비 이미지 때문에 텍스트가 보이지 않을수도 있다는 뜻인것 같다. 아래 사이트 들어가보니 내가 사용하는 색이 WCAG 표준 에 적합한지 알려 준다.
  해당 페이지를 보면 '영향을 받는 장애' 에 대해 저시력 이나 색맹이신 분들이 구별하지 못하는 색상을 알려주고 그래프로 사용자 영향에 얼만큼 미치는지 알려준다. <br>
  
<img width="389" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/d2cad154-b5bb-4ac5-ab6b-b29ab733a609"> <br>
<img width="389" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/c341e88d-b57d-42aa-bd26-fa68f16fb616"> <br>
내가 사용하는 색상이 기준에 맞는지 찾아볼수 있는 사이트 url: <https://dequeuniversity.com/rules/axe/4.7/color-contrast> <br>
이 외에도 문서에 메타 설명 추가, 폰트 최적화 등 최적화에 관한 문서들을 보며 조금더 나은 성능 점수를 얻을 수 있도록 노력 하였다. 

✨ AS-IS
-> nextJs 마이그레이션 후 첫번째 main페이지 성능<br> 
<img width="250" height="300" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/a54534c5-03b6-431d-b269-0b366776fd2e"><br>

✨ TO-BE
-> 성능 진단을 기반하 여 수정후 두번째 main페이지 성능<br> 
<img width="250" height="300" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/811291ad-61c1-4654-a49c-e850965193ca">

-------
2. 🌺연차 , 당직 신청 페이지🌺

✨ AS-IS <br>
-> nextJs 마이그레이션 전 연차,당직 페이지 성능<br> 
<img width="350" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/37a2c729-f4c2-4408-a4f0-d2bc760a2ea7"><br>

✨ TO-BE <br>
-> nextJs 마이그레이션 후 main페이지 성능<br> 
<img width="350" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/732d3086-5e79-41c1-8a2e-bc44025678c7"><br>

