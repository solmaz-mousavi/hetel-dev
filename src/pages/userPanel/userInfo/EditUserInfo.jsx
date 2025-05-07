import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useGetUsersQuery, useEditUserMutation } from "../../../app/services/userApi";
import Form from "../../../components/form/Form";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdErrorOutline } from "react-icons/md";
import {
  requiredStringValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "../../../validators/rules";

export default function EditUserInfo() {
	const localStorageData = JSON.parse(localStorage.getItem("user"));
  const { id, name, phone, email, role, password } = localStorageData;
  const ContextDatas = useContext(ContextData);
  const { login } = ContextDatas;
  const navigate = useNavigate();
	const { data: users, isLoading, error } = useGetUsersQuery();
  const [editUser] = useEditUserMutation();

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
      tag: "input",
      name: "profile",
      type: "text",
      label: "تصویر کاربر",
      dir: "ltr",
      validators: [],
      initialValue: "",
    },
  ];

  const submitHandler = async (newItem) => {

      const addFlag = users.find((user) => ((user.phone === newItem.phone) && (user.id !== id)));
      if (addFlag) {
        swal({
          text: "قبلا کاربر دیگری با این شماره موبایل در سایت ثبت نام کرده است.",
        });
      } else {
				const userInfo = { id, password, role, ...newItem };
				await editUser(userInfo);
                swal({
                    text:'اطلاعات شما با موفقیت ویرایش شد',
                })
				await login(userInfo);
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

      <Form inputs={inputs} buttons={buttons} submitHandler={submitHandler} />
    </div>
  );
}
