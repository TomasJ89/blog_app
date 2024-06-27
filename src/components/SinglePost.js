import React, {useEffect} from 'react';
import mainStore from "../store/mainStore";
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";
import convert_date from "../plugins/timestamp";

const SinglePost = ({post}) => {
    const {loggedIn, favorites, setFavorites, setPost, setIndex, setText, setFilter} = mainStore();
    const nav = useNavigate();

    function getAllUserPost() {
        nav("/userposts/" + post.username);
    }

    function getSingleUserPost() {
        nav("/userpost/" + post.username + "/" + post.id);
    }

    function addFavorite(post) {
        if (!favorites.some(favorite => favorite.id === post.id)) {
            const updatedFavorites = [...favorites, post];
            setFavorites(updatedFavorites);
            localStorage.setItem(`favorites_${loggedIn}`, JSON.stringify(updatedFavorites));
        } else {
            alert("Already Added");
        }
    }

    function removeFromFavorite(post) {
        const updatedFavorites = favorites.filter(x => x.id !== post.id);
        setFavorites(updatedFavorites);
        localStorage.setItem(`favorites_${loggedIn}`, JSON.stringify(updatedFavorites));
    }

    async function deletePost(data) {
        const user = {
            secretKey: localStorage.getItem("secretKey"),
            id: data.id
        };

        const res = await http.post("/deletepost", user);

        if (res.success) {
            nav('/');
            setIndex(null);
            setFilter(false);
        }
    }

    useEffect(() => {
        if (loggedIn) {
            const savedFavorites = localStorage.getItem(`favorites_${loggedIn}`);
            setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        }
    }, [loggedIn]);

    return (
        <div className="p-4 border postBox">
            <img className="pointer" onClick={getSingleUserPost} src={post.image} alt=""/>
            <h5 className="pointer mt-2" onClick={getSingleUserPost}>{post.title}</h5>
            <div className="pointer" onClick={getAllUserPost}>User: {post.username}</div>
            <p className="fw-lighter fontSize">{convert_date(post.timestamp)}</p>
            {post.username === loggedIn && (
                <>
                    <button
                        className="me-2"
                        onClick={() => {
                            nav("/updatePost");
                            setPost(post);
                            setText("");
                        }}
                    >📝 Update</button>
                    <button onClick={() =>{ deletePost(post); removeFromFavorite(post) }}>🚮 Delete</button>
                </>
            )}
            {loggedIn && (
                <>
                    {!favorites.some(favorite => favorite.id === post.id) ? (
                        <button className="m-2 btn btn-primary" onClick={() => addFavorite(post)}>➕ to fav</button>
                    ) : (
                        <button className="m-2 btn btn-danger" onClick={() => removeFromFavorite(post)}>➖ remove from fav</button>
                    )}
                </>
            )}
        </div>
    );
};

export default SinglePost;