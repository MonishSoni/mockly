import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createNewRoom = mutation({
    args: {
        topic: v.string(),
        expertName: v.string(),
    },

    handler:async(ctx,args)=>{
         const result= await ctx.db.insert('DiscussionRoom',{
            topic:args.topic,
            expertName:args.expertName
         })


         return result
    }
})