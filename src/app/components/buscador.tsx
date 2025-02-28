"use client";

import { useState } from "react";
import { Podcast } from "../types";

interface BuscadorProps {
    podcast: Podcast[];
    setFilteredPodcast: (filtered: Podcast[]) => void;
}

export const Buscador = ({podcast, setFilteredPodcast}: BuscadorProps) => {
  const [filteredPodcast, setPodcast] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPodcast(value);

    const filtered = podcast.filter((podcast) => 
        podcast.name.toLowerCase().includes(value.toLowerCase()) ||
        podcast.artist.toLowerCase().includes(value.toLowerCase())       
   )

   setFilteredPodcast(filtered);
  };

  return (
    <div className="mb-4 flex flex-col gap-2">
      <label className="font-bold">Busca tu podcast aqui!</label>
      <input
        type="text"
        value={filteredPodcast}
        placeholder="Buscar por titulo o autor"
        onChange={handleSearch}
        className="border-2 border-solid rounded-xl max-w-sm"
      ></input>
    </div>
  );
};
