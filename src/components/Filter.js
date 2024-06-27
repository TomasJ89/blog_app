import React, {useRef} from 'react';
import mainStore from "../store/mainStore";

const Filter = () => {
    const {allPosts, setFilteredPosts, setFilter} = mainStore();

    const refs = {
        dateFrom: useRef(),
        dateTo: useRef(),
        name: useRef(),
        title: useRef(),
    };

    function filterItems() {
        let posts = [...allPosts];
        console.log(posts);

        const params = {
            dateFrom: refs.dateFrom.current.value,
            dateTo: refs.dateTo.current.value,
            name: refs.name.current.value,
            title: refs.title.current.value,
        };

        if (!params.dateFrom && !params.dateTo && !params.name && !params.title) return;

        if (params.dateFrom) {
            const dateFrom = new Date(params.dateFrom);
            posts = posts.filter(x => new Date(x.timestamp) >= dateFrom);
        }
        if (params.dateTo) {
            const dateTo = new Date(params.dateTo);
            posts = posts.filter(x => new Date(x.timestamp) <= dateTo);
        }

        if (params.name) {
            posts = posts.filter(x => x.username.toLowerCase() === params.name.toLowerCase());
        }
        if (params.title) {
            posts = posts.filter(x => x.title.toLowerCase().includes(params.title.toLowerCase()));
        }

        posts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setFilter(true);
        setFilteredPosts(posts);
    }

    function resetFilter() {
        setFilter(false);
        setFilteredPosts(allPosts);
        refs.dateFrom.current.value = "";
        refs.dateTo.current.value = "";
        refs.name.current.value = "";
        refs.title.current.value = "";
    }

    return (
        <div className="border p-2 bgColor">
            <h5>Filter </h5>
            <div className="d-flex mb-3 gap-2">
                <div>
                    <div>
                        Date from:
                    </div>
                    <input ref={refs.dateFrom} type="date" placeholder="date from"/>
                    <div>
                        Date to:
                    </div>
                    <input ref={refs.dateTo} type="date" placeholder="date to"/>
                </div>
                <div>
                    <div>
                        Filter by name
                    </div>
                    <input ref={refs.name} type="text" placeholder="username"/>
                    <div>
                        Filter by title
                    </div>
                    <input ref={refs.title} type="text" placeholder="title"/>
                </div>
            </div>
            <button className="btn btn-dark mx-1" onClick={filterItems}>Filter</button>
            <button className="btn btn-dark" onClick={resetFilter}>Reset Filter</button>
        </div>
    );
};

export default Filter;