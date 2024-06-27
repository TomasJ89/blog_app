
import React from 'react';
import {useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore";

const Toolbar = () => {
    const nav = useNavigate();
    const {loggedIn, setLoggedIn, setFavorites, setIndex, setFilter, setText,favorites} = mainStore();

    function logout() {
        localStorage.removeItem("secretKey");
        localStorage.removeItem("loggedIn");
        setFavorites([]);
        setLoggedIn(null);
        nav('/');
    }

    return (
        <div className={"d-flex justify-content-between p-2 text-center border bgColor"}>
            <div className={"d-flex gap-2"}>
                <button className={"btn btn-outline-dark"} onClick={() => {
                    setIndex(null);
                    setFilter(false);
                    nav("/");
                }}>Home</button>

                {loggedIn && <button className={"btn btn-outline-dark"} onClick={() => {
                    setText("");
                    nav("/createPost");
                }}>Create Post</button>}

                {loggedIn && <button className={"btn btn-outline-dark"} onClick={() => {
                    setText("");
                    nav("/favorites");
                }}>Favorites: ({favorites.length})</button>}
            </div>

            <div className={"d-flex gap-2"}>
                {!loggedIn && <button className={"btn btn-outline-dark"} onClick={() => {
                    setText("");
                    nav("/register");
                }}>Register</button>}
                {!loggedIn && <button className={"btn btn-outline-dark"} onClick={() => {
                    setText("");
                    nav("/login");
                }}>Login</button>}
                {loggedIn && <div className="d-flex align-items-center">logged in as:
                    <b className="px-2">{loggedIn}</b></div>}
                {loggedIn && <button className={"btn btn-outline-dark"} onClick={logout}>Logout</button>}
            </div>
        </div>
    );
};

export default Toolbar;