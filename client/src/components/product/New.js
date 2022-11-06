import "../../App.css";
import "./product.css";
import { useState, useEffect } from "react";
import defaultImage from "../../images/defaultImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function New() {

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    sale: "",
    salePercent: "",
    unit: "",
    unitInfo: "",
    weight: "",
    weightInfo: "",
    origin: ""
  });
  const [openUI, setOpenUI] = useState({
    sale: false,
    unit: true,
    weight: true,
    origin: true
  });
  const [sortbox, setSortbox] = useState({
    unit: false,
    weight: false,
    origin: false
  });
  const [sortboxList, setSortboxList] = useState({
    unit: "직접입력",
    weight: "직접입력",
    origin: "직접입력"
  });

  useEffect( () => {

    if (productInfo.price && productInfo.sale) {
      if (Number(productInfo.price) > Number(productInfo.sale)) {
        return setProductInfo({
          ...productInfo,
          salePercent: Math.floor((Number(productInfo.price) - Number(productInfo.sale)) / Number(productInfo.price) * 100)
        });
      }
    }

    setProductInfo({
      ...productInfo,
      salePercent: ""
    })

  }, [productInfo.price, productInfo.sale]);

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setProductInfo({
      ...productInfo,
      [name]: value
    });

  };

  const handleClickSortbox = (id) => {

    if (id === "unit") {
      if (sortbox.unit) {
        return setSortbox({
          ...sortbox,
          unit: false
        });
      }

      return setSortbox({
        unit: true,
        weight: false,
        origin: false
      });
    }

    if (id === "weight") {
      if (sortbox.weight) {
        return setSortbox({
          ...sortbox,
          weight: false
        });
      }

      return setSortbox({
        unit: false,
        weight: true,
        origin: false
      });
    }

    if (id === "origin") {
      if (sortbox.origin) {
        return setSortbox({
          ...sortbox,
          origin: false
        });
      }

      return setSortbox({
        unit: false,
        weight: false,
        origin: true
      });
    }

  };

  const handleClickSortboxList = (id, e) => {
    
    if (id === "unit") {
      if (e.target.value === 0) {
        setSortboxList({
          ...sortboxList,
          unit: "직접입력"
        });
        setOpenUI({
          ...openUI,
          unit: true
        });
        return setSortbox({
          ...sortbox,
          unit: false
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          unit: "개"
        });
        setOpenUI({
          ...openUI,
          unit: false
        });
        return setSortbox({
          ...sortbox,
          unit: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          unit: "박스"
        });
        setOpenUI({
          ...openUI,
          unit: false
        });
        return setSortbox({
          ...sortbox,
          unit: false
        });
      }

    }

    if (id === "weight") {
      if (e.target.value === 0) {
        setSortboxList({
          ...sortboxList,
          weight: "직접입력"
        });
        setOpenUI({
          ...openUI,
          weight: true
        });
        return setSortbox({
          ...sortbox,
          weight: false
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          weight: "g"
        });
        setOpenUI({
          ...openUI,
          weight: false
        });
        return setSortbox({
          ...sortbox,
          weight: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          weight: "kg"
        });
        setOpenUI({
          ...openUI,
          weight: false
        });
        return setSortbox({
          ...sortbox,
          weight: false
        });
      }

    }

    if (id === "origin") {
      if (e.target.value === 0) {
        setSortboxList({
          ...sortboxList,
          origin: "직접입력"
        });
        setOpenUI({
          ...openUI,
          origin: true
        });
        return setSortbox({
          ...sortbox,
          origin: false
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          origin: "국내산"
        });
        setOpenUI({
          ...openUI,
          origin: false
        });
        return setSortbox({
          ...sortbox,
          origin: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          origin: "수입산"
        });
        setOpenUI({
          ...openUI,
          origin: false
        });
        return setSortbox({
          ...sortbox,
          origin: false
        });
      }

    }

  };

  const handleApplySale = (e) => {

    if (!e.target.checked) {
      setProductInfo({
        ...productInfo,
        sale: ""
      });
    }

    setOpenUI({
      ...openUI,
      sale: e.target.checked
    });

  };
  
  return (
    <main>
      <section className="container">
        <div className="new__product-info">
          <div className="new__product-info__img">
            <img src={defaultImage} alt="ProductImage" />
            <div className="new__product-info__img__img-select">
              <label htmlFor="productImg">상품 사진 선택하기</label>
              <input id="productImg" type="file" accept="image/*" />
            </div>
          </div> 
          <div className="new__product-info__content">
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>상품명</span>
              </div>
              <div className="new__product-info__content__container__space-02">
                <input name="name" onChange={handleInputValue} placeholder="상품명을 입력해주세요" />
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>판매 가격</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input name="price" onChange={handleInputValue} placeholder="판매 가격" />
              </div>
              <div className="new__product-info__content__container__space-03">
                <span>원</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <label>
                  <input type="checkbox" onChange={handleApplySale} />
                  <span>할인</span> 적용
                </label>
              </div>
            </div>
            {openUI.sale 
            ? <div className="new__product-info__content__container">
                <div className="new__product-info__content__container__space-01">
                  <span>할인 적용가</span>
                </div>
                <div className="new__product-info__content__container__space-01">
                  <input name="sale" onChange={handleInputValue} placeholder="판매 가격" />
                </div>
                <div className="new__product-info__content__container__space-03">
                  <span>원</span>
                </div>
                <div className="new__product-info__content__container__space-05">
                  <p>할인율 : <span>{productInfo.salePercent}</span>%</p>
                </div>
              </div>
            : null}
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>판매 단위</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input name="unit" onChange={handleInputValue} placeholder="단위" />
              </div>
              {openUI.unit 
              ? <div className="new__product-info__content__container__space-04">
                  <input name="unitInfo" onChange={handleInputValue} placeholder="직접입력" />
                </div>
              : null}
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox" onClick={() => handleClickSortbox("unit")}>
                  <span>{sortboxList.unit}</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                {sortbox.unit 
                ? <div className="new__product-info__content__container__menu__sortbox-list">
                    <ul onClick={(e) => handleClickSortboxList("unit", e)}>
                      <li value={0}>직접입력</li>
                      <li value={1}>개</li>
                      <li value={2}>박스</li>
                    </ul>
                  </div>
                : null}
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>중량/용량</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input name="weight" onChange={handleInputValue} placeholder="중량/용량" />
              </div>
              {openUI.weight 
              ? <div className="new__product-info__content__container__space-04">
                  <input name="weightInfo" onChange={handleInputValue} placeholder="직접입력" />
                </div>
              : null}
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox" onClick={() => handleClickSortbox("weight")}>
                  <span>{sortboxList.weight}</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                {sortbox.weight 
                ? <div className="new__product-info__content__container__menu__sortbox-list">
                    <ul onClick={(e) => handleClickSortboxList("weight", e)}>
                      <li value={0}>직접입력</li>
                      <li value={1}>g</li>
                      <li value={2}>kg</li>
                    </ul>
                  </div>
                : null}
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>원산지</span>
              </div>
              {openUI.origin 
              ? <div className="new__product-info__content__container__space-01">
                  <input name="origin" onChange={handleInputValue} placeholder="직접입력" />
                </div>
              : <div className="new__product-info__content__container__space-06"></div>}
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox" onClick={() => handleClickSortbox("origin")}>
                  <span>{sortboxList.origin}</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                {sortbox.origin 
                ? <div className="new__product-info__content__container__menu__sortbox-list">
                    <ul onClick={(e) => handleClickSortboxList("origin", e)}>
                      <li value={0}>직접입력</li>
                      <li value={1}>국내산</li>
                      <li value={2}>수입산</li>
                    </ul>
                  </div>
                : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default New;