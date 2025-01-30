import {
  boolean,
  integer,
  pgTable,
  serial,
  smallint,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  artist: varchar("artist", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  albumTitle: varchar("album_title", { length: 100 }),
  albumYear: smallint(),
  cover: varchar("cover", { length: 256 }),
  poster: varchar("poster", { length: 256 }),
  audio: varchar("audio", { length: 256 }),
  favorite: boolean().default(false).notNull(),
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  ...timestamps,
});

const relatedSongs = pgTable("related_songs", {
  id: serial("id").primaryKey(),
  songId: integer("song_id").references(() => songs.id),
  relatedSongId: integer("related_song_id").references(() => songs.id),
});

export { songs as songsTable, relatedSongs as relatedSongsTable };
