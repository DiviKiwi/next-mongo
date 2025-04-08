import { getMovies } from "../../../lib/mongo/movies";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { movies, error } = await getMovies();
      if (error) {
        return res.status(500).json({ error: "Failed to fetch movies" });
      }
      return res.status(200).json({ movies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch movies" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(425).end(`Method ${req.method} Not Allowed`);
};

export default handler;
