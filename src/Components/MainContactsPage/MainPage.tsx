import React, {useEffect, useMemo, useState} from 'react'
import {Title} from "../assets/Components/Title";
import {Form} from "./From/From";
import {ContactsPage} from './ContacstPage/ContactsPage';
import {useDispatch, useSelector} from "react-redux";
import parsePhoneNumberFromString from "libphonenumber-js";
import {actions, deletePost, getDataContact, ItemPhoneType, postContact, updateContact} from "../../redux/phoneReducer/phoneReducer";
import {getContacts, getEditContact, getError, getFilter} from "../../redux/phoneReducer/phoneSelectors/phoneSelectors";
import Container from "@material-ui/core/Container";
import {createContactType} from "../types/APITypes";
import {getAuth} from "../../redux/authReducer/authSelectors/authSelectors";
import { useHistory } from 'react-router-dom';
import {EditContact} from "./EditContact/EditContact";
import {AuthType} from "../../redux/authReducer/authTypes";
import {alertMessage} from "../assets/Components/Alert/Alert";

export type ContactType = {
    id: string,
    name: string,
    number: string,
}


export type IState = {
    name: string
    number: string
}

export const MainPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const contacts = useSelector(getContacts)
    const filter = useSelector(getFilter)
    const error = useSelector(getError)
    const isAuth = useSelector(getAuth)
    const editContact = useSelector(getEditContact)

    const [state, setState] = useState<IState>({
        name: '',
        number: ''
    })
    const [auth, setAuth] = useState<null | AuthType>(isAuth)


    useEffect(() => {
        setAuth(isAuth)
        if(!auth){
            history.push('/')
        }

    },[isAuth])

    useEffect(() => {
        dispatch(getDataContact())
    },[])

    useMemo(() => {
        if (error) {
            alertMessage('error', error)
        }
    },[error])

    const onChangeName = (value: string) => {
        setState(prevState => {
            return {...prevState, name: value}
        })
    }
    const onChangePhone = (value: string) => {
        const normalizePhoneNumber = (value:string) => {
            const phoneNumber = parsePhoneNumberFromString(value)
            if (!phoneNumber){
                return value
            }
            return phoneNumber.formatInternational()
        }

        setState(preState => {
            return {...preState, number: normalizePhoneNumber(value)}
        })
    }
    const onChangeFilter = (value: string) => {
        dispatch(actions.filterContact(value))
    }
    const onSubmitForm =  (data: createContactType) => {
        dispatch(postContact(data))
    }

    const onDeleteContact = (id: string) => {
        dispatch(deletePost(id))

    }
    const onCheckContactList = (name: string) => {
        return (contacts.find(item => item.name === name))
    }
    const onSubmitEdit = (data:ItemPhoneType) => {
        dispatch(updateContact(data))
    }

    return (
        <Container fixed>
            <Title text='PhoneBook'/>
            {editContact ? <EditContact
                name={state.name}
                phone={state.number}
                onChangeName={onChangeName}
                onChangePhone={onChangePhone}
                onSubmitForm={onSubmitEdit}
                />
                : <Form
                    onCheckContactList={onCheckContactList}
                    onSubmitForm={onSubmitForm}
                    name={state.name}
                    phone={state.number}
                    onChangeName={onChangeName}
                    onChangePhone={onChangePhone}
                />
                }
            <ContactsPage
                onChangeFilter={onChangeFilter}
                contacts={contacts}
                onDeleteContact={onDeleteContact}
                filter={filter}
            />
        </Container>
    )

}