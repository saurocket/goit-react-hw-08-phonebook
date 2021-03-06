import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.")
        .required("Имя - Обязательное поле"),
    phone: yup
        .string()
        .matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g, "Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +")
        .required("Номер телефона - Обязательное поле")
})