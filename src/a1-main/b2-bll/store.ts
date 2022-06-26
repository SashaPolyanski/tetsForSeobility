import {combineReducers, legacy_createStore as createStore} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {FormActionsType, formReducer} from "./formReducer";
import {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    form: formReducer,

})

export const store = createStore(rootReducer)

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, FormActionsType>>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
// все типы экшенов для App
