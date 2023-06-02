import "../../App.css";
import "./price.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Graph () {

  const [content, setContent] = useState({
    category: "야채",
    item: "감자",
    graph: "감자"
  });
  const [status, setStatus] = useState({
    category: false,
    item: false
  });
  const [data, setData] = useState();

  const startDay = prevDay(prevDayNumber());
  const endDay = getDateStr(new Date());
  const vegetable = ["감자", "고구마", "배추", "양배추", "시금치", "상추", "오이", "무", "당근", "풋고추", "양파", "파", "생강", "가지", "미나리", "깻잎", "부추", "피망", "파프리카", "깐마늘(국산)", "깐마늘(수입)", "느타리버섯", "팽이버섯", "새송이버섯"];
  const fruit = ["바나나", "수박", "참외", "토마토", "딸기", "멜론", "사과", "배", "복숭아", "포도", "감귤", "파인애플", "오렌지", "방울토마토", "자몽", "레몬", "체리", "망고"];
  const seafood = ["고등어", "꽁치", "갈치", "명태", "물오징어", "북어", "건오징어", "굴", "전복", "새우"];
  const itemCode = {
    "감자": "152",
    "고구마": "151",
    "배추": "211",
    "양배추": "212",
    "시금치": "213",
    "상추": "214",
    "오이": "223",
    "무": "231",
    "당근": "232",
    "풋고추": "242",
    "양파": "245",
    "파": "246",
    "생강": "247",
    "가지": "251",
    "미나리": "252",
    "깻잎": "253",
    "부추": "254",
    "피망": "255",
    "파프리카": "256",
    "깐마늘(국산)": "258",
    "깐마늘(수입)": "259",
    "느타리버섯": "315",
    "팽이버섯": "316",
    "새송이버섯": "317",
    "바나나": "418",
    "수박": "221",
    "참외": "222",
    "토마토": "225",
    "딸기": "226",
    "멜론": "257",
    "사과": "411",
    "배": "412",
    "복숭아": "413",
    "포도": "414",
    "감귤": "415",
    "파인애플": "420",
    "오렌지": "421",
    "방울토마토": "422",
    "자몽": "423",
    "레몬": "424",
    "체리": "425",
    "망고": "428",
    "고등어": "611",
    "꽁치": "612",
    "갈치": "613",
    "명태": "615",
    "물오징어": "619",
    "북어": "639",
    "건오징어": "640",
    "굴": "644",
    "전복": "653",
    "새우": "654"
  };
  const URL = "/service/price/xml.do";

  useEffect( () => {

    axios.get(URL, {
      params: {
        action: "periodProductList",
        p_cert_key: process.env.REACT_APP_API_KEY,
        p_cert_id: process.env.REACT_APP_API_ID,
        p_returntype: "json",
        p_productclscode: "02",
        p_countrycode: "1101",
        p_convert_kg_yn: "Y",
        p_itemcode: itemCode[content.graph],
        p_startday: startDay,
        p_endday: endDay
      }
    }).then( (res) => {

      if (res.data.data.item === undefined) {
        return setData(null);
      }

      if (res.data.data.item !== undefined) {

        let arr = res.data.data.item.slice((res.data.data.item.length / 3) * 2, res.data.data.item.length);
        let newArr = [
          {
            name: "월요일",
            가격 : "0"
          },
          {
            name: "화요일",
            가격 : "0"
          },
          {
            name: "수요일",
            가격 : "0"
          },
          {
            name: "목요일",
            가격 : "0"
          },
          {
            name: "금요일",
            가격 : "0"
          }
        ];
        let today = new Date();
        let year = today.getFullYear();

        arr.map( (el) => {
          newArr.map( (element) => {
            if (element.name === getDayOfWeek(`${year}-${el.regday.replace("/", "-")}`)) {
              element.가격 = Number(el.price.replaceAll(",", ""));
            }
          });
        });

        setData(newArr);
      }
      
    });

  }, [content.graph]);

  const handleClickStatus = (id) => {

    if (id === "category") {
      if (status.category) {
        return setStatus({
          ...status,
          category: false
        });
      }
      
      if (!status.category) {
        return setStatus({
          ...status,
          category: true
        });
      }
    }

    if (id === "item") {
      if (status.item) {
        return setStatus({
          ...status,
          item: false
        });
      }

      if (!status.item) {
        return setStatus({
          ...status,
          item: true
        });
      }
    }

  };

  const handleClickContent = (e, id) => {
    e.stopPropagation();

    if (id === "category") {
      if (e.target.value === 0) {
        setContent({
          ...content,
          category: "야채",
          item: "감자"
        });
        return setStatus({
          ...status,
          category: false,
          item: false
        });
      }

      if (e.target.value === 1) {
        setContent({
          ...content,
          category: "과일",
          item: "바나나"
        });
        return setStatus({
          ...status,
          category: false,
          item: false
        });
      }

      if (e.target.value === 2) {
        setContent({
          ...content,
          category: "수산물",
          item: "고등어"
        });
        return setStatus({
          ...status,
          category: false,
          item: false
        });
      }
    }

    if (id === "vegetable") {
      setContent({
        ...content,
        item: vegetable[e.target.value]
      });
      return setStatus({
        ...status,
        item: false
      });
    }

    if (id === "fruit") {
      setContent({
        ...content,
        item: fruit[e.target.value]
      });
      return setStatus({
        ...status,
        item: false
      });
    }

    if (id === "seafood") {
      setContent({
        ...content,
        item: seafood[e.target.value]
      });
      return setStatus({
        ...status,
        item: false
      });
    }

  };

  const handleLookupBtn = () => {
    setContent({
      ...content,
      graph: content.item
    });
    setStatus({
      ...status,
      category: false,
      item: false
    });
  };

  return (
    <>
      <div className="graph__searchbox">
        <div className="graph__searchbox__category" onClick={() => handleClickStatus("category")}>
          <span>{content.category}</span>
          <div>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {status.category 
          ? <div className="graph__searchbox__category-list">
              <ul onClick={(e) => handleClickContent(e, "category")}>
                <li value={0}>야채</li>
                <li value={1}>과일</li>
                <li value={2}>수산물</li>
              </ul>
            </div>
          : null}
        </div>
        <div className="graph__searchbox__item" onClick={() => handleClickStatus("item")}>
          <span>{content.item}</span>
          <div>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {status.item 
          ? <div className="graph__searchbox__item-list">
              {content.category === "야채" 
              ? <ul onClick={(e) => handleClickContent(e, "vegetable")}>
                  {vegetable.map( (el, index) => <li key={index} value={index}>{el}</li>)}
                </ul>
              : content.category === "과일" 
              ? <ul onClick={(e) => handleClickContent(e, "fruit")}>
                  {fruit.map( (el, index) => <li key={index} value={index}>{el}</li>)}
                </ul>
              : <ul onClick={(e) => handleClickContent(e, "seafood")}>
                  {seafood.map( (el, index) => <li key={index} value={index}>{el}</li>)}
                </ul>}
            </div>
          : null}
        </div>
        <button type="button" onClick={handleLookupBtn}>조회하기<FontAwesomeIcon className="icon__size14" icon={faMagnifyingGlass} /></button>
      </div>
      <header>
        <h2 className="graph__header">{content.graph}(kg)</h2>
      </header>
      <section className="graph__graph">
        {data 
        ? <LineChart
            width={900}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="가격" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        : <div className="graph__graph__data-none">
            <span>검색조건에 해당하는 데이터가 없습니다</span>
          </div>}
      </section>
    </>
  );
};

function getDateStr(today) {

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let date = ("0" + today.getDate()).slice(-2);
  
  return `${year}-${month}-${date}`;
}

function prevDay(day) {

  let today = new Date();
  let date = today.getDate();

  today.setDate(date - day);

  return getDateStr(today);
}

function prevDayNumber() {

  let today = new Date();
  let day = today.getDay();
  let number = 0;

  if (day === 2) {
    number = 1;
  } else if (day === 3) {
    number = 2;
  } else if (day === 4) {
    number = 3;
  } else if (day === 5) {
    number = 4;
  } else if (day === 6) {
    number = 5;
  } else if (day === 0) {
    number = 6;
  } else {
    number = 0;
  }

  return number;
}

function getDayOfWeek(day) {

  let week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  let dayOfWeek = week[new Date(day).getDay()];

  return dayOfWeek;
}

export default Graph;