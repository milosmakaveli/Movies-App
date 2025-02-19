import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { API_KEY } from "../config";
import './MovieDetails.css'
export default function MovieDetails(){
  const { imdbID } = useParams(); // Get the movie's imdbID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`,
        );
        const data = await response.json();
        setMovieDetails(data); // Set the movie details from the API response
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div>Loading movie details...</div>
      </div>
    );
  }

  if (!movieDetails) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-header">
        <img
          src={movieDetails.Poster}
          alt={movieDetails.Title}
          className="movie-details-image"
        />
        <div className="movie-details-info">
          <h2>{movieDetails.Title}</h2>
          <p>
            <strong>Year:</strong> {movieDetails.Year}
          </p>
          <p>
            <strong>Genre:</strong> {movieDetails.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movieDetails.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movieDetails.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {movieDetails.Plot}
          </p>
        </div>
      </div>
      <a href="/" className="back-to-home">
        Back to Home
      </a>
    </div>
  );
};


