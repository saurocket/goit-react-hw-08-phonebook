export type RegistrationType = {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export type NewDataRegistrationToThunk = {
    name: string
    email: string
    password: string
    rememberMe: boolean
}
export type RememberMeType = {
    email: string
    password: string
}
export type ResponseAfterRegistration = {
    user: {
        name: string,
        email: string,
    }
    token: string
}
