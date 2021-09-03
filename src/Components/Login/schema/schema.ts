import * as yup from "yup";

export const schema = yup.object().shape({
    email: yup
        .string()
        .email("Email should have correct format")
        .required("Email is a required field"),
    password: yup
        .string()
        .min(7)
        .required("First name is a required field")
})