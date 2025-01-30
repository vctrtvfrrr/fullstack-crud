"use server";

import { db } from "@/drizzle/db";
import { songsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function updateFavorite(songId: number, favorite: boolean) {
  try {
    const result = await db
      .update(songsTable)
      .set({ favorite })
      .where(eq(songsTable.id, songId))
      .returning({ favorite: songsTable.favorite });

    return result[0].favorite;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
