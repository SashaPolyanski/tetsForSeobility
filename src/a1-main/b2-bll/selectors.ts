import {AppRootStateType} from "./store";

export const selectIsLoading = (state: AppRootStateType) => state.form.loadingApp
export const selectErrorName = (state: AppRootStateType) => state.form.errorName
export const selectErrorEmail = (state: AppRootStateType) => state.form.errorEmail
export const selectErrorPhone = (state: AppRootStateType) => state.form.errorPhone
export const selectErrorDate = (state: AppRootStateType) => state.form.errorDate
export const selectErrorMessage = (state: AppRootStateType) => state.form.errorMessage
export const selectResponseServer = (state: AppRootStateType) => state.form.responseServer
export const selectErrorSubmit = (state: AppRootStateType) => state.form.errorSubmit
