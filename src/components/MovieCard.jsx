import { Link } from "react-router";
import './MovieCard.css'
export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
        <Link to={`/movie/${movie.imdbID}`} className="movie-card-link">
          <div className="movie-card-image-container">
            <img src={movie.Poster} alt={movie.Title} className="movie-image" />
          </div>
          <div className="movie-card-info">
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        </Link>
      </div>
    )
}