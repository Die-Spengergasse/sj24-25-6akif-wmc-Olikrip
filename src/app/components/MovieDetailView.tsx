import styles from "./MovieDetailView.module.css";

interface MovieDetail {
    Title: string;
    Year: string;
    Plot: string;
    Ratings: { Source: string; Value: string }[];
}

export default function MovieDetailView({ movie }: { movie: MovieDetail }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{movie.Title} ({movie.Year})</h1>
            <p className={styles.text}>{movie.Plot}</p>  {}
            <h3>Ratings:</h3>
            <ul className={styles.ratingList}>  {}
                {movie.Ratings.map((rating, index) => (
                    <li key={index} className={styles.ratingItem}> {}
                        {rating.Source}: {rating.Value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
