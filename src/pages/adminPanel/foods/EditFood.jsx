import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import { useEditFoodMutation } from "../../../app/services/foodApi";
import Form from "../../../components/form/Form";
import {   requiredNumberValidator,
  requiredStringValidator, } from "../../../validators/rules";

export default function EditFood({ selectedFood }) {
  const ContextDatas = useContext(ContextData);
  const { foodCategories } = ContextDatas;
  const navigate = useNavigate();

  const [editFood] = useEditFoodMutation();

  const { id, title, foodCategoryID, price, ingredients, calories, protein, fat, sugar, carbohydrates, description, score, images	} = selectedFood;
  const inputs = [
    {
      tag: "input",
      name: "title",
      type: "text",
      label: "عنوان غذا",
      validators: [requiredStringValidator()],
      initialValue: title,
    },
    {
      tag: "select",
      name: "foodCategoryID",
      label: "دسته بندی",
      validators: [requiredStringValidator()],
      options: foodCategories,
      initialValue: foodCategoryID,
    },
    {
      tag: "input",
      name: "price",
      type: "number",
      label: "قیمت (تومان)",
      validators: [requiredNumberValidator()],
      initialValue: price,
    },
    {
        tag: "input",
        name: "ingredients",
        type: "text",
        label: "محتویات",
        validators: [requiredStringValidator()],
        initialValue: ingredients,
      },
      {
        tag: "input",
        name: "calories",
        type: "number",
        label: "میزان کالری",
        validators: [requiredNumberValidator()],
        initialValue: calories,
      },
      {
        tag: "input",
        name: "protein",
        type: "number",
        label: "پروتئین",
        validators: [requiredNumberValidator()],
        initialValue: protein,
      },
      {
        tag: "input",
        name: "fat",
        type: "number",
        label: "چربی",
        validators: [requiredNumberValidator()],
        initialValue: fat,
      },
      {
        tag: "input",
        name: "sugar",
        type: "number",
        label: "قند",
        validators: [requiredNumberValidator()],
        initialValue: sugar,
      },
      {
        tag: "input",
        name: "carbohydrates",
        type: "number",
        label: "کربوهیدرات",
        validators: [requiredNumberValidator()],
        initialValue: carbohydrates,
      },
      {
        tag: "input",
        name: "description",
        type: "text",
        label: "توضیحات",
        validators: [requiredStringValidator()],
        initialValue: description,
      },
		{
      tag: "input",
      name: "images",
      type: "text",
      label: "تصویر غذا",
			dir: 'ltr',
      validators: [],
      initialValue: images,
    },
  ];

  const submitHandler = async (newItem) => {
    await editFood({ id, score, ...newItem });
    navigate("/aseman-hotel/adminPanel/foods");
  };
  const cancelHandler = () => {
    navigate("/aseman-hotel/adminPanel/foods");
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
      <h1>لطفا مشخصات غذای جدید را وارد نمایید</h1>
      <Form
        inputs={inputs}
				buttons={buttons}
        submitHandler={submitHandler}
      />
    </div>
  );
}
