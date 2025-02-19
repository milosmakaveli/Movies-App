import { useState, useEffect } from "react";
import { API_KEY } from "../config";
import './MovieList.css'
import MovieCard from "./MovieCard";

export default function MovieList({searchInput}){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popularMovies, setPopularMovies] = useState([]);



    //Fetching Popular Movies on Inital Load
    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://www.omdbapi.com/?s=popular&apikey=${API_KEY}`);
                const data = await res.json();
                if(data.Search) {
                    setPopularMovies(data.Search); //Setting currently popular movies
                }
            }catch(err) {
                console.error('Error while fetching popular movies:', err)
            }finally {
                setLoading(false)
            }
        }

        fetchPopularMovies();
    }, [])


    //Fetching movies that match user input
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
         try{
            const res = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`);
            const data = await res.json()
            setMovies(data.Search || [])
         }catch(err){
          console.error("Error ocurred while fetching search results:", err)
         }finally{
            setLoading(false)
         }
        };
        if(searchInput) {
            fetchMovies();
        }else {
            setMovies(popularMovies);
        }
    }, [searchInput, popularMovies])

    return (
        <>
            <div className="movie-list">
                {loading ? (
                    <span className="loading-spinner"></span>
                ): (
                    movies?.map(movie => <MovieCard key={movie.imdbID} movie={movie}/>)
                )}
            </div>
        
        
        </>
    )

}


