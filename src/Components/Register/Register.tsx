import { Form } from "../assets/Components/From/Form";
import {MainContainer} from "../assets/Components/MeinContainer";
import {MineTitle} from "../assets/Components/MineTitle";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getErrors, getLoading, getRegister, getResponse} from "../../redux/authReducer/authSelectors/authSelectors";
import { useHistory } from "react-router-dom";
import {Input} from "../assets/Components/From/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {PrimaryButton} from "../assets/Components/From/Button";
import {RegistrationType} from "../types/registerPage";
import React, {useEffect, useState} from "react";
import {registerUser} from "../../redux/authReducer/authReducer";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {schema} from "./schema/schema";
import {alertMessage} from "../assets/Components/Alert/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Register = () => {
    const registration = useSelector(getRegister)
    const { email, password, confirmPassword, name}= registration;
    const errorRequest = useSelector(getErrors)
    const responseAfterRegistration = useSelector(getResponse)
    const loading = useSelector(getLoading)


    const dispatch = useDispatch()
    const history = useHistory()

    const [remember, setRemember] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [emailValidation, setEmailValidation] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)

    const {register, handleSubmit,formState: { errors }} = useForm({
        defaultValues: {email, password, confirmPassword, name},
        mode: "onBlur",
        resolver: yupResolver(schema)
    })



    const onSubmit = (data: RegistrationType): void => {
        if (data.password !== data.confirmPassword){
            setErrorPassword(true)
        }else {
            setErrorPassword(false)
            const newData = {name: data.name, password: data.password, email: data.email, rememberMe: remember}
            setEmailValidation(data.email)
            dispatch(registerUser(newData))
        }
    }
    useEffect(() => {
        if(errorRequest === emailValidation){
            console.log('email is not correct')
            setErrorEmail(true)
            return
        }
        if(errorRequest){
          alertMessage('error', errorRequest)
        }
        if(responseAfterRegistration){
            const newMessage = `user - ${responseAfterRegistration.user.name} was create`
            alertMessage('success', newMessage)
            history.push('/login')
        }
    },[errorRequest, responseAfterRegistration, emailValidation])

    const clearErrorEmail = () => {
        if (!errorEmail) return
        setErrorEmail(false)
    }
    return <MainContainer>
        <MineTitle text='Registration' size='3rem' color='#3f51b5' component='h2'/>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('name')}
                id="name"
                type="text"
                label="Name"
                error={ !!errors.name}
                helperText={errors?.name?.message}
                required
            />
            <Input
                {...register('email')}
                id="email"
                type="email"
                label="Email"
                onFocus={clearErrorEmail}
                error={ !!errors.email || errorEmail}
                helperText={errorEmail ? 'Пользователь с такой почтой уже зарегистрирован': errors?.email?.message}
                required
            />
            <Input
                {...register('password')}
                id="firsName"
                type="password"
                label="Password"
                error={!!errors.password || errorPassword}
                helperText={errorPassword ? "Passwords do't match" : errors?.password?.message}
            />
            <Input
                {...register('confirmPassword')}
                id="passwordRepeat"
                type="password"
                label="Password"
                error={!!errors.confirmPassword || errorPassword}
                helperText={errorPassword ? "Passwords do't match" : errors?.confirmPassword?.message}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        id='rememberMe'
                        value={remember}
                        onClick={() => setRemember(prevState => !prevState)}
                    />
                }
                label="Remember me"
            />
            <PrimaryButton
                disabled={loading}
            >
                {loading ? <CircularProgress color="primary" /> :
                    'Registration'
                }
            </PrimaryButton>
        </Form>
    </MainContainer>
}