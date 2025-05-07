import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import { useAddFoodMutation } from "../../../app/services/foodApi";
import Form from "../../../components/form/Form";
import { requiredStringValidator, requiredNumberValidator } from "../../../validators/rules";

export default function AddFood() {
  const ContextDatas = useContext(ContextData);
  const { foodCategories } = ContextDatas;
  const navigate = useNavigate();

  const [addFood] = useAddFoodMutation();

  const inputs = [
    {
      tag: "input",
      name: "title",
      type: "text",
      label: "عنوان غذا",
      validators: [requiredStringValidator()],
      initialValue: "",
    },
    {
      tag: "select",
      name: "foodCategoryID",
      label: "دسته بندی",
      validators: [requiredStringValidator()],
      options: foodCategories,
      initialValue: "",
    },
    {
      tag: "input",
      name: "price",
      type: "number",
      label: "قیمت (تومان)",
      validators: [requiredNumberValidator()],
      initialValue: "",
    },

    {
        tag: "input",
        name: "ingredients",
        type: "text",
        label: "محتویات",
        validators: [requiredStringValidator()],
        initialValue: "",
      },
      {
        tag: "input",
        name: "calories",
        type: "number",
        label: "میزان کالری",
        validators: [requiredNumberValidator()],
        initialValue: "",
      },
      {
        tag: "input",
        name: "protein",
        type: "number",
        label: "پروتئین",
        validators: [requiredNumberValidator()],
        initialValue: "",
      },
      {
        tag: "input",
        name: "fat",
        type: "number",
        label: "چربی",
        validators: [requiredNumberValidator()],
        initialValue: "",
      },
      {
        tag: "input",
        name: "sugar",
        type: "number",
        label: "قند",
        validators: [requiredNumberValidator()],
        initialValue: "",
      },
      {
        tag: "input",
        name: "carbohydrates",
        type: "number",
        label: "کربوهیدرات",
        validators: [requiredNumberValidator()],
        initialValue: "",
      },
      {
        tag: "input",
        name: "description",
        type: "text",
        label: "توضیحات",
        validators: [requiredStringValidator()],
        initialValue: "",
      },

		{
      tag: "input",
      name: "images",
      type: "text",
      label: "تصویر غذا",
			dir: 'ltr',
      validators: [],
      initialValue: "",
    },
  ];

  const submitHandler = async (newItem) => {
    await addFood({ ...{score: 0}, ...newItem });
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
