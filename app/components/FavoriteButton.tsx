"use client";

import { useState } from "react";
import { PiHeartStraightFill, PiHeartStraightLight } from "react-icons/pi";
import { updateFavorite } from "../_repositories/favorites";

export default function FavoriteButton({
  song,
  isFavorite,
}: {
  song: number;
  isFavorite: boolean;
}) {
  const [isFavoriteState, setIsFavorite] = useState(isFavorite);

  async function toggleFavorite() {
    const newFavorite = await updateFavorite(song, !isFavoriteState);
    setIsFavorite(newFavorite);
  }

  return (
    <>
      {isFavoriteState ? (
        <button
          type="button"
          title="Remove from favorites"
          className="focus:outline-none transition-colors text-red-500 hover:text-white"
          onClick={toggleFavorite}
        >
          <PiHeartStraightFill size={20} />
        </button>
      ) : (
        <button
          type="button"
          title="Add to favorites"
          className="focus:outline-none transition-colors text-white hover:text-red-500"
          onClick={toggleFavorite}
        >
          <PiHeartStraightLight size={20} />
        </button>
      )}
    </>
  );
}
