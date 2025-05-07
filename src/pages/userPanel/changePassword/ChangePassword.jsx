import React from "react";
import { useNavigate } from "react-router-dom";
import { useEditUserMutation } from "../../../app/services/userApi";
import swal from "sweetalert";
import Form from "../../../components/form/Form";
import {
  requiredStringValidator,
  passwordValidator,
} from "../../../validators/rules";

export default function ChangePassword({ selectedUser }) {
  const navigate = useNavigate();
  const [editUser] = useEditUserMutation();
  const { id, name, phone, email, role, password, profile} = selectedUser;
  const inputs = [
    {
      tag: "input",
      name: "oldPassword",
      type: "password",
      label: "رمز عبور قبلی",
      validators: [requiredStringValidator()],
      initialValue: '',
    },
    {
        tag: "input",
        name: "password",
        type: "password",
        label: "رمز عبور جدید",
        validators: [requiredStringValidator(), passwordValidator()],
        initialValue: '',
      },
      {
        tag: "input",
        name: "confirmPassword",
        type: "password",
        label: "تکرار رمز عبور جدید",
        validators: [requiredStringValidator()],
        initialValue: '',
      },
  ];

  const submitHandler = async (newItem) => {
    if(password !== newItem.oldPassword ) {
        swal({
            text: "رمز عبور وارد شده با رمز عبور کاربری مطابقت ندارد",
            buttons: "باشه"
        })
    } else {
        await editUser({ id, name, phone, email, role, profile, ...{password: newItem.password} });
        swal({
            text: 'رمز عبورشما با موفقیت تغییر یافت.',
            buttons: "باشه"
        })
        navigate("/aseman-hotel/userPanel/userInfo");
    }
  };
  const cancelHandler = () => {
    navigate("/aseman-hotel/userPanel/userInfo");
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
      <h1>لطفا مشخصات خود را ویرایش نمایید</h1>

      <Form
        inputs={inputs}
		buttons={buttons}
        submitHandler={submitHandler}
      />
    </div>
  );
}
