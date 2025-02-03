"use client";

import { songsTable } from "@/drizzle/schema";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useDebouncedCallback } from "use-debounce";
import { searchSongs } from "../_repositories/songs";

type Song = typeof songsTable.$inferSelect;

export default function Search() {
  const search = useRef<HTMLDivElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const $search = search.current;
    function handleClickOutside(event: MouseEvent) {
      if ($search && !$search.contains(event.target as Node)) {
        setSongs([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSearch(query: string) {
    const result = await searchSongs(query);
    setSongs(result);
  }

  const debounced = useDebouncedCallback(handleSearch, 200);

  return (
    <div ref={search}>
      <div className="relative bg-neutral-700 rounded-md p-2">
        <div className="flex">
          <PiMagnifyingGlass color="white" />
          <input
            type="text"
            placeholder="Search in your library"
            className="leading-5 text-white bg-neutral-700 ml-2 placeholder:text-white focus:outline-none"
            onFocus={(e) => handleSearch(e.target.value)}
            onChange={(e) => debounced(e.target.value)}
          />
        </div>
        {songs.length > 0 && (
          <ul className="absolute top-9 left-0 right-0 bg-neutral-700 rounded-md">
            {songs.map((song, index) => (
              <li
                key={index}
                className="p-2 border-b border-neutral-500 hover:text-neutral-300 last:border-b-0"
              >
                <Link href={song.slug}>{song.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
