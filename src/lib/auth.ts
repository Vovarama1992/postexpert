import {$api} from "@/lib";
import {ResponseData, User} from "@/types";

interface RegisterForm {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

interface ResetPasswordForm {
    token: string,
    email: string,
    password: string,
    password_confirmation: string
}

interface PasswordUpdateForm {
    password: string,
    password_confirmation: string,
    password_old: string,
}

interface LoginForm {
    email: string,
    password: string,
    remember: boolean;
}

interface RegisterResponseData extends ResponseData {
    user: User
}

interface MessageResponseData extends ResponseData {
    message: string
}

interface LoginResponseData extends ResponseData {
    user: User
}


const register = async (formValues: RegisterForm) => {

    const {data} = await $api.post<RegisterResponseData>('/register', formValues)

    return data
}

const confirmReset = async (formValues: ResetPasswordForm) => {

    const {data} = await $api.post<MessageResponseData>('/password/reset', formValues)

    return data
}

const updatePassword = async (formValues: PasswordUpdateForm) => {

    const {data} = await $api.post<MessageResponseData>('/password/update', formValues)

    return data
}

const reset = async ({email}: { email: string }) => {

    const {data} = await $api.post<MessageResponseData>('/password/send-reset-link', {email})

    return data

}

const logout = async () => {
    return await $api.get('/logout')
}


export type {RegisterForm, LoginForm, LoginResponseData, ResetPasswordForm, PasswordUpdateForm}
export {register, logout, reset, confirmReset, updatePassword}
