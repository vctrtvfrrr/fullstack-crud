"use server";

import { db } from "@/drizzle/db";
import { songs } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function updateFavorite(songId: number, favorite: boolean) {
  try {
    const result = await db
      .update(songs)
      .set({ favorite })
      .where(eq(songs.id, songId))
      .returning({ favorite: songs.favorite });

    return result[0].favorite;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
