import {contactsFilter} from "../herlerFunction/firlter";
import {BaseThunkType, InferActionTypes} from "../store";
import {contactsAPI} from "../../API/contactsAPI";
import {createContactType} from "../../Components/types/APITypes";



export type ItemPhoneType = {
    id: string,
    name: string,
    number: string
}

type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
type InitialStateType = typeof initialState

const initialState = {
    contacts: {
        items: [] as [] | Array<ItemPhoneType>,
        filter: ''
    },
    editContact: null as null | ItemPhoneType,
    isFetch: false as boolean,
    success: false as boolean,
    error: null as null | string,
}

export const phoneReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_CONTACT":
            return {
                ...state, contacts: {
                    ...state.contacts,
                    items: contactsFilter([...action.payload])
                }
            }
        case "DELETE_CONTACT":
            return {
                ...state, contacts: {
                    ...state.contacts,
                    items: [...state.contacts.items.filter(item => item.id !== action.payload)]
                }
            }
        case "FILTER_CONTACT":
            return {...state, contacts: {...state.contacts, filter: action.payload}}
        case   "THROW_ERROR": {
            return {...state, error: action.payload}
        }
        case "RESET_ERROR": {
            return {...state, error: null}
        }
        case "EDIT_CONTACT":{
            const findItem = state.contacts.items.find(i => i.id === action.id)
            if (!findItem){
                return {...state}
            }
            return {...state,editContact: findItem}
        }
        case "CLEAR_EDIT_CONTACT": {
            return {...state, editContact: null}
        }
        case "IS_LOADING":{
            return {...state, isFetch: action.payload}
        }
        case "STATUS_SUCCESS": {
            return {...state, success: action.payload}
        }
        default:
            return state;
    }
}

export const actions = {
    addContact(payload: Array<ItemPhoneType>) {
        return ({type: 'ADD_CONTACT', payload} as const)
    },
    deleteContact(payload: number | string) {
        return ({type: 'DELETE_CONTACT', payload} as const)
    },
    filterContact(payload: string) {
        return ({type: 'FILTER_CONTACT', payload} as const)
    },
    throwError(payload: string) {
        return ({type: 'THROW_ERROR', payload} as const)
    },
    resetError(){
        return({type: 'RESET_ERROR'} as const)
    },
    editContact(id:string){
        return({type: 'EDIT_CONTACT', id} as const)
    },
    clearEditContact(){
        return ({type: 'CLEAR_EDIT_CONTACT'} as const)
    },
    statusFetch(payload:boolean){
        return ({type: 'IS_LOADING', payload} as const)
    },
    statusSuccess(payload:boolean){
        return ({type: 'STATUS_SUCCESS', payload} as const)
    }



}

export const getDataContact = (): ThunkType => {
    return (
        async (dispatch,getState) => {
            const token = getState().auth.auth?.token
            if(!token) return
            dispatch(actions.statusFetch(true))
            try {
                const response = await contactsAPI.getContacts(token)
                if (response.status = 200) {
                   dispatch(actions.addContact(response))
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.message ?? e.message ?? 'Something went wrong'))
            }
            finally {
                dispatch(actions.statusFetch(false))
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
            }
        }
    )
}
export const postContact = (data: createContactType): ThunkType => {
    return (
        async (dispatch,getState) => {
            try {
                const toket = getState().auth.auth?.token
                if(!toket){
                    return
                }
                dispatch(actions.statusFetch(true))
                const response = await contactsAPI.createContact(toket, data)
                if (response.status = 201) {
                    dispatch(actions.statusSuccess(true))
                    dispatch(getDataContact())
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.message ?? e.message ?? 'Something went wrong'))
            }
            finally {
                dispatch(actions.statusFetch(false))
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
                if(getState().phone.success){
                    dispatch(actions.statusSuccess(false))
                }
            }
        }
    )
}

export const deletePost = (id: string):ThunkType=> {
    return (
        async (dispatch,getState) => {
            try {
                const toket = getState().auth.auth?.token
                if(!toket){
                    return
                }
                dispatch(actions.statusFetch(true))
                const response = await contactsAPI.deleteContact(toket, id)
                if (response.status = 200) {
                    dispatch(getDataContact())
                    dispatch(actions.statusSuccess(true))
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.message ?? e.message ?? 'Something went wrong'))
            }
            finally {
                dispatch(actions.statusFetch(false))
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
                if(getState().phone.success){
                    dispatch(actions.statusSuccess(false))
                }
            }
        }
    )
}
export const updateContact = (data:ItemPhoneType):ThunkType=> {
    return (
        async (dispatch,getState) => {
            try {
                const toket = getState().auth.auth?.token
                if(!toket){
                    return
                }
                dispatch(actions.statusFetch(true))
                const response = await contactsAPI.editContact(toket, data)
                if (response.status = 200) {
                    dispatch(actions.clearEditContact())
                    dispatch(getDataContact())
                }
            }catch (e) {
                dispatch(actions.throwError(e.response?.data?.message ?? e.message ?? 'Something went wrong'))
            }
            finally {
                dispatch(actions.statusFetch(false))
                if(getState().auth.error){
                    dispatch(actions.resetError())
                }
                if(getState().phone.success){
                    dispatch(actions.statusSuccess(false))
                }
            }
        }
    )
}


