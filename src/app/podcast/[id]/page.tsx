import { findPodcastById, getEpisodesById } from "@/app/lib/getPodcast";
import { EpisodesCartProps, PodcastParams } from "@/app/types";
import { Props } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

export const PodcastCart = ({ podcast }: Props) => {
  return (
    <div className="m-4 p-6 gap-4 items-start w-1/3 shadow-lg rounded-2xl bg-white transition-all hover:shadow-2xl">
      <div className="flex flex-col items-center p-4 m-2">
        <Image
          width={180}
          height={180}
          alt={podcast.image}
          src={podcast.image}
          className="rounded-xl transition-transform transform hover:scale-105"
        />
        <hr className="block w-full h-px m-4 bg-gray-300 border-0" />
        <h1 className="font-bold text-lg">{podcast.artist}</h1>
        <h2 className="italic text-gray-600">{`by ${podcast.name}`}</h2>
        <hr className="block w-full h-px m-4 bg-gray-300 border-0" />
        <p className="text-gray-700">{podcast.description}</p>
      </div>
    </div>
  );
};

const EpisodesCart = async ({ id }: EpisodesCartProps) => {
  const episodesUser = await getEpisodesById(id);

  if (!episodesUser || episodesUser.length === 0) {
    return <h2>No se encontraron episodios</h2>;
  }

  return (
    <div className="w-2/3 m-4 p-4">
      <h2 className="mb-4 p-4 text-lg font-semibold bg-gray-100 shadow-2xl rounded-xl">
        Episodes: {episodesUser.length}
      </h2>
      <table className="table-auto w-full shadow-2xl">
        <thead>
          <tr className="bg-gray-100 rounded-xl">
            <th className="px-4 py-2 w-1/2 text-start">Name</th>
            <th className="px-4 py-2 w-1/4 text-start">Date</th>
            <th className="px-4 py-2 text-start">Duration</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {episodesUser.map((episode: any, key:string) => (
            <Link href={`/podcast/${id}/episode/${episode.id}`} key={episode.id} legacyBehavior>
              <tr  className="border-b cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2">{episode.title}</td>
                <td className="px-4 py-2">{episode.date}</td>
                <td className="px-4 py-2">
                  {episode.duration ? episode.duration : "No duration info"}
                </td>
              </tr>
            </Link>
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
