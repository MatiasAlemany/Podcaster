import Link from "next/link";
import Image from "next/image";
import { Props } from "../types";

export const PodcastCart = ({ podcast }: Props) => {
  return (
    <div className="m-4 p-6 gap-4 items-start w-full h-min sm:w-full md:full lg:w-1/3 shadow-lg rounded-2xl bg-white transition-all hover:shadow-2xl">
      <div className="flex flex-col items-center p-4 m-2">
        <Link href={`/podcast/${podcast.id}`}>
          <Image
            width={180}
            height={180}
            alt={podcast.image}
            src={podcast.image}
            className="rounded-xl transition-transform transform hover:scale-105 cursor-pointer"
          />
        </Link>
        <hr className="block w-full h-px m-4 bg-gray-300 border-0" />
        <h1 className="font-bold text-lg">{podcast.artist}</h1>
        <h2 className="italic text-gray-600">{`by ${podcast.name}`}</h2>
        <hr className="block w-full h-px m-4 bg-gray-300 border-0" />
        <p className="text-gray-700">{podcast.description}</p>
      </div>
    </div>
  );
};
