import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";
import mainStore from "../store/mainStore";

const UpdatePostPage = () => {
    const{text,setText,post,setIndex,setFilter} = mainStore()
    console.log(post)
    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()

    const nav = useNavigate()

    useEffect(()=>{
        if(post){
            titleRef.current.value = post.title
            imageRef.current.value = post.image
            descriptionRef.current.value = post.description
        }
    },[post])

    async function update() {
        setText(null)
        const user = {
            secretKey: localStorage.getItem("secretKey"),
            title: titleRef.current.value,
            image: imageRef.current.value,
            description: descriptionRef.current.value,
            id:post.id

        }

        const res = await http.post("/updatepost", user)

        if(res.success) {
            nav('/')
            setIndex(null)
            setFilter(false)
            setText("")
        } else {
            setText(res.message)
        }
    }

    return (
        <div className={"d-flex flex-column p-3 border gap-2 w-25"}>
            <input ref={titleRef} type="text" placeholder="Title"/>
            <input ref={imageRef} type="url" placeholder="Image url"/>
            <textarea ref={descriptionRef} placeholder="Description"/>
            <p className="error">{text}</p>

            <button className="btn btn-primary" onClick={update}>Update</button>
        </div>
    );
};

export default UpdatePostPage;