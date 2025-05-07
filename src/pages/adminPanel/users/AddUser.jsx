import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useGetUsersQuery, useAddUserMutation } from "../../../app/services/userApi";
import Form from "../../../components/form/Form";
import {
  requiredStringValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
  passwordValidator,
} from "../../../validators/rules";

export default function AddUser() {
  const navigate = useNavigate();
	const { data: users } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();

  const inputs = [
    {
      tag: "input",
      name: "name",
      type: "text",
      label: "نام و نام خانوادگی",
      validators: [requiredStringValidator(), minValidator(3), maxValidator(20)],
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
      tag: "select",
      name: "role",
      label: "نوع کاربر",
      validators: [requiredStringValidator()],
      options: [
        { id: "admin", title: "مدیر سایت" },
        { id: "user", title: "کاربر" },
      ],
      initialValue: "",
    },
		{
      tag: "input",
      name: "profile",
      type: "text",
      label: "تصویر کاربر",
			dir: 'ltr',
      validators: [],
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
  ];

  const submitHandler = async (newItem) => {
		if (users) {
      const addFlag = users.find((user) => user.phone === newItem.phone);
      if (addFlag) {
        swal({
          text: "قبلا کاربر دیگری با این شماره موبایل در سایت ثبت نام کرده است.",
          buttons: "باشه",
        });
      } else {
				delete newItem.confirmPassword;
				await addUser(newItem);
				navigate("/aseman-hotel/adminPanel/users");
      }
    }
  };
  const cancelHandler = () => {
    navigate("/aseman-hotel/adminPanel/users");
  };
  const buttons = [
    {
      title: "انصراف",
      type: "button",
      className: "btn btn-gold",
      method: cancelHandler,
    },
    {
      title: "ثبت",
      type: "submit",
      className: "btn btn-submit",
    },
  ];

  return (
    <div>
      <h1>لطفا مشخصات کاربر جدید را وارد نمایید</h1>

      <Form
        inputs={inputs}
		buttons={buttons}
        submitHandler={submitHandler}
      />
    </div>
  );
}
