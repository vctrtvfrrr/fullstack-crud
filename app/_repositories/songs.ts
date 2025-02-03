"use server";

import { db } from "@/drizzle/db";
import { songsTable } from "@/drizzle/schema";
import { asc, eq, ilike, isNull } from "drizzle-orm";

export async function getSongs() {
  return await db
    .select()
    .from(songsTable)
    .where(isNull(songsTable.deletedAt))
    .orderBy(asc(songsTable.artist), asc(songsTable.title));
}

export async function searchSongs(query: string) {
  const results = await db
    .select()
    .from(songsTable)
    .where(ilike(songsTable.title, `%${query}%`));

  console.log(results);

  return results;
}

export async function getSongById(id: number) {
  const result = await db
    .select()
    .from(songsTable)
    .where(eq(songsTable.id, id))
    .limit(1);

  return result[0];
}

export async function getSongBySlug(slug: string) {
  const result = await db
    .select()
    .from(songsTable)
    .where(eq(songsTable.slug, slug))
    .limit(1);

  return result[0];
}

export async function createSong(song: typeof songsTable.$inferInsert) {
  return await db.insert(songsTable).values(song).returning();
}

export async function updateSong(
  id: number,
  song: Partial<typeof songsTable.$inferSelect>
) {
  return await db
    .update(songsTable)
    .set(song)
    .where(eq(songsTable.id, id))
    .returning();
}

export async function deleteSong(id: number) {
  return await db
    .update(songsTable)
    .set({ updatedAt: new Date(), deletedAt: new Date() })
    .where(eq(songsTable.id, id));
}
