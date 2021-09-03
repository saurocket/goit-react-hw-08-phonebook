import Button from "@material-ui/core/Button";
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {createStyles, IconButton, makeStyles, Theme} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import {useDispatch, useSelector} from "react-redux";
import {getInfo, logOut} from "../../../redux/authReducer/authReducer";
import {getAuth, getErrors, getInformation} from "../../../redux/authReducer/authSelectors/authSelectors";
import {alertMessage} from "../../assets/Components/Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        settingsButtons: {
            color: 'white'
        },
    }),
);


export const ButtonInformation = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const auth = useSelector(getAuth)
    const error = useSelector(getErrors)
    const information = useSelector(getInformation)

    const onInformation = () => {
        dispatch(getInfo())
    }



    useEffect(() => {
        if (error){
            alertMessage('error', error)
        }
        if(!auth){
            localStorage.removeItem('auth')
            history.push('/')
            alertMessage('success', 'logOut is success')
        }

    },[auth, error])

    useEffect(()=> {
        if (information){
            alertMessage('success', '', true, information)
        }

    },[information])


    return (<div>
        <Button
            color="inherit"
            onClick={()=> dispatch(logOut())}
        >
            Log out
        </Button>
        <IconButton
            aria-label="settings"
            className={classes.settingsButtons}
            onClick={onInformation}
        >
            <SettingsIcon/>
        </IconButton>
    </div>)


}