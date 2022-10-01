import "../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import banner1 from "../images/MainBanner1.jpg";
import banner2 from "../images/MainBanner2.png";
import banner3 from "../images/MainBanner3.png";

function Banner() {
  return (
    <section className="banner">
      <div className="banner__container">
        <Link to="/">
          <img src={banner1} alt="BannerImage" />
        </Link>
        <Link to="/">
          <img src={banner2} alt="BannerImage" />
        </Link>
        <Link to="/">
          <img src={banner3} alt="BannerImage" />
        </Link>
      </div>
      <button type="button" className="banner__left-btn">
        <FontAwesomeIcon className="icon__size28" icon={faAngleLeft} />
      </button>
      <button type="button" className="banner__right-btn">
        <FontAwesomeIcon className="icon__size28" icon={faAngleRight} />
      </button>
    </section>
  );
}

export default Banner;