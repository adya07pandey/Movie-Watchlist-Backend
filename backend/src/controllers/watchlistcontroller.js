import { prisma } from "../config/db.js";

export const addToWatchList = async (req, res) => {
  const { movieId, status, runtime, notes } = req.body;

  // 1. Verify movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // 2. Check if already in watchlist
  const existingInWatchList = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId:req.user.id,
        movieId,
      },
    },
  });

  if (existingInWatchList) {
    return res
      .status(400)
      .json({ error: "Movie already in the watchlist." });
  }

  
  // 3. Create watchlist item
  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId:req.user.id,
      movieId,
      status: status || "PLANNED",
      runtime,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: watchlistItem,
  });
};


export const removeFromWatchlist = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Movie not found in watchlist" });
  }

  
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

export const updateWatchlistItem = async (req, res) => {
  const { status, runtime, notes } = req.body;
  const { id } = req.params;

  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }


  const updatedItem = await prisma.watchlistItem.update({
    where: { id },
    data: {
      status,
      runtime,
      notes,
      updatedAt: new Date(),
    },
  });

  res.status(200).json({
    status: "success",
    data: updatedItem,
  });
};