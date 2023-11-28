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

4. 





6.



-------

