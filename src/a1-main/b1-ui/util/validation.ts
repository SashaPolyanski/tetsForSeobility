import {
    setErrorDate,
    setErrorDateType,
    setErrorEmail, setErrorEmailType,
    setErrorMessage,
    setErrorMessageType, setErrorName, setErrorNameType
} from "../../b2-bll/formReducer";
import {Dispatch} from "react";


export const validateName = (name: string, dispatch: Dispatch<setErrorNameType>) => {
    const reg = /^.{3,30} .{3,30}$/.test(name)
    name && reg ? dispatch(setErrorName('')) : dispatch(setErrorName('Min length name and lastName 3-30 characters'))
}
export const validateEmail = (email: string, dispatch: Dispatch<setErrorEmailType>) => {
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9]+.+.[A-Z]{2,4}$/i.test(email)
    email && reg ? dispatch(setErrorEmail('')) : dispatch(setErrorEmail('Please, enter a valid email'))
}
export const validateDate = (date: string, dispatch: Dispatch<setErrorDateType>) => {
    if (date) {
        const newDate = date.split('-').reverse().toString().replace(/\,/g, '-')
        const reg = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(newDate)
        newDate && reg ? dispatch(setErrorDate('')) : dispatch(setErrorDate('Please, enter a valid date'))
    }
}
export const validateMessage = (message: string, dispatch: Dispatch<setErrorMessageType>) => {
    if (message.length < 10 || message.length > 300) {
        dispatch(setErrorMessage('Min length message 10 characters of max length 300 characters'))
    } else dispatch(setErrorMessage(''))
}


