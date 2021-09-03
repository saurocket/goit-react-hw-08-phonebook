import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^([^0-9])*$/, "First name should not contain numbers")
        .min(3)
        .required("Name is a required field"),
    email: yup
        .string()
        .email("Email should have correct format")
        .required("Email is a required field"),
    password: yup
        .string()
        .min(6, 'Password is too short. It has to be more then 6 simbols')
        .required("Password  is a required field"),
    confirmPassword: yup
        .string()
        .required("Please repeat password"),

})