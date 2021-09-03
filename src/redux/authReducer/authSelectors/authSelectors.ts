import {AppStateType} from "../../store";

export const getAuth = (state:AppStateType) => state.auth.auth
export const getLogin = (state: AppStateType) => state.auth.signIn
export const getRegister = (state: AppStateType) => state.auth.signUp
export const getErrors = (state:AppStateType) => state.auth.error
export const getResponse = (state:AppStateType )=> state.auth.responseAfterRegistration
export const getRememberMe = (state: AppStateType) => state.auth.rememberMe
export const getInformation = (state: AppStateType) => state.auth.info
export const getLoading = (state: AppStateType) => state.auth.isFetch

