const initialState = {
    loadingApp: false,
    errorName: '',
    errorEmail: '',
    errorPhone: '',
    errorDate: '',
    errorMessage: '',
    errorSubmit: '',
    responseServer: '',
}


export const formReducer = (state = initialState, action: FormActionsType): InitialStateType => {
    switch (action.type) {
        case "FORM/SET-LOADING-APP":
            return {...state, loadingApp: action.payload.status}
        case "FORM/SET-ERROR-NAME" :
            return {...state, errorName: action.payload.error}
        case "FORM/SET-ERROR-EMAIL":
            return {...state, errorEmail: action.payload.error}
        case "FORM/SET-ERROR-PHONE":
            return {...state, errorPhone: action.payload.error}
        case "FORM/SET-ERROR-DATE":
            return {...state, errorDate: action.payload.error}
        case "FORM/SET-ERROR-MESSAGE":
            return {...state, errorMessage: action.payload.error}
        case 'FORM/SET-RESPONSE-SERVER':
            return {...state, responseServer: action.payload.value}
        case 'FORM/SET-ERROR-SUBMIT' :
            return {...state, errorSubmit: action.payload.value}

        default:
            return state
    }
}

//---- Actions
export const setLoadingApp = (status: boolean) => ({type: 'FORM/SET-LOADING-APP', payload: {status}} as const)
export const setErrorName = (error: string) => ({type: 'FORM/SET-ERROR-NAME', payload: {error}} as const)
export const setErrorEmail = (error: string) => ({type: 'FORM/SET-ERROR-EMAIL', payload: {error}} as const)
export const setErrorPhone = (error: string) => ({type: 'FORM/SET-ERROR-PHONE', payload: {error}} as const)
export const setErrorDate = (error: string) => ({type: 'FORM/SET-ERROR-DATE', payload: {error}} as const)
export const setErrorMessage = (error: string) => ({type: 'FORM/SET-ERROR-MESSAGE', payload: {error}} as const)
export const setResponseServer = (value: string) => ({type: 'FORM/SET-RESPONSE-SERVER', payload: {value}} as const)
export const setErrorSubmit = (value: string) => ({type: 'FORM/SET-ERROR-SUBMIT', payload: {value}} as const)

//---- Types
export type FormActionsType =
    setLoadingAppType
    | setErrorNameType
    | setErrorEmailType
    | setErrorPhoneType
    | setErrorDateType
    | setErrorMessageType
    | setResponseServerType
    | setErrorSubmitType
export type InitialStateType = typeof initialState
export type setLoadingAppType = ReturnType<typeof setLoadingApp>
export type setErrorNameType = ReturnType<typeof setErrorName>
export type setErrorEmailType = ReturnType<typeof setErrorEmail>
export type setErrorPhoneType = ReturnType<typeof setErrorPhone>
export type setErrorDateType = ReturnType<typeof setErrorDate>
export type setErrorMessageType = ReturnType<typeof setErrorMessage>
export type setResponseServerType = ReturnType<typeof setResponseServer>
export type setErrorSubmitType = ReturnType<typeof setErrorSubmit>
