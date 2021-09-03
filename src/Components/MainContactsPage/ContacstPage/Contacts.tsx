import React, {useEffect, useMemo, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {ContactType} from "../MainPage";
import {filterContact, getLoading, getSuccess} from "../../../redux/phoneReducer/phoneSelectors/phoneSelectors";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../redux/phoneReducer/phoneReducer";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'

        },
    }),
);

type PropsTypes = {
    filter: string
    contacts: Array<ContactType>
    onDeleteContact: (id: string) => void
}

const contactsRender = (contacts:Array<ContactType>, filter:string,
                        filtredContacts: Array<ContactType>):Array<ContactType> => {
    if (filter) {
        return filtredContacts
    }
    return contacts
}



export const Contacts: React.FC<PropsTypes> = ({contacts, filter, onDeleteContact}) => {
    const classes = useStyles();
    const filtredContacts = useSelector(filterContact)
    const loading = useSelector(getLoading)
    const success = useSelector(getSuccess)


    const dispatch = useDispatch()
    const updateFilter = useMemo(()=>{
        return contactsRender(contacts,filter, filtredContacts)
    },[contacts,filter,filtredContacts])
    const [removeId, setRemoveId] = useState<null | string>(null)
    return (
        <div className={classes.root}>
            <List>
                {contactsRender.length > 0 && updateFilter.map(item => <ListItem key={item.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={item.number}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    disabled={loading && removeId === item.id}
                                    edge="start"
                                    aria-label="delete"
                                    onClick={() => {
                                        onDeleteContact(item.id)
                                        setRemoveId(item.id)
                                    }}
                                >
                                     <DeleteIcon color='secondary'/>
                                </IconButton>
                                <IconButton
                                    disabled={loading && removeId === item.id}
                                    edge="end"
                                    aria-label="update-contact"
                                    onClick={()=> dispatch(actions.editContact(item.id))}
                                >
                                    <EditIcon color='primary'/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
            </List>
        </div>
    );
}