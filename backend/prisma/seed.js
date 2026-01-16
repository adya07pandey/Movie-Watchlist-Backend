import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const userId = "ead4e802-2836-40d0-8155-5fa3eda61604"

const movies = [
  {
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: userId
  },
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: userId
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/dark-knight.jpg",
    createdBy: userId
  },
  {
    title: "The Matrix",
    overview: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: userId
  },
  {
    title: "Fight Club",
    overview: "An insomniac office worker forms an underground fight club that evolves into something much more.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    posterUrl: "https://example.com/fight-club.jpg",
    createdBy: userId
  },
  {
    title: "Parasite",
    overview: "A poor family schemes to become employed by a wealthy household with unexpected consequences.",
    releaseYear: 2019,
    genres: ["Thriller", "Drama"],
    runtime: 132,
    posterUrl: "https://example.com/parasite.jpg",
    createdBy: userId
  },
  {
    title: "Gladiator",
    overview: "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama", "Adventure"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: userId
  },
  {
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://example.com/shawshank.jpg",
    createdBy: userId
  },
  {
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen intertwine in a series of unexpected and violent events.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://example.com/pulp-fiction.jpg",
    createdBy: userId
  },
  {
    title: "Blade Runner 2049",
    overview: "A young blade runner uncovers a secret that could plunge society into chaos.",
    releaseYear: 2017,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    runtime: 164,
    posterUrl: "https://example.com/blade-runner-2049.jpg",
    createdBy: userId
  }
];

const main = async () => {
    console.log("Seeding movies..");

    for(const movie of movies){
        await prisma.movie.create({
            data:movie,
        })
        console.log(`created movie ${movie.title}`);
    }

    console.log("Seeding Completed!");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});


