# FE_Client

<div style="text-align: center;">
  <img src="https://github.com/FastCampus-Mini5/BE_server/assets/86757234/55cceba1-9349-4336-9439-8fd86e195f24"/>
</div>

<h1> 🐻‍❄ 프로젝트 소개</h1>
-> nextJs 로 마이그레이션 한 당직, 연차 관리 개인 프로젝트 입니다. <br> nextJs의 장점을 이용해서 프로젝트를 구현하려고 하였습니다.<br>
기본적인 코드는 같으나, 리팩토링이 필요한 코드는 수정하였습니다.

<div align=center><h1> ⚙ 프로젝트 설계 </h1></div><br>


🔥오류 고찰🔥<br>
1. 한곳에서의 데이터를 전역으로 가져오기 위해 상태관리 라이브러리를 기존에 사용. next에서는 axios 보다는 fetch를 권하고 있음.<br>
따라, 모든 api 를 fetch로 변경. <br>
하지만, fetch에는 axios의 장점인 intercepter 이 없으며 , 인증을 위한 token값을 매번 헤더에 넣어줘야 하는 번거로움이 있음.<br>
따라 상태관리 라이브러리 zustand 를 이용하여 로그인시 token값을 저장하고 업데이트 된 값을 api header에 넣었지만 함수 구성 요소의 본문 내부에서만 호출할수 있기 때문에 실패.<br>
따라서 `localStorage.getItem('token')` 을 통해 직접 가져와서 넣는것을 선택. <br>

2.  userInfo에 있는 data값을 전역적으로 쓰지 위해 Recoil을 사용하려고 함<br>
하지만, 최상위 layout에 `RecoilRoot` 를  감싸는것도 실패함. nextJs 공식 문서에서는 swr 의 라이브러리를 주로 사용하고 있음. <br>
SWR 키를 사용하며 그 요청이 자동으로 중복 제거, 캐시, 공유되므로, 단 한 번의 요청만 API로 전송 되는 장점이 있음.
이후 header에 유저 정보를 가져오기 위해 swr 을 이용해서 custom hook을 만듬. hook 안에서 userinfo의 api를 get한후에 서버에서 오는 이미지를 출력함 . <br>
또한, '프로필 수정' 컴포넌트에서도 userInfo 의 데이터가 필요하기 때문에 , <br/>
SWR의 장점 (`전역 캐시를 이용해 모든 컴포넌트 사이에 데이터를 저장하고 공유하여 불필요한 Api 호출을 막는다`) 을 이용하여 구현 

3. 일정 관리 사이트 이다 보니 fullCalendar 를 연동하는 로직이 많이 중복 되었다는 느낌을 받음.  <br>
따라 calenndarLayout 이라는 custom hook 을 생성한뒤 중복되는 로직에 해당 훅을 사용

4. 





6.
🔥성능 변화 기록🔥<br>

AS-IS <br>
 nextJs 마이그레이션 전 main페이지 성능<br> 
<img width="300" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b7aa7be6-44a9-48ce-98fd-2735d2d2d7dd"><br>

TO-BE
 nextJs 마이그레이션 후 main페이지 성능<br> 
<img width="300" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/a54534c5-03b6-431d-b269-0b366776fd2e"><br>

-> 페이지 초기 렌더링 속도가 4.5 초 에서 0.2 초로  nextJs로 마이그레이션후 훨씬더 빠르게 로딩되는 모습을 볼수 있다. <br>
  react18 버전 이후 출시된 Next.js  App 디렉토리 에서는 RSC, RCC 의 기능을 사용할수 있게 되었다. <br>
  또한 next.js의 13 이상의 버전에서 app directory 에서는 기본적으로 모든 컴포넌트가 RSC 이다. <br> 
  RSC 를 사용하게 되면 서버에서 이미 모두 실행된 후 직렬화된 JSON 형태로 전달되기 때문에 어떠한 bundle도 필요하지 않기 때문에 번들사이즈를 감량할수 있다.<br>
  따라서 기존 react 로 구현 하였을때 보다 훨씬더 빠른 초기 로딩속도를 경험 할수 있던것 같다.<br>
  하지만 아직 성능과, 접근성, 검색엔진 최적화의 성능이 보통이기 때문에 진단 사항을 통해 조금더 개선 해본다.<br> 

1. <tite> 요소가 없음<br>
<img width="260" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b65a17c7-e988-4f69-a1f8-6c8c1e4e2598">

2. 주소 표시줄의 테마 색상을 설정하지 않음.<br>
<img width="325" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b38fb3e0-87ef-49e8-9aa9-2cbfd6e3b340">

1,2 번 수정 코드 <br>
```javascript
 return (
    <html lang="ko">
      <meta name="theme-color" content="#2656f6" />
      <title>당연하지</title>
      <body>{children}</body>
    </html>
  );
```

3. select 요소에 label 요소가 없음<br> 
<img width="299" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/c21128fe-15e9-4663-97aa-5bd3849d0d26">

반영<br>
문서를 보니, select 요소 주위로 래핑하면 된다고 한다.<br> 
참고문서: <https://dequeuniversity.com/rules/axe/4.7/select-name> <br>

수정코드
```javascript
<label>
  <select
    className="w-[120px] h-[40px] text-[13px] bg-[#1b9c85] rounded-none font-bold relative text-white "
    value={selectedOption}
    onChange={(e) => setSelectedOption(e.target.value)}
  >
    {ExcelCategory.map((item) => (
      <option key={item.id}>{item.name}</option>
    ))}
  </select>
</label>
```
 


-------

