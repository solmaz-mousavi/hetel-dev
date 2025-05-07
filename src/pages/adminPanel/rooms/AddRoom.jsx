import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import { useAddRoomMutation } from "../../../app/services/roomApi";
import Form from "../../../components/form/Form";
import {
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validators/rules";

export default function AddRoom() {
  const ContextDatas = useContext(ContextData);
  const { roomTypes, roomViews } = ContextDatas;
  const navigate = useNavigate();

  const [addRoom] = useAddRoomMutation();

  const inputs = [
    {
      tag: "input",
      name: "roomNumber",
      type: "number",
      label: "شماره اتاق",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "floor",
      type: "number",
      label: "طبقه",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },
    {
      tag: "select",
      name: "roomTypeID",
      label: "نوع اتاق",
      validators: [requiredStringValidator()],
      options: roomTypes,
      initialValue: "",
    },
    {
      tag: "select",
      name: "roomViewID",
      label: "منظره اتاق",
      validators: [requiredStringValidator()],
      options: roomViews,
      initialValue: "",
    },
    {
      tag: "input",
      name: "capacity",
      type: "number",
      label: "ظرفیت پایه",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "price",
      type: "number",
      label: "قیمت پایه",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "maxAddedPeople",
      type: "number",
      label: "حداکثر تعداد نفرات اضافه",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "pricePerAddedPerson",
      type: "number",
      label: "قیمت هر نفر اضافه",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },
		{
      tag: "input",
      name: "description",
      type: "text",
      label: "توضیحات",
      validators: [],
      initialValue: " ",
    },
    {
      tag: "input",
      name: "images",
      type: "text",
      label: "تصویر اتاق",
			dir: 'ltr',
      validators: [],
      initialValue: "",
    },
  ];

  const submitHandler = async (newItem) => {
    await addRoom({...newItem, ...{score: 0}});
    navigate("/aseman-hotel/adminPanel/rooms");
  };
  const cancelHandler = () => {
    navigate("/aseman-hotel/adminPanel/rooms");
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
      <h1>لطفا مشخصات اتاق جدید را وارد نمایید</h1>
      <Form
        inputs={inputs}
				buttons={buttons}
				submitHandler={submitHandler}
      />
    </div>
  );
}
