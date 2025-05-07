import React, { useContext, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { StaticDataContext } from "../../../contexts/StaticDataContext";
import { MdOutlineMenu } from "react-icons/md";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);

  return (
    <nav className="navbar-wrapper" >
      <div className="container navbar-container">
        <MdOutlineMenu
          className="menu-icon"
          onClick={() => setShowNavbar((prev) => !prev)}
        />
        {staticData?.navbar &&
          staticData.navbar.map((item) => (
            <NavLink
              to={`/aseman-hotel/${item.route}`}
              className={(link) =>
                link.isActive ? "navbar-item active" : "navbar-item"
              }
              onClick={() => setShowNavbar(false)}
            >
              {item.title}
            </NavLink>
          ))}

        {userInfo?.role === "admin" && (
          <NavLink
            to="/aseman-hotel/adminPanel/rooms"
            className={(link) =>
              link.isActive ? "navbar-item active" : "navbar-item"
            }
            onClick={() => setShowNavbar(false)}
          >
            پنل مدیریتی
          </NavLink>
        )}
      </div>
    </nav>
  );
}
