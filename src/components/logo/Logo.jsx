import { Link } from "react-router-dom";
import "./logo.css";

function Logo() {
  return (
      <Link to="/aseman-hotel">
    <div className="logo-wrapper">
        <img
          className="logo"
          src="/aseman-hotel/images/logo.png"
          alt="aseman hotel"
        />
        <p className="hotelName">هتل آســـــــمان</p>
    </div>
      </Link>
  );
}

export default Logo;
