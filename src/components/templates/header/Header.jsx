import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Logo from "../../logo/Logo";
import Social from "../social/Social";
import HeaderUserInfo from "../../headerUserInfo/HeaderUserInfo";
import "./header.css";
import CartInfo from "../../cartInfo/CartInfo";
import { useGetUsersQuery } from "../../../app/services/userApi";

export default function Header() {
  const { userInfo, logout, setUserInfo, setToken } = useContext(AuthContext);
  const { data: users } = useGetUsersQuery();
  const tokenID = localStorage.getItem("token");

  useEffect(() => {
    const user = users?.find((i) => i.token === tokenID);
    if (user) {
      setUserInfo(user);
      setToken(user.token);
    }
  }, [users, tokenID, setUserInfo, setToken]);

  return (
    <header className="header-wrapper">
      <div className="container header-container">
        <div className="header-right">
          <Logo />
          <Social />
        </div>

        <div className="header-left">
          <HeaderUserInfo userInfo={userInfo} logout={logout} />
          <CartInfo />
        </div>
      </div>
    </header>
  );
}
