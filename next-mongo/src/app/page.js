import { getMovies } from "@lib/mongo/movies";
import styles from "./page.module.css";
import { use } from "react";

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
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
