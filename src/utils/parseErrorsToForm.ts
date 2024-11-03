import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";

const parseErrorsToForm = (e: any | AxiosError, setError: any, isMutation?: boolean) => {

    //isMutation - для мутаций react query

    if (axios.isAxiosError(e) || isMutation)  {

        if (e.response) {
            if (e.response.status === 422) {
                const data = e.response.data;

                if ('errors' in data) {
                    Object.keys(data.errors).forEach((key) => {
                        setError(key, { type: 'custom', message: data.errors[key] });
                    })
                }
            }
        }
    } else if (e?.message) {
        toast.error(e?.message);
    } else if (e?.data?.error) {
        toast.error(e?.data?.error);
    }
}

export {parseErrorsToForm}