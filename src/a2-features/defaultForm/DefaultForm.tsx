import React, {ChangeEvent, FormEvent, useState} from 'react';
import SuperInput from "../../a1-main/b1-ui/superInputText/SuperInput";
import s from './DefaultForm.module.css'
import {useAppDispatch, useAppSelector} from "../../a1-main/b2-bll/store";
import {
    selectErrorDate,
    selectErrorEmail,
    selectErrorMessage,
    selectErrorName,
    selectErrorPhone, selectErrorSubmit,
    selectIsLoading,
    selectResponseServer,
} from "../../a1-main/b2-bll/selectors";
import {
    setErrorDate,
    setErrorEmail,
    setErrorMessage,
    setErrorName,
    setErrorPhone, setErrorSubmit,
    setLoadingApp,
    setResponseServer
} from "../../a1-main/b2-bll/formReducer";
import SuperTextArea from "../../a1-main/b1-ui/superTextArea/SuperTextArea";
import {validateDate, validateEmail, validateMessage, validateName} from "../../a1-main/b1-ui/util/validation";
import InputMask from "react-input-mask";
import SuperButton from "../../a1-main/b1-ui/SuperButton/SuperButton";


type FieldType = 'name' | 'email' | 'phone' | 'date' | 'message'


const DefaultForm = () => {

    const errorName = useAppSelector(selectErrorName)
    const errorEmail = useAppSelector(selectErrorEmail)
    const errorPhone = useAppSelector(selectErrorPhone)
    const errorDate = useAppSelector(selectErrorDate)
    const errorMessage = useAppSelector(selectErrorMessage)
    const errorSubmit = useAppSelector(selectErrorSubmit)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')


    const touchedHandler = (value: string, field: FieldType) => {
        if (value === '') {
            switch (field) {
                case 'name':
                    dispatch(setErrorName('Required'))
                    break
                case 'email' :
                    dispatch(setErrorEmail('Required'))
                    break
                case 'phone' :
                    dispatch(setErrorPhone('Required'))
                    break
                case 'date' :
                    dispatch(setErrorDate('Required'))
                    break
                case 'message' :
                    dispatch(setErrorMessage('Required'))
                    break
            }
        }
    }


    const onChangeNameToUpperCaseHandler = (name: string) => {
        let newName = name.toUpperCase().trimStart()
            .replace(/[^a-z\s]/gi, '');
        const splittedName = newName.split(' ');
        if (splittedName.length > 2) {
            newName = `${splittedName[0]} ${splittedName[1]}`
        }
        setName(newName)
    }

    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.currentTarget.value)
        dispatch(setErrorPhone(''))
    }


    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name === '' ||
            email === '' ||
            phone === '' ||
            date === '' ||
            message === '') {
            dispatch(setErrorSubmit('All fields are required'))
            return
        }
        if (
            errorMessage ||
            errorPhone ||
            errorDate ||
            errorName ||
            errorEmail
        ) {
            dispatch(setErrorSubmit('Please fill in the fields correctly'))
            return
        }

        //Данные для отправки на сервер собранные из формы
        const formData = {name, email, phone, date, message}
        dispatch(setLoadingApp(true))
        const promise = new Promise<{ success: string }>((resolve, reject) => {
            setTimeout(() => {
                let randomNumber = Math.random()
                if (randomNumber < 0.5) {
                    resolve({success: 'Form sent'})
                    setName('')
                    setEmail('')
                    setPhone('')
                    setDate('')
                    setMessage('')
                } else reject({error: 'Error, try again'})
            }, 1200);
        });
        promise.then((res) => dispatch(setResponseServer(res.success)))
        promise.catch((err) => dispatch(setResponseServer(err.error)))
        promise.finally(() => dispatch(setLoadingApp(false)))
    }

    return (
        <div>
            <h2>Feedback form</h2>
            <form className={s.formContainer} onSubmit={submitHandler}>
                <div className={s.formInputItem}>
                    <SuperInput placeholder={'Name'}
                                type={'text'}
                                value={name}
                                onBlur={(e) => touchedHandler(e.currentTarget.value, 'name')}
                                onChangeText={onChangeNameToUpperCaseHandler}
                                validate={validateName}/>
                    {errorName && <div className={s.errorField}>{errorName}</div>}

                </div>
                <div className={s.formInputItem}>
                    <SuperInput placeholder={'Email'}
                                type={'text'}
                                value={email}
                                onBlur={(e) => touchedHandler(e.currentTarget.value, 'email')}
                                onChangeText={setEmail}
                                validate={validateEmail}/>
                    {errorEmail && <div className={s.errorField}>{errorEmail}</div>}
                </div>
                <div className={s.formInputItem}>
                    <InputMask placeholder={'+7 (999) 999-99-99'}
                               type={'tel'}
                               value={phone}
                               mask='+7 (999) 999-99-99'
                               className={s.mask}
                               onBlur={(e) => touchedHandler(e.currentTarget.value, 'phone')}
                               onChange={onChangePhone}
                    />
                    {errorPhone && <div className={s.errorField}>{errorPhone}</div>}
                </div>

                <div className={s.formInputItem}>
                    <SuperInput placeholder={'date'}
                                type={'date'}
                                value={date}
                                max={'2999-12-31'}
                                validate={validateDate}
                                onBlur={(e) => touchedHandler(e.currentTarget.value, 'date')}
                                onChangeText={setDate}/>
                    {errorDate && <div className={s.errorField}>{errorDate}</div>}
                </div>
                <div className={s.formInputItem}>
                    <SuperTextArea
                        placeholder={'Please, enter you\'r message'}
                        validate={validateMessage}
                        value={message}
                        onBlur={(e) => touchedHandler(e.currentTarget.value, 'message')}
                        onChangeText={setMessage}/>
                    {errorMessage ? <div className={s.errorField}>{errorMessage}</div> : ''}
                </div>
                <div>
                    {errorSubmit && <div className={s.errorAllField}>{errorSubmit}</div>}
                    <SuperButton/>
                </div>
            </form>
        </div>
    );
};

export default DefaultForm;