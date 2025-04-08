import clientPromise from ".";

let client;
let db;
let movies;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;

    // Debug: List all available databases
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();
    console.log(
      "Available databases:",
      dbList.databases.map((db) => db.name)
    );

    db = await client.db("sample_mflix");
    movies = await db.collection("movies");
  } catch (error) {
    console.error("Init error:", error);
    throw new Error("Failed to connect to the database");
  }
}

(async () => {
  await init();
})();

export async function getMovies() {
  try {
    if (!movies) await init();

    // Add debug logging
    console.log("Database connection:", !!db);
    console.log("Movies collection:", !!movies);

    const result = await movies.find({}).limit(10).toArray();

    console.log("Query result:", result);

    return { movies: result };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error(`Failed to fetch movies: ${error.message}`);
  }
}
