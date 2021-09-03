import {RememberMeType, ResponseAfterRegistration} from "../../Components/types/registerPage";
import {AuthType, InformationType} from "./authTypes";

export const actions = {
    isFetch(payload:boolean){
        return ({type: "IS_FETCH", payload} as const)
    },
    throwError(payload: string) {
        return ({type: 'THROW_ERROR', payload} as const)
    },
    resetError(){
        return({type: 'RESET_ERROR'} as const)
    },
    rememberMeAfterRegistration(payload: RememberMeType){
        return ({type: 'REMEMBER_ME_AFTER_REGISTRATION', payload} as const)
    },
    responseAfterRegistration(payload: ResponseAfterRegistration){
        return ({type: 'SET_RESPONSE_AFTER_REGISTRATION', payload} as const)
    },
    authUser(payload:AuthType | null ){
        return({type: 'AUTH_USER', payload} as const)
    },
    rememberMe(payload:boolean){
        return({type: 'REMEMBER_MY_DATA', payload} as const)
    },
    udateInfo(payload: null | InformationType){
        return({type: 'UPDATE_INFORMATION', payload} as const)
    }
}