import { Form } from "../assets/Components/From/Form";
import {MainContainer} from "../assets/Components/MeinContainer";
import {MineTitle} from "../assets/Components/MineTitle";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    getAuth,
    getErrors,
    getLoading,
    getLogin,
    getRememberMe
} from "../../redux/authReducer/authSelectors/authSelectors";
import { useHistory } from "react-router-dom";
import {Input} from "../assets/Components/From/Input";
import {yupResolver} from "@hookform/resolvers/yup";

import {PrimaryButton} from "../assets/Components/From/Button";
import {LoginDataType} from "../types/loginPage";
import {schema} from "./schema/schema";
import {loginUser} from "../../redux/authReducer/authReducer";
import React, {useEffect, useState} from "react";
import {alertMessage} from "../assets/Components/Alert/Alert";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {actions} from "../../redux/authReducer/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";



export const Login = () => {
    const {email, password }= useSelector(getLogin)
    const auth = useSelector(getAuth)
    const error = useSelector(getErrors)
    const remember = useSelector(getRememberMe)
    const loading = useSelector(getLoading)

    const dispatch = useDispatch()
    const history = useHistory()

   const [loginError, setLoginError] = useState(false)

    const onSubmit = (data: LoginDataType): void => {
        dispatch(loginUser(data))
    }

    useEffect(() => {
        if (error === 'Bad Request'){
            setLoginError(true)
            return;
        }
        if (error){
            alertMessage('error', error)
            return
        }
        if(auth?.auth){
            const message = `Welcome ${auth.user.name}`
            alertMessage('success', message)
            history.push(`${auth.user.name}/contacts`)
            return
        }

    },[auth,error])
    const clearLoginError  = () => {
        if (!loginError) return
        setLoginError(false)
    }

    const {register, handleSubmit,formState: { errors }} = useForm({
        defaultValues: {email, password},
        mode: "onBlur",
        resolver: yupResolver(schema)

    })

    return <MainContainer>
        <MineTitle text='LOGIN' size='3rem' color='#3f51b5' component='h2'/>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('email')}
                id="email"
                type="email"
                label="Email"
                error={ !!errors.email || loginError}
                helperText={loginError ? '': errors?.email?.message}
                onFocus={clearLoginError}
                required
            />
            <Input
                {...register('password')}
                id="firsName"
                type="password"
                label="Password"
                error={!!errors.password || loginError}
                helperText={loginError ? 'password or email is not correct' : errors?.password?.message}
                onFocus={clearLoginError}
                required
            />
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        id='rememberMe'
                        value={remember}
                        onClick={() => dispatch(actions.rememberMe(!remember))}
                    />
                }
                label="Remember me"
            />
                <PrimaryButton
                    disabled={loading}
                >
                    {loading ? <CircularProgress color="primary" /> :
                    'login'
                    }
                </PrimaryButton>
        </Form>
    </MainContainer>
}