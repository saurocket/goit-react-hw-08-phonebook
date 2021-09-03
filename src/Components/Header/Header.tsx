import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import {MineTitle} from "../assets/Components/MineTitle";
import { ButtonsAuth } from './ButtonsAuth/ButtonsAuth';
import {useSelector} from "react-redux";
import {getAuth} from "../../redux/authReducer/authSelectors/authSelectors";
import {ButtonInformation} from "./ButtonsAuth/ButtonInfotmation";
import {AuthType} from "../../redux/authReducer/authTypes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },

        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
           alignItems: 'center'
        },
    }),
);

export const Header = () =>  {
    const classes = useStyles()
    const history = useHistory()
    const auth = useSelector(getAuth)
    const [isAuth, setAuth] = useState<AuthType | null>(null)

    useEffect(() => {
        setAuth(auth)
    },[auth])


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button
                        variant='text'
                        color='inherit'
                        onClick={()=> history.push('/')}
                    >
                        <MineTitle
                            text='phonebook'
                            size='1.2rem'
                            color='white'
                            component='p'
                        />
                    </Button>
                    {isAuth ? <ButtonInformation/> : <ButtonsAuth/> }
                </Toolbar>
            </AppBar>
        </div>
    );
}