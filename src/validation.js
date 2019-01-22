export const required = value => (value ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength20 = maxLength(20);
export const maxLength25 = maxLength(25);
export const maxLength50 = maxLength(50);
export const maxLength100 = maxLength(100);
export const maxLength300 = maxLength(300);
export const maxLength200 = maxLength(200);
export const maxLength21 = maxLength(21);


export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const minLength8 = minLength(8);
export const minLength3 = minLength(3);


export const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
export const minValue7 = minValue(7);


const maxValue = max => value =>
    value && value > max ? `Must be ${max} value or less` : undefined;
const maxValue18 = maxValue(18);
export const maxValue7 = maxValue(9999999);


export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;

export const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined;

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Oops! it should be alphanumeric'
        : undefined;


export const phoneNumber = value =>

    value && !/^(?!.*([\(\)\-\/]{2,}|\([^\)]+$|^[^\(]+\)|\([^\)]+\(|\s{2,}).*)\+?([\-\s\(\)\/]*\d){9,15}[\s\(\)]*$/i.test(value)
        ? 'Invalid phone number'
        : undefined;

export const zipcode = value =>
    value && !/^[1-9][0-9]{5}$/i.test(value)
        ? 'Invalid zipcode'
        : undefined;

