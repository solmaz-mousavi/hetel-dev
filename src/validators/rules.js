export const requiredString = 'REQUIRED_STRING';
export const requiredNumber = 'REQUIRED_NUMBER';
export const requiredBoolean = 'REQUIRED_BOOLEAN';
export const requiredDate = 'REQUIRED_DATE';
export const minValue = 'MIN_VALUE';
export const maxValue = 'MAX_VALUE';
export const emailValue = 'EMAIL_VALUE';
export const phoneValue = 'PHONE_VALUE';
export const passwordValue = 'PASSWORD_VALUE';

export const requiredStringValidator = () => ({type: requiredString});
export const requiredNumberValidator = () => ({type: requiredNumber});
export const requiredBooleanValidator = () => ({type: requiredBoolean});
export const requiredDateValidator = () => ({type: requiredDate});
export const minValidator = (min) => ({type: minValue, min});
export const maxValidator = (max) => ({type: maxValue, max});
export const emailValidator = () => ({type: emailValue});
export const phoneValidator = () => ({type: phoneValue });
export const passwordValidator = () => ({type: passwordValue });
