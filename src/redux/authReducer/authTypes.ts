import {BaseThunkType, InferActionTypes} from "../store";
import {actions} from "./authActions";


export type signIn = {
    email: string
    password: string
}
export type signUp = {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export type AuthType = {
    auth: boolean
    status: number
    token: null | string
    user: {
        email: string
        name: string
    }
}
export type InformationType = {
    name: string
    email: string
}

export type ActionTypes = InferActionTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionTypes>