import express from "express";
import {addToWatchList,removeFromWatchlist,updateWatchlistItem} from "../controllers/watchlistcontroller.js"
import { authmiddleware } from "../middleware/authmiddleware.js";
import { validateRequest } from "../middleware/validaterequest.js";
import { addToWatchListSchema } from "../validators/watchlistvalidators.js";
import { updateWatchlistItemSchema } from "../validators/watchlistvalidators.js";
const router = express.Router()

router.use(authmiddleware)

router.post("/",validateRequest(addToWatchListSchema),addToWatchList);
router.put("/:id", validateRequest(updateWatchlistItemSchema),updateWatchlistItem);
router.delete("/:id",validateRequest(),removeFromWatchlist);


export default router;