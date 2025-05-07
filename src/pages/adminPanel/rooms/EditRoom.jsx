import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import { useEditRoomMutation } from "../../../app/services/roomApi";
import Form from "../../../components/form/Form";
import {
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validators/rules";

export default function EditRoom({ selectedRoom }) {
  const ContextDatas = useContext(ContextData);
  const { roomTypes, roomViews } = ContextDatas;
  const navigate = useNavigate();

  const [editRoom] = useEditRoomMutation();

  const {
    id,
    roomNumber,
    floor,
    roomTypeID,
    roomViewID,
    capacity,
    price,
    maxAddedPeople,
    pricePerAddedPerson,
		score,
  } = selectedRoom;

  const inputs = [
    {
      tag: "input",
      name: "roomNumber",
      type: "number",
      label: "شماره اتاق",
      validators: [requiredNumberValidator()],
      initialValue: roomNumber,
    },
    {
      tag: "input",
      name: "floor",
      type: "number",
      label: "طبقه",
      validators: [requiredNumberValidator()],
      initialValue: floor,
    },
    {
      tag: "select",
      name: "roomTypeID",
      label: "نوع اتاق",
      validators: [requiredStringValidator()],
      options: roomTypes,
      initialValue: roomTypeID,
    },
    {
      tag: "select",
      name: "roomViewID",
      label: "منظره اتاق",
      validators: [requiredStringValidator()],
      options: roomViews,
      initialValue: roomViewID,
    },
    {
      tag: "input",
      name: "capacity",
      type: "number",
      label: "ظرفیت پایه",
      validators: [requiredNumberValidator()],
      initialValue: capacity,
    },
    {
      tag: "input",
      name: "price",
      type: "number",
      label: "قیمت پایه",
      validators: [requiredNumberValidator()],
      initialValue: price,
    },
    {
      tag: "input",
      name: "maxAddedPeople",
      type: "number",
      label: "حداکثر تعداد نفرات اضافه",
      validators: [requiredNumberValidator()],
      initialValue: maxAddedPeople,
    },
    {
      tag: "input",
      name: "pricePerAddedPerson",
      type: "number",
      label: "قیمت هر نفر اضافه",
      validators: [requiredNumberValidator()],
      initialValue: pricePerAddedPerson,
    },
		{
      tag: "input",
      name: "description",
      type: "text",
      label: "توضیحات",
			dir: 'ltr',
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
    await editRoom({ id, score, ...newItem });
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
      <h1>لطفا مشخصات اتاق را ویرایش نمایید</h1>
      <Form inputs={inputs} buttons={buttons} submitHandler={submitHandler} />
    </div>
  );
}
