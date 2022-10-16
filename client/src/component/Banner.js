import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { bannerImage } from "../dummydata/dummydata";

function Banner() {

  const [count, setCount] = useState(0);
  const [slide, setSlide] = useState({
    width: `${bannerImage.length}00vw`,
    transform: `translate(-000vw)`
  })

  useEffect( () => {
    setSlide({
      ...slide,
      transform: `translate(-${count}00vw)`
    })
  }, [count]);

  const handleSlideBtn = (id) => {

    if (id === "left") {
      if (count === 0) {
        return setCount(2);
      }

      setCount(count - 1);
    }

    if (id === "right") {
      if (count === 2) {
        return setCount(0);
      }

      setCount(count + 1);
    }

  };

  return (
    <section className="banner">
      <div style={slide} className="banner__container">
        {bannerImage.map( (el, index) => {
          return (
            <Link key={index} to="/">
              <img src={require(`../images/${el}`)} alt="BannerImage" />
            </Link>
          )
        })}
      </div>
      <button onClick={() => handleSlideBtn("left")} type="button" className="banner__left-btn">
        <FontAwesomeIcon className="icon__size28" icon={faAngleLeft} />
      </button>
      <button onClick={() => handleSlideBtn("right")} type="button" className="banner__right-btn">
        <FontAwesomeIcon className="icon__size28" icon={faAngleRight} />
      </button>
    </section>
  );
}

export default Banner;