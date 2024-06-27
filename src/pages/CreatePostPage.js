import React, {useRef} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore";

const CreatePostPage = () => {
    const {text,setText,setIndex} = mainStore()
    const nav = useNavigate()

    const titleRef =useRef()
    const imgRef =useRef()
    const descriptionRef =useRef()

    async function create() {
        setText(null)
        const user = {
            secretKey: localStorage.getItem("secretKey"),
            title: titleRef.current.value,
            image: imgRef.current.value,
            description: descriptionRef.current.value

        }

        const res = await http.post("/createpost", user)

        if(res.success) {
            nav('/')
            setIndex(null)
            setText(null)
        } else {
            setText(res.message)
        }
    }

    return (
        <div className={"d-flex flex-column p-3 border gap-2 w-25"}>
            <input ref={titleRef} type="text" placeholder="Title"/>
            <input ref={imgRef} type="url" placeholder="Image url"/>
            <textarea ref={descriptionRef}  placeholder="Description"/>
            <p className="error">{text}</p>

            <button className = "btn btn-primary" onClick={create}>Create</button>
        </div>
    );
};

export default CreatePostPage;