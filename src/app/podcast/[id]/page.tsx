import { findPodcastById, getEpisodeById } from "@/app/lib/getPodcast";
import { EpisodesCartProps, PodcastParams } from "@/app/types";
import { Props } from "@/app/types";
import Image from "next/image";

export const PodcastCart = ({ podcast }: Props) => {
  return (
    <div className="m-4 p-4 gap-2 items-start w-1/3 shadow-xl rounded-2xl h-min">
      <div className="flex flex-col items-center p-4 m-2">
        <Image
          width={180}
          height={180}
          alt={podcast.image}
          src={podcast.image}
          className="rounded-sm"
        />
        <hr className="block w-full h-px m-4 bg-gray-400 border-0 shadow-lg" />
        <h1 className="font-bold">{podcast.artist}</h1>
        <h2 className="italic">by {podcast.name}</h2>
        <hr className="block w-full h-px m-4 bg-gray-400 border-0 shadow-lg" />
        <h3>{podcast.description}</h3>
      </div>
    </div>
  );
};

export const EpisodesCart = async ({ id }: EpisodesCartProps) => {
  const episodesUser = await getEpisodeById(id);

  if (!episodesUser || episodesUser.length === 0) {
    return <h2>No se encontraron episodios</h2>;
  }

  return (
    <div className="w-2/3 m-4 p-4">
      <h2 className="mb-4 p-4 text-lg font-semibold bg-gray-200 shadow-2xl rounded-xl">Episodes: {episodesUser.length}</h2>
      <table className="table-auto w-full border border-gray-300 rounded-lg shadow-2xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 w-1/2 text-start">Name</th>
            <th className="px-4 py-2 w-1/4 text-start">Date</th>
            <th className="px-4 py-2 text-start">Duration</th>
          </tr>
        </thead>
      <tbody className="bg-gray-50">
      {episodesUser.map((episode: any, index: number) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-2">{episode.title}</td>
          <td className="px-4 py-2">{episode.date}</td>
          <td className="px-4 py-2">{episode.duration}</td>
        </tr>  
      ))}
      </tbody>
      </table>
    </div>
  );
};

export default async function PodcastEpisode({ params }: PodcastParams) {
  const { id } = await params;
  const selectedPodcast = await findPodcastById(id);

  if (!selectedPodcast) {
    return <h1>Podcast no encontrado</h1>;
  }

  return (
    <div className="flex gap-8">
      <PodcastCart podcast={selectedPodcast} />
      <EpisodesCart id={id} />
    </div>
  );
}
