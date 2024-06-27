import React from 'react';
import mainStore from "../store/mainStore";
import SinglePost from "../components/SinglePost";


const FavoritePage = () => {
    const {favorites} = mainStore()
    return (
        <div className="d-flex gap-2 flex-wrap ">
            {!favorites ? <h1>Loading...</h1> :favorites.map(x=> <SinglePost key={x.id} post={x}/>)}
        </div>
    );
};

export default FavoritePage;

