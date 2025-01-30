import Image from "next/image";
import Script from "next/script";
import {
  PiMusicNotesPlusFill,
  PiNotePencilFill,
  PiTrashLight,
} from "react-icons/pi";
import { getSongs } from "../_repositories/songs";
import FavoriteButton from "../_components/FavoriteButton";

export default async function AdminPage() {
  const songs = await getSongs();

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
                data-dialog-target="modal"
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
                    >
                      <PiNotePencilFill size={16} className="mr-1.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-transparent py-2 px-4 inline-flex items-center text-center text-sm transition-all text-red-600 hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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

      <div
        data-dialog-backdrop="modal"
        data-dialog-backdrop-close="true"
        className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          data-dialog="modal"
          className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-neutral-700 shadow-md"
        >
          <div className="flex flex-col p-6">
            <h4 className="text-2xl mb-1 font-semibold text-neutral-700">
              Add New Song
            </h4>
            <p className="mb-3 mt-1 text-neutral-400">
              Enter or edit each information for the song.
            </p>

            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Title
              </label>
              <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
                placeholder="Enter the song title"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Artist
              </label>
              <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
                placeholder="Enter the song artist"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Album Title
              </label>
              <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
                placeholder="Enter the album title"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Album Year
              </label>
              <input
                type="number"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
                placeholder="Enter the album year"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Album Cover
              </label>
              <input
                type="file"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Artist Poster
              </label>
              <input
                type="file"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
              />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
              <label className="block mb-1 text-sm text-neutral-700">
                Audio Track
              </label>
              <input
                type="file"
                className="w-full h-10 bg-transparent placeholder:text-neutral-400 text-neutral-700 text-sm border border-neutral-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-neutral-400 hover:border-neutral-400 shadow-sm focus:shadow-md"
              />
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="flex space-x-2">
              <button
                className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-dialog-close="true"
              >
                Cancel
              </button>

              <button
                className="w-full mx-auto select-none rounded bg-neutral-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-neutral-900/10 transition-all hover:shadow-lg hover:shadow-neutral-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-dialog-close="true"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <Script src="https://unpkg.com/@material-tailwind/html@latest/scripts/dialog.js" />
    </div>
  );
}
