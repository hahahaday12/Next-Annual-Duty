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

📌 3. 기존에 상위페이지에서 (연차/당직 버튼, 연차 신청 모달, 당직 신청 모달) 컴포넌트에 props 로 데이터를 전달해 주었고, 각각 모달 컴포넌트 안에서 필요한 코드 로직을 작성 하였음.<br>
하지만, 각각의 모달 컴포넌트 에서 중복 되는 로직을 customhook(useCommonModal)으로 변경 하였고, 상위 컴포넌트에서 props로 받아온 함수 데이터는 , 다시 customhook에 props로 전달.

🧩이전 코드 

📁ApplyModal.tsx
```javascript
export const AnnualModal = ({
  close,
  selectedDate,
  setSelectedDate,
  searchData,
  data,
  username
}) => {
  const SubmitText = {
    ApplyAnnual: '연차 신청',
    SelectDate: '날짜 선택',
    SelectReason: '사유선택'
  }

  const [startDate] = useState(selectedDate || new Date())
  const [endDate, setEndDate] = useState(selectedDate || new Date())
  const [getReason, setReason] = useState('연차')
  const [ViewData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  })

  const handleChange = e => {
    console.log(e.target.value)
    setReason(e.target.value)
  }

  const submitButton = () => {
    selectedDate.setHours(9, 0, 0, 0)
    const isDuplicateDate = data.filter(item => {
      console.log(item)
      const startDay = item.start
      const endDay = item.end
      startDay.setHours(9, 0, 0, 0)
      endDay.setHours(9, 0, 0, 0)
      endDate.setHours(9, 0, 0, 0)

      if (
        endDate >= startDay &&
        endDate <= endDay &&
        item.username === username
      ) {
        return item
      }
    })

    if (isDuplicateDate.length > 0) {
      alert('이미 해당 날짜에 신청한 연차가 존재합니다.')
      return false
    }

    const updatedData = {
      ...ViewData,
      startDate: UTCchangeKST(startDate),
      endDate: UTCchangeKST(endDate),
      reason: getReason
    }

    if (confirm('연차 신청 하시겠습니까?')) {
      sendReg(updatedData)
    }

    return
  }

  const UTCchangeKST = date => {
    let krDate = new Date(date)
    krDate.setHours(krDate.getHours() + 9)
    return krDate.toISOString()
  }

  const sendReg = async (updatedData: any) => {
    try {
      const response = await applyAnnual(updatedData)
      if (response.status === 200) {
        alert('연차가 신청 되었습니다.')
        searchData()
        close()
      } else {
        alert('등록 실패했습니다. 관리자에게 문의하세요.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const renderBox = () =>
    CategoryBox.map(item => {
      return <option key={item.id}>{item.name}</option>
    })

  const isWeekday = date => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  return (
    <>
      <ModalContent>
        <Centerbox>
          <XbuttonBox onClick={close}>x</XbuttonBox>
            코드 생략..
          <PickReason>{SubmitText.SelectReason}</PickReason>
          <SelectContainer>
            <Selectbox onChange={e => handleChange(e)}>{renderBox()}</Selectbox>
          </SelectContainer>
          <Register onClick={submitButton}>등록</Register>
        </Centerbox>
      </ModalContent>
    </>
  )
}

```
📁DuttyModal.tsx
```javascript
export const DuttyModal = ({
  close,
  selectedDate,
  setSelectedDate,
  searchData,
  data,
  username
}) => {
  const SubmitText = {
    ApplyDutty: '당직 신청',
    SelectDate: '날짜 선택'
  }

  const [dutyDate] = useState(selectedDate || new Date())
  const [ViewData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  })

  const submitButton = () => {
    selectedDate.setHours(9, 0, 0, 0)
    const isDuplicateDate = data.filter(item => {
      const itemDay = item.date
      itemDay.setHours(9, 0, 0, 0)
      if (
        selectedDate.getTime() === itemDay.getTime() &&
        item.username === username
      ) {
        return item
      }
    })
    if (isDuplicateDate.length > 0) {
      alert('이미 해당 날짜에 신청한 연차가 존재합니다.')
      return false
    }
    const updatedData = {
      ...ViewData,
      dutyDate: UTCchangeKST(dutyDate)
    }

    if (confirm('당직 신청 하시겠습니까?')) {
      sendReg(updatedData)
    }

    return false
  }

  const UTCchangeKST = date => {
    let krDate = new Date(date)
    krDate.setHours(krDate.getHours() + 9)
    return krDate.toISOString()
  }

  const sendReg = async (updatedData: any) => {
    try {
      const response = await applyDuty(updatedData)
      if (response.status === 200) {
        alert('당직이 신청 되었습니다.')
        searchData()
        close()
      } else {
        alert('신청 실패했습니다. 관리자에게 문의하세요.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const isWeekday = date => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  return (
    <>
      <ModalContent>
        <Centerbox>
          <XbuttonBox onClick={close}>x</XbuttonBox>
          코드 생략..
          <Register onClick={submitButton}>등록</Register>
        </Centerbox>
      </ModalContent>
    </>
  )
}
```
->  위의 AnnualModal, DutyModal 코드를 보면 UTCchangeKST, sendReg, isWeekday 등 공통 코드가 작성되어 있는것을 볼수 있다. <br> 
따라 이 코드를 재사용할수 있는 useCommonModal 이라는 customHook 을 만들었다 . <br> 

🧩수정후 코드 <br>
📁useCommonModal.tsx
```javascript
'use client'

type ApplyALLType<T> = (updatedData: T) => Promise<any>;
type SearchDataType = () => void;
type CloseType = () => void;

export const useCommonModal = <T,>(
  ApplyALL: ApplyALLType<T>,
  searchData: SearchDataType,
  close: CloseType
) => {
  const UTCchangeKST = (date: Date) => {
    let krDate = new Date(date);
    krDate.setHours(krDate.getHours() + 9);
    return krDate.toISOString();
  };

  const sendReg = async (updatedData: T) => {
    try {
      const response = await ApplyALL(updatedData);
      if (response.status === 200) {
        alert('신청 되었습니다.');
        searchData();
        close();
      } else {
        alert('신청 실패했습니다. 관리자에게 문의하세요.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return {
    UTCchangeKST,
    sendReg,
    isWeekday,
  };
};
```
📁AnnualModal.tsx
```javascript
export const AnnualModal = ({
  close,
  selectedDate,
  setSelectedDate,
  searchData,
  data,
  username,
}: ModalProps) => {
  const SubmitText = {
    ApplyAnnual: '연차 신청',
    SelectDate: '날짜 선택',
    SelectReason: '사유선택',
  };

  const { UTCchangeKST, sendReg, isWeekday } = useCommonModal<ViewData>(
    ApplyAnnual,
    searchData,
    close
  );

  const [startDate] = useState(selectedDate || new Date());
  const [endDate, setEndDate] = useState(selectedDate || new Date());
  const [getReason, setReason] = useState('연차');
  const [ViewData] = useState<ViewData>({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const submitButton = () => {
    if (selectedDate === null) {
      console.error('날짜가 선택되지 않았습니다');
      return;
    }
    selectedDate.setHours(9, 0, 0, 0);
    const isDuplicateDate = data.filter((item) => {
      const startDay = item.start;
      const endDay = item.end;
      startDay.setHours(9, 0, 0, 0);
      endDay.setHours(9, 0, 0, 0);
      endDate.setHours(9, 0, 0, 0);

      if (
        endDate >= startDay &&
        endDate <= endDay &&
        item.username === username
      ) {
        return item;
      }
    });

    if (isDuplicateDate.length > 0) {
      alert('이미 해당 날짜에 신청한 연차가 존재합니다.');
      return false;
    }

    const updatedData = {
      ...ViewData,
      startDate: UTCchangeKST(startDate),
      endDate: UTCchangeKST(endDate),
      reason: getReason,
    };

    if (confirm('연차 신청 하시겠습니까?')) {
      sendReg(updatedData);
    }
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value);
  };

  const renderBox = () =>
    CategoryBox.map((item) => {
      return <option key={item.id}>{item.name}</option>;
    });

  return (
    <>
      <CommonModal>
        <div
          className="w-[20px] absolute top-[-10px] right-[10px] z-50 bg-white"
          onClick={close}
        >
          x
        </div>
        
         코드 생략 ..
        <div className="w-[150px] relative mt-[30px] m-auto">
          <select
            className="w-[150px] bg-white p-[10px] border-solid border-2 border-violet-900 rounded-[10px] text-[15px]"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
          >
            {renderBox()}
          </select>
        </div>
        <div
          className="w-[200px] p-[10px] relative top-[30px] ml-[80px] pb-[10px] bg-[#a8a3e29a] border-none rounded-[10px] font-bold cursor-pointer text-[15px]"
          onClick={submitButton}
        >
          <p className="w-[30px] m-auto flex">등록</p>
        </div>
      </CommonModal>
    </>
  );
};
```


📁DuttyModal.tsx
```javascript
export const DuttyModal = ({
  close,
  selectedDate,
  setSelectedDate,
  searchData,
  data,
  username,
}: DuttyModalProps) => {
  const SubmitText = {
    ApplyDutty: '당직 신청',
    SelectDate: '날짜 선택',
  };
  const { UTCchangeKST, sendReg, isWeekday } = useCommonModal<DutyData>(
    ApplyDuty,
    searchData,
    close
  );
  const [dutyDate] = useState(selectedDate || new Date());
  const [ViewData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const submitButton = () => {
    const isDuplicateDate = data.filter((item) => {
      const itemDay = item.date;
      itemDay.setHours(9, 0, 0, 0);
      selectedDate.setHours(9, 0, 0, 0);
      if (
        selectedDate.getTime() === itemDay.getTime() &&
        item.username === username
      ) {
        return item;
      }
    });
    if (isDuplicateDate.length > 0) {
      alert('이미 해당 날짜에 신청한 당직이 존재합니다.');
      return false;
    }
    const updatedData = {
      ...ViewData,
      dutyDate: UTCchangeKST(dutyDate),
    };

    if (confirm('당직 신청 하시겠습니까?')) {
      sendReg(updatedData);
    }
    return false;
  };

  return (
    <>
      <CommonModal>
        <button
          className="w-[24px] h-[25px] absolute top-[-15px] z-50 bg-white border-solid border-2 border-violet-900 text-[15px] right-[-5px]"
          onClick={close}
        >
          <p className="mt-[-3px]">x</p>
        </button>
        코드 생략..
        <div
          className="w-[200px] p-[10px] relative top-[30px] ml-[80px] pb-[10px] bg-[#a8a3e29a] border-none rounded-[10px] font-bold cursor-pointer text-[15px]"
          onClick={submitButton}
        >
          <p className="w-[30px] m-auto flex">등록</p>
        </div>
      </CommonModal>
    </>
  );
};

```
-> 따라, 공통 함수가 들어갈 부분useCommonModal 커스텀 훅을 만들어 공통 함수를 return값으로 내보내었고, 커스텀 훅에 들어 가야할 함수는 
 useCommonModal 에props 로 전달 해주었다. 
 
📌 4. 홈,메인 페이지에서 내가 신청한 당직을 취소 하고 나서 , 캘린더 에도 해당 변경 값이 반영 되야 하지만 반영되지 않고 있었음. <br>
원인: 내가 신청한 연차, 당직 출력 컴포넌트와 달력 컴포넌트가 따로 분리 되었기 때문에, 서로 변경값을 반영하지 못하였음 <br>

🧩이전 컴포넌트 <br>
📁Home.tsx <br>

```javascript
export const Home = () => {
  const [CalDate, setCalDate] = useState<number>(2023)
  const [annualDataList, setAnnualDataList] = useState([])
  const [dutyDataList, setDutyDataList] = useState([])

  const [user, SetUser] = useState({
    remainVacation: ''
  })
  const [selectedOption, setSelectedOption] = useState('엑셀로 다운받기')

  const navigate = useNavigate()

  useEffect(() => {
    searchInfo()
  }, [])

  const searchInfo = () => {
    UserInfoList().then(data => {
      const uerData = data.data.response
      SetUser(uerData)
    })
  }

  const onChangeClick = () => {
    navigate('/application')
  }

  const searchData = () => {
    MyAnnualList(CalDate.toString())
      .then(data => {
        const returnDatalist = data.data.response
        console.log(returnDatalist)
        setAnnualDataList(returnDatalist)
        return MyDutyList(CalDate.toString())
      })
      .then(data => {
        const returnDatalist = data.data.response
        setDutyDataList(returnDatalist)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }

  useEffect(() => {
    searchData()
  }, [CalDate])

  const extractDate = dateString => {
    const date = dateString.split('T')[0]
    return date
  }

  const deleteButton = (type: string, id: string) => {
    if (!window.confirm(`${type}를 취소 하시겠습니까?`)) {
      alert(`취소되었습니다.`)
      return false
    }

    try {
      if (type == '연차') {
        DeleteAnnualList(id).then(data => {
          console.log(data.status)
          if (data.status == 200) {
            alert(`${type}가 취소되었습니다.`)
            searchData()
          } else {
            alert(`취소가 실패했습니다.`)
          }
        })
      } else {
        DeleteDutyList(id).then(data => {
          console.log(data.status)
          if (data.status == 200) {
            alert(`${type}가 취소되었습니다.`)
            searchData()
          } else {
            alert(`취소가 실패했습니다.`)
          }
        })
      }
    } catch (e) {
      console.log(e)
      alert(`${e} 문의주세요.`)
    }
    return
  }

  const datalist = datalist => {
    const filterViewData = datalist.filter(item => {
      if (item.status !== 'CANCELLED') {
        return item
      }
    })
    return filterViewData
  }

  return (
    <HomeContainer>
      <Boards>
        <AnnualBoard>
          <BoxText>
            <span>연차 신청</span>
            <span>남은연차: {user.remainVacation}개 </span>
          </BoxText>
          <AuualListBox>
            {datalist(annualDataList).map((item: Item) => (
              <AuualList key={item.id}>
                <h2>
                  📌 {extractDate(item.startDate)} ~ {extractDate(item.endDate)}
                </h2>
                <StatusBox>{convertStatusToText(item.status)}</StatusBox>
                <CancelBox onClick={() => deleteButton('연차', item.id)}>
                  취소
                </CancelBox>
              </AuualList>
            ))}
          </AuualListBox>
        </AnnualBoard>
        <DutyBoard>
          <BoxText>당직 신청</BoxText>
          <DutyListBox>
            {datalist(dutyDataList).map(el => (
              <DutyList key={el.id}>
                <h2>📌 {extractDate(el.dutyDate)}</h2>
                <StatusBox>{convertStatusToText(el.status)}</StatusBox>
                <CancelBox onClick={() => deleteButton('당직', el.id)}>
                  취소
                </CancelBox>
              </DutyList>
            ))}
          </DutyListBox>
        </DutyBoard>
      </Boards>
      코드 생략..
      <CalendarBoard>
        <AllDataList
          CalendarDate={setCalDate}
          annualData={annualDataList}
          dutyData={dutyDataList}
        />
      </CalendarBoard>
    </HomeContainer>
  )
}
```
-> 이전 컴포넌트에서는 상위 컴포넌트 MainHome 페이지에 내 연차 , 당직 출력 컴포넌트 / 캘린터 컴포넌트를 한곳에 작성하고 <br>
연차, 당직의 [ annualDataList, setAnnualDataList ] state 값을 props 를 사용해 캘린더 컴포넌트에도 전달 하도록 코드를 작성 하였음. <br>
-> 위와 같이 상위 컴포넌트에서 모든 컴포넌트 로직을 작성후 props로 전달해주니 데이터 변경 값이 캘린더에도 잘 반영되었음.<br>
하지만, 많은 컴포넌트를 한곳에 작성하다 보니 가독성이 좋지 않다는것을 느꼈고, 이후 역할별 컴포넌트를 분리 하였음.<br>

🧩수정후 컴포넌트 (컴포넌트 구조만 분리 된 상태) <br>
-> 위의 코드를 보면 삭제후 조회하는 함수 searchData 에서 받아오는 data를 각각 setAnnualDataList, setDutyDataList 에 저장하고 업데이트된 
state 값을 props로 보내고 있다. <br> 하지만, 아래 컴포넌트 코드 에서는 업데이트 된 state 값을 전달하는 코드가 있지 않았다. 

📁app/home/page.tsx
```javascript
export default function HomeMain() {
  return (
    <>
      <meta name="description" content="Put your description here."></meta>
      <div className="relative flex content-center">
        <div className="h-[1280px] relative font-LINESeedKRBd top-[40px] m-auto bg-fuchsia-500">
          <div className="w-full mt-[60px] flex">
            <AllAnnualDuty />
          </div>
          <CenterBarBox />
          <AllCalendarList />
        </div>
      </div>
    </>
  );
}
```
📁components/home/mainHome.tsx
```javascript
export default function AllAnnualDuty() {
  const [annualDataList, setAnnualDataList] = useState([])
  const [dutyDataList, setDutyDataList] = useState([])
  const [CalDate] = useState<number>(2023);

  const searchData = useCallback(() => {
    MyAnnualList(CalDate.toString())
      .then((data) => {
        const returnDatalist = data.response;
        setAnnualDataList(returnDatalist);
        return MyDutyList(CalDate.toString());
      })
      .then((data) => {
        const returnDatalist = data.response;
        setDutyDataList(returnDatalist);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [CalDate]);

  useEffect(() => {
    searchData();
  }, []);

  const extractDate = (dateString: string) => {
    if (dateString) {
      const date = dateString.split('T')[0];
      return date;
    }
    return false;
  };

  const datalist = useCallback((datalist: any[]) => {
    const filterViewData = datalist.filter((item: { status: string }) => {
      return item.status !== 'CANCELLED';
    });
    return filterViewData;
  }, []);

  const deleteButton = useCallback(
    async (type: string, id: string) => {
      if (!window.confirm(`${type}를 취소 하시겠습니까?`)) {
        alert(mainTexts.cancelText);
        return false;
      }

      try {
        let deleteFunction;
        if (type === '연차') {
          deleteFunction = DeleteAnnualList;
        } else {
          deleteFunction = DeleteDutyList;
        }
        const response = await deleteFunction(id);
        if (response.status === 200) {
          alert(`${type}가 취소되었습니다.`);
          searchData();
        } else {
          alert(mainTexts.failCancelText);
        }
      } catch (error) {
        console.error(error);
        alert(mainTexts.areadyApply);
      }
    },[searchData]);

  return (
    <div className="m-auto flex gap-[10px]">
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
  );
}
```
-> 따라, annualDataList, setAnnualDataList  의 값을 전역적으로 사용할수 있도록 store 을 생성해 해당 값을 저장하고, 전역적으로 업데이트 된 값을 사용할수 있도록 작성.  <br>

📁store.tsx
```javascript
export const useUpdateDate = create<StoreState>((set) => ({
  annualDataList: [],
  dutyDataList: [],
  setAnnualDataList: (data) => set({ annualDataList: data }),
  setDutyDataList: (data) => set({ dutyDataList: data }),
}));
```
-> store 에 전역으로 공유될 값을 생성 <br>

🧩store 반영후 코드 <br>
-> searchData 함수가 실행되고 받아오는 data.response 를 store에 생성된 setState 값에 저장.

📁mainHome.tsx
```javascript
export default function AllAnnualDuty() {
  // store 에 생성된 값 사용
  const { annualDataList, dutyDataList, setAnnualDataList, setDutyDataList } =
    useUpdateDate();
  const [CalDate] = useState<number>(2023);

  const searchData = useCallback(() => {
    MyAnnualList(CalDate.toString())
      .then((data) => {
        const returnDatalist = data.response;
        setAnnualDataList(returnDatalist);
        return MyDutyList(CalDate.toString());
      })
      .then((data) => {
        const returnDatalist = data.response;
        setDutyDataList(returnDatalist);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [CalDate]);

  useEffect(() => {
    searchData();
  }, []);

 코드 생략..

  return (
    <div className="m-auto flex gap-[10px]">
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
  );
}
```
📁 allCalendar.tsx <br>
-> useEffect 의 인자 값을 사용해 annualDataList, dutyDataList 가 변경될시   searchCalendar(); 함수를 실행 시켜 
재조회 해오게 끔 코드 작성. 

```javascript
export const AllCalendarList = () => {
  const [CalDate, setCalDate] = useState<number>(2023);
  const [viewDrow, setViewDrow] = useState<CombinedDataItem[]>([]);
  const { annualDataList, dutyDataList } = useUpdateDate();

  useEffect(() => {
    searchCalendar();
  }, [CalDate, annualDataList, dutyDataList]);

  const searchCalendar = () => {
    Promise.all([
      allAnnualList(CalDate.toString()),
      allDutyList(CalDate.toString()),
    ])
      .then(([annualDataList, dutyDataList]) => {
        const annualReturnData = annualDataList.response.map(
          (item: AnnualDrowItem) => ({
            title: getTitleWithStatus(item),
            username: item.username,
            start: new Date(item.startDate).toISOString(),
            end: new Date(item.endDate).toISOString(),
            type: 'ANNUAL',
          })
        );

        const dutyReturnData = dutyDataList.response.map(
          (item: DutyItemType) => ({
            ...item,
            title: getTitleWithStatus(item),
            username: item.username,
            date: new Date(item.dutyDate),
            type: 'DUTY',
          })
        );

        const combinedData = [...annualReturnData, ...dutyReturnData];
        setViewDrow(combinedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
      <div className="w-[1200px] h-[1028px] flex m-auto top-[30px] rounded-[10px] pb-[124px]">
        <div className="w-full h-[980px] pb-[40px] bg-[#ffff] relative rounded-[10px] shadow-[1px_2px_7px_1px_rgba(0,0,0,0.3)] m-auto">
          <CommonCalendar
            viewDrow={viewDrow}
            CalDate={CalDate}
            setCalDate={setCalDate}
          />
        </div>
      </div>
    </>
  );
};
```

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
-> 기존 코드 로직에서 모달 페이지 공통 함수 customHook 생성, swr 을 이용한 유저 정보 가져오기 등 수정후 초기 로딩 속도가 4.5초 -> 0.3 초로 개선 되었다. 

✨ AS-IS <br>
-> nextJs 마이그레이션 전 연차,당직 신청 페이지 성능<br> 
<img width="350" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/37a2c729-f4c2-4408-a4f0-d2bc760a2ea7"><br>

✨ TO-BE <br>
-> nextJs 마이그레이션 후 연차,당직 신청 페이지 성능<br> 
<img width="350" height="400" alt="image" src="https://github.com/hahahaday12/Next-Annual-Duty/assets/101441685/732d3086-5e79-41c1-8a2e-bc44025678c7"><br>



