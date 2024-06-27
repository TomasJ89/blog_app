import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../plugins/http";
import mainStore from "../store/mainStore";


const RegisterPage = () => {
    const {text,setText} = mainStore()
    const nameRef = useRef()
    const passRef = useRef()
    const passTwoRef = useRef()
    const nav = useNavigate()

    async function login() {
        const user = {
            name: nameRef.current.value,
            passwordOne: passRef.current.value,
            passwordTwo: passTwoRef.current.value
        }

        const res = await http.post("/createaccount", user)
        if (res.success) {
            nav("/login")
            setText("")
        } else {
            setText(res.message)
        }

    }

    return (
        <div className={"d-flex flex-column gap-1 w-25 p-3 border"}>
            <input ref={nameRef} type="text" placeholder="username"/>
            <input ref={passRef} type="password" placeholder="password one"/>
            <input ref={passTwoRef} type="password" placeholder="password two"/>
            <p className="error">{text}</p>
            <button className="btn btn-primary" onClick={login}>Register</button>
        </div>
    );
};

export default RegisterPage;