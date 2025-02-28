"use client";
import { getPodcast } from "./lib/getPodcast";
import { Podcast } from "./types";
import { Buscador } from "./components/buscador";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PodcastData = ({ podcast }: { podcast: Podcast[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {podcast.map(({ id, image, name, artist }) => (
        <Link key={id} href={`/podcast/${id}`}>
          <li className="flex flex-col list-none items-center">
            <Image
              width={120}
              height={120}
              src={image}
              alt={image}
              className="rounded-full"
            />
            <h1>{name}</h1>
            <h2>{artist}</h2>
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
    <div className="m-8">
      <Buscador podcast={podcast} setFilteredPodcast={setFilteredPodcast} />
      <PodcastData podcast={filteredPodcast} />
    </div>
  );
}
