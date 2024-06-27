import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore";


const Pagination = () => {
    const {index,pages,setPages, allPosts, setIndex} = mainStore()
    const nav = useNavigate()


    useEffect(() => {
        if(allPosts) {
            const totalPages = Math.ceil(allPosts.length / 25)
            setPages(totalPages)
        }

    }, [allPosts])

    function goTo(page) {
        if(page === 1) {
            setIndex(0)
            return nav('/')
        } else {
            nav('/page/'+page)
        }
        setIndex(page-1)

    }

    return (
        <div className="d-flex gap-1 mt-3">
            {Array.from(Array(pages).keys()).map((x, i) =>
                <div className={`page p-2 border ${i === index ? 'select' : ''}`}
                     onClick={() => goTo(x + 1)} key={i}>{x + 1}</div>)}
        </div>
    );
};

export default Pagination;