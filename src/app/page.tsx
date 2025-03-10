"use client";
import { getPodcast } from "./lib/getPodcast";
import { Podcast } from "./types";
import { Buscador } from "./components/buscador";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PodcastData = ({ podcast }: { podcast: Podcast[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-16 mt-6">
      {podcast.map(({ id, image, name, artist }) => (
        <Link key={id} href={`/podcast/${id}`}>
          <li className="flex flex-col justify-between text-center items-center h-full flex-1 bg-white rounded-2xl shadow-lg p-4 transition-all hover:shadow-2xl hover:scale-105">
            <Image
              width={120}
              height={120}
              src={image}
              alt={image}
              className="rounded-full border-4 border-gray-200 shadow-lg mb-4"
            />
            <h1 className="font-semibold text-lg text-gray-900">{name}</h1>
            <h2 className="text-sm text-gray-600">{artist}</h2>
          </li>
        </Link>
      ))}
    </div>
  );
};

export default function Home() {
  const [podcast, setPodcast] = useState<Podcast[]>([]);
  const [filteredPodcast, setFilteredPodcast] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const data = await getPodcast();
      setPodcast(data);
      setFilteredPodcast(data);
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <Buscador podcast={podcast} setFilteredPodcast={setFilteredPodcast} />
      <PodcastData podcast={filteredPodcast} />
    </div>
  );
}
