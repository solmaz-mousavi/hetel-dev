import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import "./userPanelSidebar.css";
import { NavLink, Link } from "react-router-dom";

export default function UserPanelSidebar( {setSelectedUser, userInfo} ) {
	const navigate = useNavigate();
    const ContextDatas = useContext(ContextData);
    const { logout } = ContextDatas;
  
    const changePasswordHandler = async () => {
        await setSelectedUser(userInfo);
        navigate("/aseman-hotel/userPanel/changePassword");
      };

      const reservationsHandler = async () => {
        await setSelectedUser(userInfo);
        navigate("/aseman-hotel/userPanel/reservation");
      }

  return (
    <div className="user-panel__navbar-container">
      <ul>
        <li className="user-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/userPanel/userInfo"
            className={(link) => (link.isActive ? "active" : "")}
          >
            اطلاعات کاربر
          </NavLink>
        </li>

        <li className="user-panel__navbar-item">
          <NavLink
            onClick={reservationsHandler}
						to='/aseman-hotel/userPanel/reservation'
            className={(link) => (link.isActive ? "active" : "")}
          >
            سفارشات
          </NavLink>
        </li>

        <li className="user-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/userPanel/cart"
            className={(link) => (link.isActive ? "active" : "")}
          >
            سبد خرید
          </NavLink>
        </li>

        <li className="user-panel__navbar-item">
          <NavLink
					to="/aseman-hotel/userPanel/changePassword"
            onClick={changePasswordHandler}
          >
            تغییر رمز عبور
          </NavLink>
        </li>

        <li className="user-panel__navbar-item">
          <Link
            onClick={() => logout()}
          >
            خروج
          </Link>
        </li>

      </ul>
    </div>
  );
}
