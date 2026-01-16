import express from "express";

import {config} from "dotenv";
import {connectDB,disconnectDB} from "./config/db.js";


//ROUTES
import movies from "./routes/movies.js";
import authroutes from "./routes/authroutes.js";
import watchlistroutes from "./routes/watchlistroutes.js"

config();
connectDB();

const app = express()
app.use(express.json());
//body passing middlewares
app.use(express.urlencoded({extended:true}));

//API routes
app.use('/movies',movies);
app.use('/auth',authroutes);
app.use('/watchlist',watchlistroutes);


app.get('/hello',(req,res)=>{
    res.json({message:"Hello World"});
});




const PORT = 5000;
const server = app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`); 
});


// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandled Rejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
    await disconnectDB();
    process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
    await disconnectDB();
    process.exit(0);
    });
});

// GET, POST, PUT, DELETE
// http://localhost:5000
