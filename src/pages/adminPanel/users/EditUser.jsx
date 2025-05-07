import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useGetUsersQuery, useEditUserMutation } from "../../../app/services/userApi";
import Form from "../../../components/form/Form";
import {
  requiredStringValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "../../../validators/rules";

export default function EditUser({ selectedUser }) {
  const navigate = useNavigate();
	const { data: users } = useGetUsersQuery();
  const [editUser] = useEditUserMutation();
  const { id, name, phone, email, role, password, profile } = selectedUser;
  const inputs = [
    {
      tag: "input",
      name: "name",
      type: "text",
      label: "نام و نام خانوادگی",
      validators: [requiredStringValidator(), minValidator(3), maxValidator(20)],
      initialValue: name,
    },
    {
      tag: "input",
      name: "phone",
      type: "text",
      label: "شماره موبایل",
      validators: [requiredStringValidator(), phoneValidator()],
      initialValue: phone,
    },
    {
      tag: "input",
      name: "email",
      type: "text",
      label: "ایمیل",
      validators: [emailValidator()],
      initialValue: email,
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
      initialValue: role,
    },
		{
      tag: "input",
      name: "profile",
      type: "text",
      label: "تصویر کاربر",
	    dir: 'ltr',
      validators: [],
      initialValue: profile,
    },
  ];

  const submitHandler = async (newItem) => {

		if (users) {
      const addFlag = users.find((user) => ((user.phone === newItem.phone) && (user.id !== id)));
      if (addFlag) {
        swal({
          text: "قبلا کاربر دیگری با این شماره موبایل در سایت ثبت نام کرده است.",
          buttons: "باشه",
        });
      } else {
				await editUser({ id, password, ...newItem });
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
      <h1>لطفا مشخصات کاربر را ویرایش نمایید</h1>

      <Form
        inputs={inputs}
		buttons={buttons}
        submitHandler={submitHandler}
      />
    </div>
  );
}
