import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import favoriteIcon from "../public/icons/heart.svg";
import coverPic from "../public/assets/images/amy-cover.jpeg";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Your Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className="font-semibold text-3xl">Your Library</h2>
      <p className="leading-5 mt-3 opacity-50">
        You have 10 songs in your library
      </p>

      <ul className="mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-8">
        {[...Array(10)].map((_, index) => (
          <li key={index} className="bg-neutral-800 rounded-md overflow-hidden">
            <Link href="/song-page">
              <Image
                src={coverPic}
                alt="Song Name by Artist Name"
                className="w-full"
              />
            </Link>
            <div className="relative p-4">
              <h3 className="text-lg leading-5 font-semibold">
                <Link href="/song-page">Song Page</Link>
              </h3>
              <p className="text-neutral-500 text-xs font-semibold mt-3">
                Artist Name
              </p>
              <button
                type="button"
                title="Favorite this song"
                className="focus:outline-none"
              >
                <Image
                  priority
                  src={favoriteIcon}
                  alt="Favorite icon"
                  className="absolute bottom-4 right-4"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
