import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost";
import mainStore from "../store/mainStore";

const UserPostsPage = () => {
    const {posts,setPosts} = mainStore()
    const {name} = useParams()
    useEffect(() => {
        http.get("/getuserposts/" + name)
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
    }, [])
    return (

        <div className={"d-flex justify-content-center flex-wrap gap-2 p-5"}>
            {!posts ? <h1>Loading...</h1> :
                posts.map(x => <SinglePost
                    post={x}
                    key={x.id}/>)}
        </div>

    );
};

export default UserPostsPage;