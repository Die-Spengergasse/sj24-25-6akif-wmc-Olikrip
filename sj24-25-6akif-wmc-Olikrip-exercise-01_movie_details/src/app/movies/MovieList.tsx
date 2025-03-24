import { useRouter } from "next/navigation";
import styles from "./MovieList.module.css";
import { Movie } from "../types/Movie";

type MovieListProps = {
    movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
    const router = useRouter();

    return (
        <div className={styles.movielist}>
            <h2>{movies.length} movies found</h2>
            <div className={styles.movies}>
                {movies.map(movie => (
                    <div
                        key={movie.imdbID}
                        className={styles.movie}
                        onClick={() => router.push(`/movies/${movie.imdbID}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className={styles.moviePoster}>
                            <img src={movie.Poster} alt={movie.Title} />
                        </div>
                        <div className={styles.movieTitle}>{movie.Title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
