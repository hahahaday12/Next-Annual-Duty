# FE_Client

<div style="text-align: center;">
  <img src="https://github.com/FastCampus-Mini5/BE_server/assets/86757234/55cceba1-9349-4336-9439-8fd86e195f24"/>
</div>

<h1> 🐻‍❄ 프로젝트 소개</h1>
-> nextJs 로 마이그레이션 한 당직, 연차 관리 개인 프로젝트 입니다. <br> nextJs의 장점을 이용해서 프로젝트를 구현하려고 하였습니다.<br>
기본적인 코드는 같으나, 리팩토링이 필요한 코드는 수정하였습니다.

<div align=center><h1> ⚙ 프로젝트 설계 </h1></div><br>


🔥오류 기록🔥<br>
1. 한곳에서의 데이터를 전역으로 가져오기 위해 상태관리 라이브러리를 기존에 사용. next에서는 axios 보다는 fetch를 권하고 있음.<br>
따라, 모든 api 를 fetch로 변경. <br>
하지만, fetch에는 axios의 장점인 intercepter 이 없으며 , 인증을 위한 token값을 매번 헤더에 넣어줘야 하는 번거로움이 있음.<br>
따라 상태관리 라이브러리 zustand 를 이용하여 로그인시 token값을 저장하고 업데이트 된 값을 api header에 넣었지만 함수 구성 요소의 본문 내부에서만 호출할수 있기 때문에 실패.<br>
따라서 `localStorage.getItem('token')` 을 통해 직접 가져와서 넣는것을 선택. <br>

2.  userInfo에 있는 data값을 어떻게 전역적으로 쓸껀지.. 고민  <br>
nextJs app 디렉터리 방식으로 사용하지만, 최상위 layout에 `RecoilRoot` 를  감싸는것도 실패함. nextJs 공식 문서에서는 swr 의 라이브러리를 주로 사용하고 있음. <br>
SWR 키를 사용하며 그 요청이 자동으로 중복 제거, 캐시, 공유되므로, 단 한 번의 요청만 API로 전송 되는 장점이 있음. custom해서 사용 가능함으로 swr사용 예정.

3. header에 유저 정보를 가져오고 프로필 이미지 가져오는것 swr 을 이용해서 자체적으로 hook을 만듬. hook 안에서 userinfo의 api를 get한후에 서버에서 오는 이미지를 출력함 . <br>
또한, '프로필 수정' 컴포넌트에서도 userInfo 의 데이터가 필요하기 때문에 , <br/>
SWR의 장점 (`전역 캐시를 이용해 모든 컴포넌트 사이에 데이터를 저장하고 공유하여 불필요한 Api 호출을 막는다`) 을 이용하여 구현 


5. 





6.
🔥성능 변화 기록🔥<br>

AS-IS <br>
 nextJs 마이그레이션 전 main페이지 성능<br> 
<img width="600" height="600" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/b7aa7be6-44a9-48ce-98fd-2735d2d2d7dd"><br>

TO-BE
 nextJs 마이그레이션 후 main페이지 성능<br> 
<img width="600" height="600" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/a54534c5-03b6-431d-b269-0b366776fd2e"><br>

-> 페이지 초기 렌더링 속도가 4.5 초 에서 0.2 초로  nextJs로 마이그레이션후 훨씬더 빠르게 로딩되는 모습을 볼수 있다. <br>
nextJS 의 특징인 SSR의 장점 "서버에서 완전히 렌더링 된 페이지를 클라이언트로 보내며,<br>
클라이언트 측 상호 작용에만 추가 JavaScript 로드가 필요하므로 초기 로딩 속도가 빠르다." 를 이용하여 초기 로딩을 개선 하였다.

하지만 아직 



-------

