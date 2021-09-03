import axios from "axios";
import {createContactType} from "../Components/types/APITypes";
import {BASE_URL} from "./baseURL";
import {ItemPhoneType} from "../redux/phoneReducer/phoneReducer";

const URL = BASE_URL + '/contacts'
export const contactsAPI = {
    getContacts(token: string) {
        return axios({
            method: "GET",
            url: `${URL}/`,
            headers: {
                Authorization: token
            }
        }).then(r => r.data)
    },
    createContact(token: string, body: createContactType) {
        return axios({
            method: "post",
            headers: {
                Authorization: token
            },
            url: URL,
            data: body
        }).then(r => r.data)
    },
    deleteContact(token: string, id: string) {
        return axios({
            method: "delete",
            url: `${URL}/${id}`,
            headers: {
                Authorization: token
            }
        }).then(r => r.data)
    },
    editContact(token: string, data:ItemPhoneType) {

        return axios({
            method: "patch",
            url: `${URL}/${data.id}`,
            headers: {
                Authorization: token
            },
            data: {name: data.name, number: data.number}
        }).then(r => r.data)
    }

}