import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './SuperInput.module.css'
import {useAppDispatch} from "../../b2-bll/store";
import {setErrorSubmit} from "../../b2-bll/formReducer";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    validate?: (value: string, dispatch: any) => void
}
const SuperInputText: React.FC<SuperInputTextPropsType> = ({
                                                               type,
                                                               validate,
                                                               value,
                                                               onChange,
                                                               onChangeText,
                                                               ...restProps
                                                           }) => {
    const dispatch = useAppDispatch()
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
        validate && validate(e.currentTarget.value, dispatch)
        dispatch(setErrorSubmit(''))
    }
    return (
        <div className={s.inputContainer}>
            <input
                type={type}
                value={value}
                className={s.input}
                onChange={onChangeCallback}
                {...restProps}
            />
        </div>
    );
};

export default SuperInputText;