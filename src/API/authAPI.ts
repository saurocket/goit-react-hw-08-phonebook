import {RegistrationData} from "../Components/types/APITypes";
import {LoginDataType} from "../Components/types/loginPage";
import axios from "axios";
import {BASE_URL} from "./baseURL";

export const instance = axios.create({
    baseURL: BASE_URL,
})


export const authAPI = {
    registration(data: RegistrationData){
        return instance.post(`/users/signup`, {...data}).then(r => r.data)
    },
    login(data:LoginDataType){
        return instance.post(`/users/login`, {...data}).then(r => r.data)
    },
    logout(token:string){
        return axios({
            method: "post",
            url: `${BASE_URL}/users/logout`,
            headers: {
                Authorization: token
            }
        }).then(r => r.data)
    },
    information(token:string){
        return axios({
            method: "GET",
            url: `${BASE_URL}/users/current`,
            headers: {
                Authorization: token
            }
        }).then(r => r.data)
    }

}