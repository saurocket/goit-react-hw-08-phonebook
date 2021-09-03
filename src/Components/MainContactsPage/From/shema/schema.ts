import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.")
        .required("Имя - Обязательное поле"),
    phone: yup
        .string()
        .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, "Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +")
        .required("Номер телефона - Обязательное поле")
})