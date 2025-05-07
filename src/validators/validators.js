import {
  requiredString,
  requiredNumber,
  requiredBoolean,
  requiredDate,
  minValue,
  maxValue,
  emailValue,
  phoneValue,
  passwordValue,
} from "./rules";
import { phonePattern, emailPattern, passwordPattern } from "./regex";

export default function validator(inputValue, validators) {
  let error = "";
  validators.some((validator) => {
    switch (validator.type) {

      case requiredString: {
        inputValue.toString().trim().length === 0 &&
          (error = "این فیلد الزامی است");
        break;
      }

      case requiredNumber: {
        inputValue < 1 && (error = "این فیلد الزامی است");
        break;
      }

			case requiredBoolean: {
        !inputValue && (error = "این فیلد الزامی است");
        break;
      }

      case requiredDate: {
				const today = new Date()
        if (inputValue === "") {
          error = "این فیلد الزامی است"; 
        } else if (inputValue < today) {
          error = "درخواست باید برای روزهای آینده صادر گردد";
        }
        break;
      }

      case minValue: {
        inputValue.trim().length < validator.min &&
          (error = `حداقل تعداد کاراکتر مجاز ${validator.min} می باشد`);
        break;
      }

      case maxValue: {
        inputValue.trim().length >= validator.max &&
          (error = `حداکثر تعداد کاراکتر مجاز ${validator.max} می باشد`);
        break;
      }

      case phoneValue: {
        !phonePattern.test(inputValue) &&
          (error = "شماره موبایل وارد شده نامعتبر است");
        break;
      }

      case emailValue: {
        if (inputValue.length > 0) {
          if (!emailPattern.test(inputValue)) {
            error = "قالب ایمیل وارد شده نامعتبر است";
          }
        }
        break;
      }

      case passwordValue: {
        !passwordPattern.test(inputValue) &&
          (error =
            "رمز عبور وارد شده باید حداقل 8کاراکتر، شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک کاراکتر ویژه باشد.");
        break;
      }

      default: {
        break;
      }
    }

    return error !== "";
  });

  return error;
}
