import {z} from 'zod'

export const addToWatchListSchema = z.object({
    movieId: z.string().uuid(),
    status:z.enum([ "PLANNED",  "WATCHING",  "COMPLETED", "DROPPED" ],
        {
            error: () =>({
                message:"Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
            })    
        }).optional(),

    runtime: z.coerce.number().int("Runtime must be integer").min(1,"runtime must be of atleast 1min").max(500).optional(),
    notes: z.string().optional(),
})

export const updateWatchlistItemSchema = z.object({
    status:z.enum([ "PLANNED",  "WATCHING",  "COMPLETED", "DROPPED" ],
        {
            error: () =>({
                message:"Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
            })    
        }).optional(),

    runtime: z.coerce.number().int("Runtime must be integer").min(1,"runtime must be of atleast 1min").max(500).optional(),
    notes: z.string().optional(),
})