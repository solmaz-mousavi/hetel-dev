import { Link } from "react-router-dom";
import "./headerUserInfo.css";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function HeaderUserInfo({ userInfo, logout }) {
  return (
    <>
      {userInfo ? (
        <div className="userInfo-container">
          <Link to="/aseman-hotel/userPanel/userInfo">
            {userInfo.profile ? (
              <FaUserCircle className="header-profile" />
            ) : (
              <img
                src={userInfo.profile}
                alt="profile"
                className="header-profile"
              />
            )}
          </Link>

          <div className="username-container">
            <Link to="/aseman-hotel/userPanel/userInfo">{userInfo.name}</Link>
            <p className="username-role">
              {userInfo.role === "admin" ? "مدیر سایت" : "کاربر"}
            </p>
          </div>
          <MdLogout
            onClick={() => logout()}
            className="icon icon-btn logout-icon"
          />
        </div>
      ) : (
        <Link to="/aseman-hotel/login" className="btn btn-gold login-btn">
          ورود
        </Link>
      )}


    </>
  );
}

export default HeaderUserInfo;
