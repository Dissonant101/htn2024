import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const get = query({
  args: {},
  handler: async (ctx) => {
    const coordinates = await ctx.db.query("coordinates").take(100);
    return coordinates;
  },
});

const add = mutation({
  args: { lat: v.number(), long: v.number() },
  handler: async (ctx, { lat, long }) => {
    const coordinate = await ctx.db.insert("coordinates", { lat, long });
    return coordinate;
  },
});

const edit = mutation({
  args: { id: v.id("coordinates"), lat: v.number(), long: v.number() },
  handler: async (ctx, { id, lat, long }) => {
    const updatedCoordinate = await ctx.db.patch(id, {
      lat,
      long,
    });
    return updatedCoordinate;
  },
});

const remove = mutation({
  args: { id: v.id("coordinates") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export { get, add, edit, remove };