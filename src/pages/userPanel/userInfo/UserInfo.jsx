import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./userInfo.css";

export default function UserInfo({ setSelectedUser }) {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const { profile, name, role, email, phone } = localStorageData;
  const navigate = useNavigate();

  const editHandler = async (userInfo) => {
    await setSelectedUser(userInfo);
    navigate("/aseman-hotel/userPanel/editUserInfo");
  };

  return (
    <div className="userPanel-userInfo-wrapper">
      {localStorageData && (
        <div className="userPanel-userInfo-container">
          {profile === "" ? (
            <FaUserCircle className="userPanel-header-profile" />
          ) : (
            <img
              src={profile}
              alt="profile"
              className="userPanel-header-profile"
            />
          )}
          <div className="userPanel-username-container">
            <p>{name}</p>
            <p className="userPanel-username-role">
              {role === "admin" ? "مدیر سایت" : "کاربر"}
            </p>
          </div>
        </div>
      )}

      <div className="userPanel-user-details-container">
        <div>
          <span>آدرس ایمیل: </span>
          <span>{email}</span>
        </div>
        <div>
          <span>شماره تماس: </span>
          <span>{phone}</span>
        </div>
      </div>

      <button type="button" className="btn btn-gold" onClick={editHandler}>
        ویرایش اطلاعات کاربری
      </button>
    </div>
  );
}
