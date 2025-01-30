"use client";

import { songsTable } from "@/drizzle/schema";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PiPauseFill, PiPlayFill } from "react-icons/pi";
import FavoriteButton from "./FavoriteButton";

export default function AudioPlayer({
  song,
}: {
  song: typeof songsTable.$inferSelect;
}) {
  const $audio = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const audio = $audio.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function handleSeek(e: ChangeEvent<HTMLInputElement>) {
    const audio = $audio.current;
    if (audio) {
      const newTime = (Number(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    const audio = $audio.current;

    if (audio === null) return;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", setAudioData);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col justify-between ml-8 py-4">
      <audio ref={$audio} src={`/assets/audio/${song.audio}`} />
      <div className="flex">
        <button
          className="bg-white w-16 h-16 flex justify-center items-center rounded-full text-black"
          onClick={togglePlay}
        >
          {isPlaying ? <PiPauseFill size={20} /> : <PiPlayFill size={20} />}
        </button>

        <div className="flex flex-col justify-between ml-9">
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold">{song.title}</h2>
            <FavoriteButton song={song.id} isFavorite={song.favorite} />
          </div>

          <h3 className="leading-5">
            {song.artist} | {song.albumTitle} | {song.albumYear}
          </h3>
        </div>
      </div>

      <div>
        <input
          type="range"
          className="w-full mt-2"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
        />
        <div className="flex justify-between text-xs text-neutral-400 font-semibold py-2">
          <div>{formatTime(currentTime)}</div>
          <div>{formatTime(duration - currentTime)}</div>
        </div>
      </div>
    </div>
  );
}
