import Head from "next/head";
import Image from "next/image";
import AudioPlayer from "../_components/AudioPlayer";
import { getSongBySlug } from "../_repositories/songs";

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;
  const song = await getSongBySlug(slug.join("/"));

  return (
    <div>
      <Head>
        <title>
          {song.title} by {song.artist}
        </title>
      </Head>

      <div className="relative z-40 flex">
        {song.cover && (
          <Image
            src={`/assets/images/${song.cover}`}
            alt="Song Name by Artist Name"
            className="w-48 h-48 border border-neutral-600 rounded-md"
            width={192}
            height={192}
          />
        )}
        <AudioPlayer song={song} />
      </div>

      <div className="absolute top-0 left-0 z-30 bg-yankeesBlue w-full h-full">
        <div className="container relative">
          <Image
            src={`/assets/images/${song.poster}`}
            alt={song.artist}
            className="absolute top-28 right-0 opacity-80 !w-auto !h-auto"
            width={192}
            height={192}
          />
        </div>
      </div>
    </div>
  );
}
