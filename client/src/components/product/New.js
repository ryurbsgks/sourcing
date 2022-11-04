import "../../App.css";
import "./product.css";
import defaultImage from "../../images/defaultImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function New() {
  return (
    <main>
      <section className="container">
        <div className="new__product-info">
          <div className="new__product-info__img">
            <img src={defaultImage} alt="ProductImage" />
            <div className="new__product-info__img__img-select">
              <label for="productImg">상품 사진 선택하기</label>
              <input id="productImg" type="file" accept="image/*" />
            </div>
          </div> 
          <div className="new__product-info__content">
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>상품명</span>
              </div>
              <div className="new__product-info__content__container__space-02">
                <input placeholder="상품명을 입력해주세요" />
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>판매 가격</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input placeholder="판매 가격" />
              </div>
              <div className="new__product-info__content__container__space-03">
                <span>원</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <label>
                  <input type="checkbox" />
                  <span>할인</span> 적용
                </label>
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>할인 적용가</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input placeholder="판매 가격" />
              </div>
              <div className="new__product-info__content__container__space-03">
                <span>원</span>
              </div>
              <div className="new__product-info__content__container__space-05">
                <p>할인율 : <span>25</span>%</p>
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>판매 단위</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input placeholder="단위" />
              </div>
              <div className="new__product-info__content__container__space-04">
                <input placeholder="직접입력" />
              </div>
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox">
                  <span>직접입력</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                <div className="new__product-info__content__container__menu__sortbox-list">
                  <ul>
                    <li>직접입력</li>
                    <li>개</li>
                    <li>박스</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>중량/용량</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input placeholder="중량/용량" />
              </div>
              <div className="new__product-info__content__container__space-04">
                <input placeholder="직접입력" />
              </div>
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox">
                  <span>직접입력</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                <div className="new__product-info__content__container__menu__sortbox-list">
                  <ul>
                    <li>직접입력</li>
                    <li>g</li>
                    <li>kg</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>원산지</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input placeholder="직접입력" />
              </div>
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox">
                  <span>직접입력</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                <div className="new__product-info__content__container__menu__sortbox-list">
                  <ul>
                    <li>직접입력</li>
                    <li>국내산</li>
                    <li>수입산</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default New;