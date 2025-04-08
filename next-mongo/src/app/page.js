import { getMovies } from "@lib/mongo/movies";
import styles from "./page.module.css";
import { use } from "react";
import Image from "next/image";

async function fetchMovies() {
  const { movies } = await getMovies();
  if (!movies) {
    throw new Error("Failed to fetch movies");
  }
  return movies;
}

// console.log("Fetching movies...", movies);

export default function Home() {
  const movies = use(fetchMovies());

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie._id} className={styles.item}>
            <h2 className={styles.item}>{movie.title}</h2>
            {movie.poster && (
              <div className={styles.imageContainer}>
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className={styles.image}
                />
              </div>
            )}
            <p>{movie.plot}</p>
            <p>
              <strong>Cast:</strong> {movie.cast?.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
