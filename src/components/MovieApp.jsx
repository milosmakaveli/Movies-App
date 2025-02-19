import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa";
import './MovieApp.css'
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";

export default function MovieApp() {
 
    const [searchInput, setSearchInput] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });

    const location = useLocation();


    const handleSearch = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setSearchInput(formData.get("searchInput"));
    }

    const isMovieDetailsPage = location.pathname.includes("/movie/");

    const toggleTheme = () => {
        setIsDarkMode(prevState => !prevState);
    }


    //Applying Theme
    useEffect(() => {
        if(isDarkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        }else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode")
        }
    }, [isDarkMode])


    //Saving theme to localstorage
    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    }, [isDarkMode])


    return (
        <>
            <div className="app">
                <header className="app-header">
                    <div className="hero-banner">
                        <div className="hero-text-container">
                            <h1 className="hero-title">Movie Search App</h1>
                            <p className="hero-description">Find and explore movies from various genres</p>
                        </div>
                    </div>
                    {!isMovieDetailsPage && (
                        <form onSubmit={handleSearch} className="search-form">
                            <input type="text" name="searchInput" placeholder="Search for movies..." />
                            <button className="search-btn" type="submit">Search</button>
                            <button className="dark-mode-toggle" onClick={toggleTheme}>
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </button>
                        </form>
                    )}
                </header>
                <Routes>
                    <Route path="/" element={<MovieList searchInput={searchInput} />} />
                    <Route path="/movie/:imdbID" element={<MovieDetails />} />
                </Routes>
            </div>
        
        
        </>
    )
}



