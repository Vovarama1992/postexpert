import {$api} from "@/lib";
import {MyAddressForm, Profile, ProfileForm, ResponseData} from "@/types";

const getProfile = async () => {
    const {data} = await $api.get<{
        data: Profile
    }>('/profile')

    return Promise.resolve(data.data)
}

const getAvatar = async () => {

    const {data} = await $api.get<string>('/avatar')

    return Promise.resolve(data)
}

const updateProfile = async (formValues: ProfileForm) => {

    const {data} = await $api.put<ResponseData>('/profile', formValues)

    return data
}

const updateAvatar = async (formData: FormData) => {

    return await $api.post('/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const updateMyAddress = async (formValues: MyAddressForm & {email: string} ) => {

    const {data} = await $api.put<ResponseData>('/profile', formValues)

    return data
}

const sendVerificationLink = async () => $api.get<ResponseData>('/email/send-verification-link')

export {getProfile, updateProfile, getAvatar, updateAvatar, sendVerificationLink, updateMyAddress}
