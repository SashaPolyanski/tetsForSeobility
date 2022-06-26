import s from "./SuperButton.module.css";
import React from "react";
import {useAppSelector} from "../../b2-bll/store";
import {selectIsLoading, selectResponseServer} from "../../b2-bll/selectors";



const SuperButton = () => {
    const responseServer = useAppSelector(selectResponseServer)
    const loading = useAppSelector(selectIsLoading)
    return (
        <div>
            {loading ? <button disabled={loading} type="submit" className={`${s.button}  ${s.buttonLoading}`}>
                <span className={s.buttonText}>SEND FORM</span>
            </button> : <button type="submit" className={`${s.button}`}>
                <span className={s.buttonText}>SEND FORM</span>
            </button>}
            {responseServer === 'Form sent' ? <div className={s.responseSuccess}>{responseServer}</div> :
                <div className={s.responseError}>{responseServer}</div>}
        </div>
    );
};

export default SuperButton;
