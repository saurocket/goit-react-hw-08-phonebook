import {AppStateType} from "../../store";
import { createSelector } from 'reselect';

export const getEditContact = (state:AppStateType) => state.phone.editContact
export const getContacts =  (state:AppStateType) => state.phone.contacts.items
export const getFilter = (state:AppStateType) => state.phone.contacts.filter
export const getError = (state:AppStateType) => state.phone.error
export const getLoading = (state: AppStateType) => state.phone.isFetch
export const getSuccess = (state: AppStateType) => state.phone.success
export const filterContact = createSelector(
    [getContacts, getFilter], (contacts, filter) => {
        return contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    }
)


