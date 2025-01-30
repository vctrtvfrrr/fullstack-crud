"use client";

import { FormEvent, useState } from "react";
import { saveSong } from "../_actions/save-song";

export default function SongUploadForm({
  closeAction,
}: Readonly<{ closeAction: () => void }>) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumYear, setAlbumYear] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [poster, setPoster] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !title ||
      !artist ||
      !albumTitle ||
      !albumYear ||
      !cover ||
      !poster ||
      !audio
    ) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("albumTitle", albumTitle);
    formData.append("albumYear", albumYear);
    formData.append("cover", cover);
    formData.append("poster", poster);
    formData.append("audio", audio);

    const response = await saveSong(formData);

    if (response.saved) {
      closeAction();
    } else {
      setMessage("Error uploading song. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col p-6">
        <h4 className="text-2xl mb-1 font-semibold text-neutral-700">
          Add New Song
        </h4>
        <p className="mb-3 mt-1 text-neutral-400">
          Enter or edit each information for the song.
        </p>

        {message && (
          <p className="mt-2 text-sm text-center text-red-500">{message}</p>
        )}

        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            placeholder="Enter the song title"
            required
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">Artist</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            placeholder="Enter the song artist"
            required
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">
            Album Title
          </label>
          <input
            type="text"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            placeholder="Enter the album title"
            required
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">
            Album Year
          </label>
          <input
            type="number"
            value={albumYear}
            onChange={(e) => setAlbumYear(e.target.value)}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            placeholder="Enter the album year"
            required
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">
            Album Cover
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) setCover(e.target.files[0]);
            }}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            required
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">
            Artist Poster
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) setPoster(e.target.files[0]);
            }}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            required
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px] mt-4">
          <label className="block mb-1 text-sm text-neutral-700">
            Audio Track
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              if (e.target.files) setAudio(e.target.files[0]);
            }}
            className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
            required
          />
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex space-x-2">
          <button
            type="button"
            className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={closeAction}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full mx-auto select-none rounded bg-neutral-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-neutral-900/10 transition-all hover:shadow-lg hover:shadow-neutral-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
