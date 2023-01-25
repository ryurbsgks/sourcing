import "../../App.css";
import "./product.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Edit ({ props }) {

  const [productInfo, setProductInfo] = useState({
    img: props.img,
    uploadImg: "",
    name: props.name,
    price: props.price,
    salePrice: props.salePrice,
    salePct: props.salePct,
    unit: props.unit,
    unitInfo: props.saleUnit,
    weight: props.weight,
    weightInfo: props.weightUnit,
    origin: props.origin
  });
  const [openUI, setOpenUI] = useState({
    sale: props.salePrice ? true : false,
    unit: props.saleUnit !== "개" && props.saleUnit !== "박스" ? true : false,
    weight: props.weightUnit !== "g" && props.weightUnit !== "kg" && props.weightUnit !== "ml" && props.weightUnit !== "L" ? true : false,
    origin: props.origin !== "국내산" && props.origin !== "수입산" ? true : false
  });
  const [sortbox, setSortbox] = useState({
    unit: false,
    weight: false,
    origin: false,
    category: false
  });
  const [sortboxList, setSortboxList] = useState({
    unit: props.saleUnit !== "개" && props.saleUnit !== "박스" ? "직접입력" : props.saleUnit,
    weight: props.weightUnit !== "g" && props.weightUnit !== "kg" && props.weightUnit !== "ml" && props.weightUnit !== "L" ? "직접입력" : props.weightUnit,
    origin: props.origin !== "국내산" && props.origin !== "수입산" ? "직접입력" : props.origin,
    category: props.category || ""
  });
  const [errMessage, setErrMessage] = useState("");

  const editorRef = useRef();

  useEffect( () => {

    if (productInfo.price && productInfo.salePrice) {
      if (Number(productInfo.price) > Number(productInfo.salePrice)) {
        console.log("-----test--------")
        return setProductInfo({
          ...productInfo,
          salePct: Math.floor((Number(productInfo.price) - Number(productInfo.salePrice)) / Number(productInfo.price) * 100)
        });
      }
    }

    setProductInfo({
      ...productInfo,
      salePct: ""
    });

  }, [productInfo.price, productInfo.salePrice]);

  const handleInputValue = (e) => {

    const { name, value } = e.target;

    setProductInfo({
      ...productInfo,
      [name]: value
    });

  };

  const handleApplySale = (e) => {

    if (!e.target.checked) {
      setProductInfo({
        ...productInfo,
        salePrice: ""
      });
    }

    setOpenUI({
      ...openUI,
      sale: e.target.checked
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
        origin: false,
        category: false
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
        origin: false,
        category: false
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
        origin: true,
        category: false
      });
    }

    if (id === "category") {
      if (sortbox.category) {
        return setSortbox({
          ...sortbox,
          category: false
        });
      }

      return setSortbox({
        unit: false,
        weight: false,
        origin: false,
        category: true
      });
    }

  }

  const handleClickSortboxList = (id, e) => {

    if (id === "unit") {
      if (e.target.value === 0) {
        setSortboxList({
          ...sortboxList,
          unit: "직접입력"
        });
        setSortbox({
          ...sortbox,
          unit: false
        });

        if (sortboxList.unit !== "직접입력") {
          setProductInfo({
            ...productInfo,
            unitInfo: ""
          });
        }

        return setOpenUI({
          ...openUI,
          unit: true
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          unit: "개"
        });
        setSortbox({
          ...sortbox,
          unit: false
        });
        setProductInfo({
          ...productInfo,
          unitInfo: "개"
        });
        return setOpenUI({
          ...openUI,
          unit: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          unit: "박스"
        });
        setSortbox({
          ...sortbox,
          unit: false
        });
        setProductInfo({
          ...productInfo,
          unitInfo: "박스"
        });
        return setOpenUI({
          ...openUI,
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
        setSortbox({
          ...sortbox,
          weight: false
        });

        if (sortboxList.weight !== "직접입력") {
          setProductInfo({
            ...productInfo,
            weightInfo: ""
          });
        }

        return setOpenUI({
          ...openUI,
          weight: true
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          weight: "g"
        });
        setSortbox({
          ...sortbox,
          weight: false
        });
        setProductInfo({
          ...productInfo,
          weightInfo: "g"
        });
        return setOpenUI({
          ...openUI,
          weight: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          weight: "kg"
        });
        setSortbox({
          ...sortbox,
          weight: false
        });
        setProductInfo({
          ...productInfo,
          weightInfo: "kg"
        });
        return setOpenUI({
          ...openUI,
          weight: false
        });
      }

      if (e.target.value === 3) {
        setSortboxList({
          ...sortboxList,
          weight: "ml"
        });
        setSortbox({
          ...sortbox,
          weight: false
        });
        setProductInfo({
          ...productInfo,
          weightInfo: "ml"
        });
        return setOpenUI({
          ...openUI,
          weight: false
        });
      }

      if (e.target.value === 4) {
        setSortboxList({
          ...sortboxList,
          weight: "L"
        });
        setSortbox({
          ...sortbox,
          weight: false
        });
        setProductInfo({
          ...productInfo,
          weightInfo: "L"
        });
        return setOpenUI({
          ...openUI,
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
        setSortbox({
          ...sortbox,
          origin: false
        });

        if (sortboxList.origin !== "직접입력") {
          setProductInfo({
            ...productInfo,
            origin: ""
          });
        }

        return setOpenUI({
          ...openUI,
          origin: true
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          origin: "국내산"
        });
        setSortbox({
          ...sortbox,
          origin: false
        });
        setProductInfo({
          ...productInfo,
          origin: "국내산"
        });
        return setOpenUI({
          ...openUI,
          origin: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          origin: "수입산"
        });
        setSortbox({
          ...sortbox,
          origin: false
        });
        setProductInfo({
          ...productInfo,
          origin: "수입산"
        });
        return setOpenUI({
          ...openUI,
          origin: false
        });
      }

    }
    
    if (id === "category") {
      if (e.target.value === 0) {
        setSortboxList({
          ...sortboxList,
          category: "야채"
        });
        return setSortbox({
          ...sortbox,
          category: false
        });
      }

      if (e.target.value === 1) {
        setSortboxList({
          ...sortboxList,
          category: "과일"
        });
        return setSortbox({
          ...sortbox,
          category: false
        });
      }

      if (e.target.value === 2) {
        setSortboxList({
          ...sortboxList,
          category: "수산물"
        });
        return setSortbox({
          ...sortbox,
          category: false
        });
      }

    }
  
  }

  const handleChangeFile = (e) => {

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setProductInfo({
        ...productInfo,
        img: reader.result,
        uploadImg: e.target.files[0]
      });
    };

  };

  const onUploadImage = async (blob, cb) => {

    const formData = new FormData();

    formData.append("img", blob);

    axios.post(`${process.env.REACT_APP_URL}/product/editor`, formData, {
      header: {
        'content-type': 'multipart/form-data'
      }
    }).then( (res) => {
      if (res.data.message === "업로드 성공") {
        cb(`${process.env.REACT_APP_URL}/${res.data.data}`, res.data.data);
      }
    });

  };

  return (
    <main>
      <section className="container">
        <div className="new__product-info">
          <div className="new__product-info__img">
            <img src={`${process.env.REACT_APP_URL}/${productInfo.img}`} alt="ProductImage" />
            <div className="new__product-info__img__img-select">
              <label htmlFor="productImg">상품 사진 선택하기</label>
              <input id="productImg" type="file" accept="image/*" onChange={handleChangeFile} />
            </div>
          </div> 
          <div className="new__product-info__content">
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>상품명</span>
              </div>
              <div className="new__product-info__content__container__space-02">
                <input name="name" onChange={handleInputValue} defaultValue={productInfo.name} />
              </div>
            </div>
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>판매 가격</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input name="price" onChange={handleInputValue} defaultValue={productInfo.price} />
              </div>
              <div className="new__product-info__content__container__space-03">
                <span>원</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <label>
                  <input type="checkbox" onChange={handleApplySale} checked={openUI.sale} />
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
                  <input name="salePrice" onChange={handleInputValue} defaultValue={productInfo.salePrice} placeholder="판매 가격" />
                </div>
                <div className="new__product-info__content__container__space-03">
                  <span>원</span>
                </div>
                <div className="new__product-info__content__container__space-05">
                  <p>할인율 : <span>{productInfo.salePct}</span>%</p>
                </div>
              </div>
            : null}
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>판매 단위</span>
              </div>
              <div className="new__product-info__content__container__space-01">
                <input name="unit" onChange={handleInputValue} defaultValue={productInfo.unit} placeholder="단위" />
              </div>
              {openUI.unit 
              ? <div className="new__product-info__content__container__space-04">
                  <input name="unitInfo" onChange={handleInputValue} defaultValue={productInfo.unitInfo} placeholder="직접입력" />
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
                <input name="weight" onChange={handleInputValue} defaultValue={productInfo.weight} placeholder="중량/용량" />
              </div>
              {openUI.weight 
              ? <div className="new__product-info__content__container__space-04">
                  <input name="weightInfo" onChange={handleInputValue} defaultValue={productInfo.weightInfo} placeholder="직접입력" />
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
                      <li value={3}>ml</li>
                      <li value={4}>L</li>
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
                  <input name="origin" onChange={handleInputValue} defaultValue={productInfo.origin} placeholder="직접입력" />
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
            <div className="new__product-info__content__container">
              <div className="new__product-info__content__container__space-01">
                <span>카테고리</span>
              </div>
              <div className="new__product-info__content__container__menu">
                <div className="new__product-info__content__container__menu__sortbox" onClick={() => handleClickSortbox("category")}>
                  <span>{sortboxList.category}</span>
                  <div className="new__product-info__content__container__menu__sortbox__icon">
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>
                {sortbox.category 
                ? <div className="new__product-info__content__container__menu__sortbox-list">
                    <ul onClick={(e) => handleClickSortboxList("category", e)}>
                      <li value={0}>야채</li>
                      <li value={1}>과일</li>
                      <li value={2}>수산물</li>
                    </ul>
                  </div>
                : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="new_product-info__editor">상품 정보</div>
        <Editor
          height="800px"
          previewStyle="vertical"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          hideModeSwitch={true}
          ref={editorRef}
          hooks={{
            addImageBlobHook: onUploadImage
          }}
          initialValue={props.content}
        />
        {errMessage ? <div className="new_product-info__err-msg">{errMessage}</div> : null}
        <div className="new_product-info__editor-btn">
          <button>등록하기</button>
        </div>
      </section>
    </main>
  ); 
}

export default Edit;