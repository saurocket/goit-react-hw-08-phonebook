import {RegistrationData} from "../../Components/types/APITypes";
import {authAPI} from "../../API/authAPI";
import {NewDataRegistrationToThunk, ResponseAfterRegistration} from "../../Components/types/registerPage";
import {LoginDataType} from "../../Components/types/loginPage";
import {ActionTypes, AuthType, InformationType, signIn, signUp, ThunkType} from "./authTypes";
import {actions} from "./authActions";


const initialState = {
    auth: null as null | AuthType,
    info: null as null | InformationType,
    rememberMe: false as boolean,
    error:null as null | string,
    responseAfterRegistration: null as null | ResponseAfterRegistration,
    signIn:{
        email: '',
        password: ''
    } as signIn,
    signUp:{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    } as signUp,
    isFetch: false,
}
type InitialStateType = typeof initialState
export const authReducer = (state = initialState, action:ActionTypes): InitialStateType => {
    switch (action.type) {
        case   "THROW_ERROR": {
            return {...state, error: action.payload}
        }
        case "RESET_ERROR": {
            return {...state, error: null}
        }
        case "IS_FETCH": {
            return {...state, isFetch: action.payload}
        }
        case "REMEMBER_ME_AFTER_REGISTRATION": {
            return  {...state, signIn: {...action.payload}}
        }
        case "SET_RESPONSE_AFTER_REGISTRATION":{
            return {...state, responseAfterRegistration: action.payload}
        }
        case "AUTH_USER":{
            return {...state, auth: action.payload}
        }
        case "REMEMBER_MY_DATA":{
            return {...state, rememberMe: action.payload}
        }
        case "UPDATE_INFORMATION":{
            return {...state, info: action.payload}
        }
        default:
            return state;
    }
}

export const registerUser = (data:NewDataRegistrationToThunk):ThunkType => {
    return (
        async (dispatch,getState) => {
            dispatch(actions.isFetch(true))
            try {
                const newData:RegistrationData = {name: data.name, password: data.password, email: data.email}
                const response = await authAPI.registration(newData)
                if (response.status = 201) {
                    dispatch(actions.responseAfterRegistration(response))
                    if (data.rememberMe){
                        dispatch(actions.rememberMeAfterRegistration({password: data.password, email:data.email}))
                    }
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.keyValue.email ?? e.message ?? 'Something went wrong'))
            }
            finally {
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
                dispatch(actions.isFetch(false))
            }
        }
    )
}

export const loginUser = (data:LoginDataType):ThunkType => {
    return (
        async (dispatch, getState) => {
            dispatch(actions.isFetch(true))
            try {
                const response = await authAPI.login(data)
                if (response.status = 200) {
                    dispatch(actions.authUser({auth:true, ...response}))
                }
            }catch (e) {
                console.log(e.response.statusText)
                dispatch(actions.throwError(e.response?.statusText ?? e.message ?? 'Something went wrong'))
            }
            finally {
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
                dispatch(actions.isFetch(false))
            }
        }
    )
}

export const logOut = ():ThunkType=> {
    return (
        async (dispatch,getState) => {
            try {
                const toket = getState().auth.auth?.token
                if(!toket){
                    return
                }
                const response = await authAPI.logout(toket)
                if (response.status = 200) {
                    dispatch(actions.authUser(null))
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.message ?? e.message ?? 'Something went wrong'))
            }
            finally {
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
            }
        }
    )
}

export const getInfo = ():ThunkType=> {
    return (
        async (dispatch,getState) => {
            try {
                const toket = getState().auth.auth?.token
                if(!toket){
                    return
                }
                const response = await authAPI.information(toket)
                if (response.status = 200) {
                    dispatch(actions.udateInfo(response))
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.message ?? e.message ?? 'Something went wrong'))
            }
            finally {
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
                dispatch(actions.udateInfo(null))
            }
        }
    )

}

