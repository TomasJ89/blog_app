
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import FavoritePage from "./pages/FavoritePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SingleUserPostPage from "./pages/SingleUserPostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import UserPostsPage from "./pages/UserPostsPage";
import Toolbar from "./components/Toolbar";
import mainStore from "./store/mainStore";
import {useEffect} from "react";

function App() {
    const {setLoggedIn, setFavorites} = mainStore();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedIn");
        if (loggedInUser) {
            setLoggedIn(loggedInUser);
            const savedFavorites = localStorage.getItem(`favorites_${loggedInUser}`);
            setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        }
    }, [setLoggedIn, setFavorites]);

    return (
        <div className={"p-5 d-flex flex-column gap-2"}>
            <BrowserRouter>
                <Toolbar/>
                <div className="d-flex justify-content-center">
                    <Routes>
                        <Route element={<HomePage/>} path="/"/>
                        <Route element={<HomePage/>} path="/page/:page"/>
                        <Route element={<UserPostsPage/>} path="/userposts/:name"/>
                        <Route element={<SingleUserPostPage/>} path="/userpost/:name/:id"/>
                        <Route element={<RegisterPage/>} path="/register"/>
                        <Route element={<LoginPage/>} path="/login"/>
                        <Route element={<CreatePostPage/>} path="/createPost"/>
                        <Route element={<UpdatePostPage/>} path="/updatePost"/>
                        <Route element={<FavoritePage/>} path="/favorites"/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
