import React, {ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes} from 'react';
import s from './SuperTextArea.module.css'
import {useAppDispatch} from "../../b2-bll/store";
import {Dispatch} from "redux";
import {setErrorSubmit} from "../../b2-bll/formReducer";

type DefaultInputPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
type SuperTextAreaPropsType = DefaultInputPropsType & {
    validate?: (value: string, dispatch: Dispatch) => void
    onChangeText?: (value: string) => void
}
const SuperTextArea: React.FC<SuperTextAreaPropsType> = ({onChange, onChangeText, validate, ...restProps}) => {
    const dispatch = useAppDispatch()
    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange
        && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
        validate && validate(e.currentTarget.value, dispatch)
        dispatch(setErrorSubmit(''))
    }


    return (
        <div className={s.inputContainer}>
            <textarea
                className={s.area}
                onChange={onChangeCallback}
                {...restProps}
            />
        </div>
    );
};

export default SuperTextArea;