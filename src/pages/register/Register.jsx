import React, {useContext} from "react";
import { ContextData } from "../../contexts/ContextData";
import swal from "sweetalert";
import {
  useGetUsersQuery,
  useAddUserMutation,
} from "../../app/services/userApi";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import CircleSpinner from "../../components/loader/CircleSpinner";
import { MdErrorOutline } from "react-icons/md";
import {
  requiredStringValidator,
  requiredBooleanValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
} from "../../validators/rules";
import PageHeader from "../../components/pageHeader/PageHeader";


export default function Register() {
    const ContextDatas = useContext(ContextData);
    const { login } = ContextDatas;
  const { data: users, isLoading, error } = useGetUsersQuery();
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  if(isLoading){
    return <CircleSpinner />;
  }

  if (error) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{error.error}</p>
      </div>
    );
  }

  const inputs = [
    {
      tag: "input",
      name: "name",
      type: "text",
      label: "نام و نام خانوادگی",
      validators: [
        requiredStringValidator(),
        minValidator(3),
        maxValidator(20),
      ],
      initialValue: "",
    },
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
      name: "email",
      type: "text",
      label: "ایمیل",
      validators: [emailValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "password",
      type: "password",
      label: "رمز عبور",
      validators: [requiredStringValidator(), passwordValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "confirmPassword",
      type: "password",
      label: "تکرار رمز عبور",
      validators: [requiredStringValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "acceptRules",
      type: "checkbox",
      label: "شرایط و قوانین را می پذیرم",
      validators: [requiredBooleanValidator()],
      initialValue: "",
    },
  ];

  const submitHandler = async (newItem) => {

      const addFlag = users.find((user) => user.phone === newItem.phone);
      if (addFlag) {
        swal({
          text: "قبلا کاربر دیگری با این شماره موبایل در سایت ثبت نام کرده است.",
          buttons: "باشه",
        });
      } else {
        delete newItem.acceptRules;
        delete newItem.confirmPassword;
        const userInfo = { ...newItem, ...{ role: "user", profile: "" } };
        await addUser(userInfo);
        await login(userInfo);
        navigate('/aseman-hotel');
      }
    
  };

  const buttons = [
    {
      title: "ثبت نام",
      type: "submit",
      className: "btn btn-submit btn-lg",
    },
  ];

  return (
		<>
		<PageHeader title="برای ثبت نام مشخصات خود را وارد کنید:" />
    <div className="login-container">
      <Form inputs={inputs} buttons={buttons} submitHandler={submitHandler} />
    </div>
		</>

  );
}
