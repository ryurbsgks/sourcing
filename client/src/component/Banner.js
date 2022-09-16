import "../App.css";
import { Link } from "react-router-dom";
import banner1 from "../images/MainBanner1.jpg";
import banner2 from "../images/MainBanner2.png";
import banner3 from "../images/MainBanner3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function Banner() {
  return (
    <section className="banner">
      <div className="banner__container">
        <div className="banner__container__inner">
          <Link to="/">
            <img src={banner1} alt="BannerImage" />
          </Link>
        </div>
        <div className="banner__container__inner">
          <Link to="/">
            <img src={banner2} alt="BannerImage" />
          </Link>
        </div>
        <div className="banner__container__inner">
          <Link to="/">
            <img src={banner3} alt="BannerImage" />
          </Link>
        </div>
      </div>
      <button className="banner__leftbtn">
        <FontAwesomeIcon className="icon__size28" icon={faAngleLeft} />
      </button>
      <button className="banner__rightbtn">
        <FontAwesomeIcon className="icon__size28" icon={faAngleRight} />
      </button>
    </section>
  );
}

export default Banner;