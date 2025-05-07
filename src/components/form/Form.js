import React, { useState } from "react";
import { useFormik } from "formik";
import validatorMethod from "../../validators/validators";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import ReCAPTCHA from "react-google-recaptcha";
import "./form.css";

export default function Form({ inputs, buttons, submitHandler }) {
  const [iSGoogleRecaptcha, setISGoogleRecaptcha] = useState(false);

  const formInitialValues = {};
  inputs.forEach((input) => {
    const { name, initialValue } = input;
    formInitialValues[name] = initialValue;
  });

  const formik = useFormik({
    initialValues: formInitialValues,

    onSubmit: (values) => {
      submitHandler(values);
    },

    validate: (values) => {
      let errors = {};

      inputs.forEach((input) => {
        const { tag, name, validators } = input;
        if (["input", "select", "checkbox", "date"].includes(tag)) {
          errors[name] = validatorMethod(values[name], validators);
        }

        if (tag === "recaptcha") {
          !iSGoogleRecaptcha &&
            (errors.recaptcha = "تایید کد کپچا الزامی است. ");
        }

        if (name === "confirmPassword") {
          values.password !== values.confirmPassword &&
            (errors.confirmPassword = "رمز عبور و تکرار آن باید یکسان باشد");
        }
        if (name === "carbohydrates") {
          const { protein, fat, sugar, carbohydrates } = values;
          protein + fat + sugar + carbohydrates !== 100 &&
            (errors.carbohydrates =
              "جمع درصد گزینه های پروئتئین، چربی، قند و کربوهیدرات باید 100 باشد.");
        }
        if (name === "exitDate") {
          const { enterDate, exitDate } = values;
          if (Boolean(enterDate) && Boolean(exitDate)) {
            if (enterDate.format() === exitDate.format()) {
              errors.exitDate =
                "تاریخ ورود و خروج نمی تواند یکسان باشد. (حداقل یک شب اقامت باید درخواست گردد.)";
            } else if (enterDate > exitDate) {
              errors.exitDate = "تاریخ خروج باید پس از تاریخ ورود باشد.";
            }
          }
        }

        errors[name] === "" && delete errors[name];
      });
      return errors;
    },
  });

  const dateHandleChange = (event, name) => {
    if (event?.format()) {
      formik.values[name.name] = event;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="form-wrapper">
      <div className="inputs-container">
        {inputs.map((input) => {
          switch (input.tag) {
            case "input": {
              const { name, label, type } = input;
              return (
                <div
                  className={`input-wrapper ${
                    type === "checkbox" ? "checkbox" : ""
                  } `}
                  key={name}
                >
                  <label htmlFor={name}>{label}</label>
                  <input
                    type={type}
                    dir={input.dir}
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors[name] && formik.touched[name] && (
                    <span className="inputError">{formik.errors[name]}</span>
                  )}
                </div>
              );
            }
            case "select": {
              const { name, label, options } = input;
              return (
                <div className="input-wrapper" key={name}>
                  <label htmlFor={name}>{label}</label>
                  <select
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value={0} hidden>
                      انتخاب کنید
                    </option>
                    {options.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                  {formik.errors[name] && formik.touched[name] && (
                    <span className="inputError">{formik.errors[name]}</span>
                  )}
                </div>
              );
            }
            case "date": {
              const { name: inputName, label } = input;
              return (
                <div className="input-wrapper" key={inputName}>
                  <label htmlFor={inputName}>{label}</label>
                  <DatePicker
                    calendar={persian}
                    locale={persian_en}
                    calendarPosition="bottom-right"
                    format="YYYY/MM/DD"
                    name={inputName}
                    value={formik.values[inputName]}
                    onChange={(event, name) =>
                      dateHandleChange(event, name.input)
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors[inputName] && formik.touched[inputName] && (
                    <span className="inputError">
                      {formik.errors[inputName]}
                    </span>
                  )}
                </div>
              );
            }
            case "recaptcha": {
              const { name } = input;
              return (
                <div className="input-wrapper" key={name}>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    value={iSGoogleRecaptcha}
                    onChange={setISGoogleRecaptcha}
                    className="recaptcha"
                    key={name}
                  />
                  {formik.errors[name] && formik.touched[name] && (
                    <span className="inputError">{formik.errors[name]}</span>
                  )}
                </div>
              );
            }
            default:
              return <></>;
          }
        })}
      </div>
      <div className="buttons-container">
        {buttons.map((btn) => {
          const { title, type, className, method } = btn;
          if (type === "submit") {
            return (
              <button type="submit" className={className} key={title}>
                {title}
              </button>
            );
          } else {
            return (
              <button
                type={type}
                className={className}
                onClick={method}
                key={title}
              >
                {title}
              </button>
            );
          }
        })}
      </div>
    </form>
  );
}
