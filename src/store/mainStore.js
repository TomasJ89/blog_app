import {create} from "zustand";
const useStore = create((set,get) => ({
    allPosts:0,
    posts:null,
    post:null,
    pages: 0,
    loggedIn: null,
    favorites:[],
    index:null,
    text:"",
    filteredPosts:[],
    filter:false,
    setFilter: val => set ({filter:val}),
    setFilteredPosts: val => set ( {filteredPosts:val}),
    setText: val => set ({text:val}),
    setIndex: val => set ( { index:val}),
    setFavorites: val => set({favorites:val}),
    setLoggedIn: val => set({loggedIn:val}),
    setAllPosts: val => set({allPosts:val}),
    setPosts: val => set({posts:val}),
    setPost: val => set({post:val}),
    setPages: val => set({pages:val}),


}))

export default useStore