import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { getSongs } from "./_repositories/songs";
import FavoriteButton from "./components/FavoriteButton";

export const metadata: Metadata = {
  title: "Your Library",
  description: "Songs added to your library.",
};

export default async function HomePage() {
  const songs = await getSongs();

  function makeSlug(artist: string, title: string) {
    return `/${slugify(artist)}/${slugify(title)}`;
  }

  return (
    <div>
      <h2 className="font-semibold text-3xl">{metadata.title?.toString()}</h2>
      <p className="leading-5 mt-3 opacity-50">
        You have {songs.length} songs in your library
      </p>

      <ul className="mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {songs.map((song, index) => (
          <li key={index} className="bg-neutral-800 rounded-md overflow-hidden">
            <Link href={makeSlug(song.artist, song.title)}>
              <Image
                priority
                src={`/assets/images/${song.cover}`}
                alt={`${song.title} by ${song.artist}`}
                className="w-full"
                width={200}
                height={200}
              />
            </Link>
            <div className="relative p-4">
              <h3 className="text-lg leading-5 font-semibold">
                <Link href={makeSlug(song.artist, song.title)}>
                  {song.title}
                </Link>
              </h3>
              <p className="text-neutral-500 text-xs font-semibold mt-3">
                {song.artist}
              </p>
              <div className="absolute bottom-4 right-4">
                <FavoriteButton song={song.id} isFavorite={song.favorite} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
