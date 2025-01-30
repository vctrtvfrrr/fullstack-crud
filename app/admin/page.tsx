"use client";

import { songsTable } from "@/drizzle/schema";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PiMusicNotesPlusFill,
  PiNotePencilFill,
  PiTrashLight,
} from "react-icons/pi";
import FavoriteButton from "../_components/FavoriteButton";
import Modal from "../_components/Modal";
import { deleteSong, getSongs } from "../_repositories/songs";
import SongUploadForm from "./form";

type Song = typeof songsTable.$inferSelect;

export default function AdminPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>();

  async function fetchSongs() {
    const songs = await getSongs();
    setSongs(songs);
    setCurrentSong(undefined);
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  function openFormModal(song?: Song) {
    setCurrentSong(song);
    setIsFormModalOpen(true);
  }

  function openDeleteDialog(song: Song) {
    setCurrentSong(song);
    setIsDeleteDialogOpen(true);
  }

  async function handleDelete() {
    if (!currentSong) return;
    await deleteSong(currentSong.id);
    await fetchSongs();
    setIsDeleteDialogOpen(false);
    setCurrentSong(undefined);
  }

  return (
    <div>
      <div className="relative flex flex-col w-full h-full">
        <div className="relative mx-4 mt-4 overflow-hidden">
          <div className="flex items-center justify-between ">
            <div>
              <h3 className="text-lg font-semibold">Songs List</h3>
              <p className="text-neutral-400">Review each song before edit</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-neutral-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-neutral-700 focus:shadow-none active:bg-neutral-700 hover:bg-neutral-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => openFormModal()}
              >
                <PiMusicNotesPlusFill className="mr-1.5" />
                Add song
              </button>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-neutral-800 bg-neutral-950">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-neutral-400">
                    Song
                  </p>
                </th>
                <th className="p-4 border-y border-neutral-800 bg-neutral-950">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-neutral-400">
                    Album
                  </p>
                </th>
                <th className="p-4 border-y border-neutral-800 bg-neutral-950">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-neutral-400">
                    Poster
                  </p>
                </th>
                <th className="p-4 border-y border-neutral-800 bg-neutral-950">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-neutral-400">
                    Audio
                  </p>
                </th>
                <th className="p-4 border-y border-neutral-800 bg-neutral-950">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-neutral-400">
                    Favorite
                  </p>
                </th>
                <th className="p-4 border-y border-neutral-800 bg-neutral-950">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-neutral-400">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td className="p-4 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`/assets/images/${song.cover}`}
                        alt={song.title}
                        className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                        width={36}
                        height={36}
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-neutral-300">
                          {song.title}
                        </p>
                        <p className="text-sm text-neutral-400">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-neutral-300">
                        {song.albumTitle}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {song.albumYear}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    {song.poster ? (
                      <Image
                        src={`/assets/images/${song.poster}`}
                        alt={song.title}
                        className="relative inline-block h-9 w-9 object-contain object-center bg-white"
                        width={36}
                        height={36}
                      />
                    ) : (
                      <p className="text-sm text-neutral-400">No poster</p>
                    )}
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    {song.audio ? (
                      <audio controls>
                        <source src={`/assets/audio/${song.audio}`} />
                      </audio>
                    ) : (
                      <p className="text-sm text-neutral-400">No audio</p>
                    )}
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    <FavoriteButton song={song.id} isFavorite={song.favorite} />
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    <button
                      type="button"
                      className="rounded-md border border-transparent py-2 px-4 inline-flex items-center text-center text-sm transition-all text-neutral-600 hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => openFormModal(song)}
                    >
                      <PiNotePencilFill size={16} className="mr-1.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-transparent py-2 px-4 inline-flex items-center text-center text-sm transition-all text-red-600 hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => openDeleteDialog(song)}
                    >
                      <PiTrashLight size={16} className="mr-1.5" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isFormModalOpen}
        closeAction={() => setIsFormModalOpen(false)}
      >
        <SongUploadForm
          song={currentSong}
          closeAction={async () => {
            await fetchSongs();
            setIsFormModalOpen(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isDeleteDialogOpen}
        closeAction={() => setIsDeleteDialogOpen(false)}
      >
        {currentSong && (
          <div className="flex flex-col p-6">
            <h4 className="text-xl mb-1 font-semibold text-neutral-700 text-center">
              Deleting &quot;<em>{currentSong.title}</em>&quot;
            </h4>
            <p className="mb-3 mt-1 text-neutral-500 text-center">
              Are you sure you want to delete this song?
            </p>
            <div className="flex space-x-2">
              <button
                type="button"
                className="w-full mx-auto select-none rounded border border-neutral-600 py-2 px-4 text-center text-sm font-semibold text-neutral-600 transition-all hover:bg-neutral-600 hover:text-white hover:shadow-md hover:shadow-neutral-600/20 active:bg-neutral-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full mx-auto select-none rounded bg-red-600 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-red-900/10 transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={handleDelete}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
