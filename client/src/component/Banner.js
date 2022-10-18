import "../App.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { bannerImage } from "../dummydata/dummydata";

function Banner() {

  const [count, setCount] = useState(1);
  const [delay, setDelay] = useState(5000);
  const slideRef = useRef("transform 0.5s");

  const bannerArr = [bannerImage[bannerImage.length - 1], ...bannerImage, bannerImage[0]];
  const banner__container = {
    width: `${bannerArr.length}00vw`,
    transform: `translate(-${count}00vw)`,
    transition: `${slideRef.current}`
  };

  useEffect( () => {

    if (count === bannerArr.length - 1) {
      return setDelay(500);
    }

    setDelay(5000);

  }, [count]);

  const useInterval = (callback, delay) => {
    
    const saveCallback = useRef();

    useEffect( () => {
      saveCallback.current = callback;
    }, [callback]);

    useEffect( () => {

      const tick = () => {
        saveCallback.current();
      };

      if (delay !== null) {

        const id = setInterval(tick, delay);

        return () => clearInterval(id);
      }

    }, [delay]);

  };

  useInterval( () => {
    setCount(count + 1);
  }, delay);

  if (count === bannerArr.length) {
    if (slideRef.current) {
      slideRef.current = "";
    }

    setCount(1);

    setTimeout( () => {
      if (!slideRef.current) {
        slideRef.current = "transform 0.5s";
      }
    }, 0);
  }

  const handleSlideBtn = (id) => {

    if (id === "right") {
      setCount(count + 1);  
    }

    if (id === "left") {
      setCount(count - 1);
    }

  };

  return (
    <section className="banner">
      <div style={banner__container} className="banner__container">
        {bannerArr.map( (el, index) => {
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