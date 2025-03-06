"use client";

import { useState } from "react";
import { Podcast } from "../types";

interface BuscadorProps {
  podcast: Podcast[];
  setFilteredPodcast: (filtered: Podcast[]) => void;
}

export const Buscador = ({ podcast, setFilteredPodcast }: BuscadorProps) => {
  const [filteredPodcast, setPodcast] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPodcast(value);

    const filtered = podcast.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(value.toLowerCase()) ||
        podcast.artist.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredPodcast(filtered);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 items-center">
      <label className="font-mono font-bold text-2xl">
        Find your podcast here!
      </label>
      <input
        type="text"
        value={filteredPodcast}
        placeholder="Search by title or author"
        onChange={handleSearch}
        className="w-full max-w-sm border-2 border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
      />
    </div>
  );
};
