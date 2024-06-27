
import React, { useEffect } from 'react';
import http from "../plugins/http";
import SinglePost from "../components/SinglePost";
import mainStore from "../store/mainStore";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import Filter from "../components/Filter";

const HomePage = () => {
    const { posts, setPosts, loggedIn, filteredPosts, setAllPosts, filter } = mainStore();
    const { page } = useParams();

    async function getAllPosts() {
        const res = await http.get("/getallposts");
        setAllPosts(res.data);
        const skipAmount = page ? 25 * (page - 1) : 0;
        const skipAmount1 = page ? 25 * page : 25;
        const data = res.data.reverse().slice(skipAmount, skipAmount1);
        setPosts(data);
    }

    useEffect(() => {
        getAllPosts();
    }, [page]);

    return (
        <div>
            {loggedIn && <Filter />}
            <h3 className="text-center mt-4">{!filter ? "All posts" : "Filtered Posts"}</h3>
            {!filter && <Pagination />}
            <div className={"d-flex justify-content-center flex-wrap gap-2 p-2"}>
                {filter ? (
                    filteredPosts.map((x) => <SinglePost post={x} key={x.id} />)
                ) : (
                    !posts ? <h1>Loading...</h1> : posts.map(x => <SinglePost post={x} key={x.id} />)
                )}
                {filteredPosts.length === 0 && filter && <h1>Not found anything... try again</h1>}
            </div>
            {!filter && <Pagination />}
        </div>
    );
};

export default HomePage;