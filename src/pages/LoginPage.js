import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import mainStore from "../store/mainStore";
import http from "../plugins/http";

const LoginPage = () => {
    const nameRef = useRef();
    const passRef = useRef();
    const nav = useNavigate();
    const {text, setText, setLoggedIn, setIndex, setFavorites} = mainStore();

    async function login() {
        setText("");
        const user = {
            name: nameRef.current.value,
            password: passRef.current.value
        };

        const res = await http.post("/login", user);

        if (res.success) {
            const secretKey = res.secretKey;
            localStorage.setItem("secretKey", secretKey);
            localStorage.setItem("loggedIn", user.name);
            setLoggedIn(user.name);
            const savedFavorites = localStorage.getItem(`favorites_${user.name}`);
            setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
            nav('/');
            setIndex(null);
            setText("")
        } else {
            setText(res.message);
        }
    }

    return (
        <div className={"d-flex flex-column p-2 gap-2 border w-25"}>
            <input ref={nameRef} type="text" placeholder="username"/>
            <input ref={passRef} type="password" placeholder="password"/>
            <p className="error">{text}</p>

            <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
    );
};

export default LoginPage;