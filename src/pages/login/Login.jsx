import React, { useContext } from "react";
import { useGetUsersQuery } from "../../app/services/userApi";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Form from "../../components/form/Form";
import CircleSpinner from "../../components/loader/CircleSpinner";
import { MdErrorOutline } from "react-icons/md";
import {
  requiredStringValidator,
  phoneValidator,
} from "../../validators/rules";
import "./login.css";
import { AuthContext } from "../../contexts/AuthContext";
import PageHeader from "../../components/pageHeader/PageHeader";


export default function Login() {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useGetUsersQuery();
  const { setUserInfo, setToken } = useContext(AuthContext);

  if (usersIsLoading) {
    return <CircleSpinner />;
  }

  if (usersError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{usersError.error}</p>
      </div>
    );
  }

  const inputs = [
    {
      tag: "input",
      name: "phone",
      type: "text",
      label: "شماره موبایل",
      validators: [requiredStringValidator(), phoneValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "password",
      type: "password",
      label: "رمز عبور",
      validators: [requiredStringValidator()],
      initialValue: "",
    },
    {
      tag: "recaptcha",
      type: "recaptcha",
      name: "recaptcha",
      validators: [],
      initialValue: "",
    },
    {
      tag: "input",
      type: "checkbox",
      name: "rme",
			label: "مرا بخاطر بسپار",
      validators: [],
      initialvalue: null,
    },
  ];
  const buttons = [
    {
      title: "ورود",
      type: "submit",
      className: "btn btn-gold btn-lg",
    },
  ];
  const submitHandler = async (newItem) => {
		console.log(newItem);
    const isLoggedIn = users.find((user) => {
      return user.phone === newItem.phone && user.password === newItem.password;
    });

    if (isLoggedIn) {
      setUserInfo(isLoggedIn);
      setToken(isLoggedIn.token);
      newItem.rme && localStorage.setItem("token", isLoggedIn.token);
      navigate("/aseman-hotel");
    } else {
      swal({
        text: "نام کاربری یا رمز عبور صحیح نمی باشد",
        buttons: ["باشه"],
      });
    }
  };

  return (
		<>
		<PageHeader title="برای ورود شماره موبایل و رمز عبور خود را وارد کنید:" />
    <div className="login-container">
      <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
      ></Form>
      <div>
        <Link to="/register" className="login-link">
          هنوز کاربری ندارید؟ جهت ثبت نام کلیک کنید.
        </Link>
        <Link className="login-link">رمز عبور خود را فراموش کرده اید؟</Link>
      </div>
    </div>
		</>

  );
}
