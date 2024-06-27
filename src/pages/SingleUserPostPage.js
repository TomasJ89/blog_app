import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/http";
import convert_date from "../plugins/timestamp";
import mainStore from "../store/mainStore";

const SingleUserPostPage = () => {
    const {name, id} = useParams()
    const {loggedIn, post, setPost,} = mainStore()
    const nav = useNavigate()

    useEffect(() => {
        http.get("/getsinglepost/" + name + "/" + id)
            .then(res => {
                console.log(res.data)
                setPost(res.data)
            })
    }, [])
    ;

    return (
        <div className="d-flex gap-2 p-2 border row">
            {post && (<>
                    <div className="col-5">
                        <img className="w-100" src={post.image} alt=""/>
                    </div>
                    <div className="col-5 flex1 overflow-hidden">
                        <h4>{post.title}</h4>
                        <h5 className="pointer"
                            onClick={() => {
                                nav("/userposts/" + post.username);
                            }}
                        >{post.username}</h5>
                        <div className="fontSize my-2">{convert_date(post.timestamp)}</div>
                        <p>{post.description}</p>
                        {loggedIn === post.username && <button
                            className="me-2"
                            onClick={() => {
                                nav("/updatePost");
                                setPost(post);
                            }}
                        >📝 Update</button>}

                    </div>

                </>
            )}
        </div>
    );
};

export default SingleUserPostPage;