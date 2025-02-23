"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieDetailView from "@/app/components/MovieDetailView";

interface MovieDetail {
    Title: string;
    Year: string;
    Plot: string;
    Ratings: { Source: string; Value: string }[];
}

export default function MovieDetailPage() {
    const params = useParams();
    const imdbID = params.imdbID as string; 

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=cd2aa4ca&i=${imdbID}&plot=full`);
                const data = await res.json();
                if (data.Response === "False") throw new Error(data.Error);
                setMovie(data);
            } catch (err) {
                setError("Movie not found");
            }
        }
        if (imdbID) {
            fetchMovie();
        }
    }, [imdbID]);

    if (error) return <p>{error}</p>;
    if (!movie) return <p>Loading...</p>;

    return <MovieDetailView movie={movie} />;
}
