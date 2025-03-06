import { findPodcastById, getEpisodesById } from "@/app/lib/getPodcast";
import { EpisodesCartProps, PodcastParams } from "@/app/types";
import { PodcastCart } from "@/app/components/podcast-cart";
import Link from "next/link";

const EpisodesCart = async ({ id }: EpisodesCartProps) => {
  const episodesUser = await getEpisodesById(id);

  if (!episodesUser || episodesUser.length === 0) {
    return <h2>No se encontraron episodios</h2>;
  }

  return (
    <div className="sm:p-0 md:p-4 w-full max-w-3xl mx-4 ">
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
          {episodesUser.map((episode: any, key: string) => (
            <Link
              href={`/podcast/${id}/episode/${episode.id}`}
              key={episode.id}
              legacyBehavior
            >
              <tr className="border-b cursor-pointer hover:bg-gray-100">
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

export default async function PodcastEpisode({
  params,
}: {
  params: PodcastParams;
}) {
  const { id } = await params;
  const selectedPodcast = await findPodcastById(id);

  if (!selectedPodcast) {
    return <h1>Podcast no encontrado</h1>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start m-2">
      <PodcastCart podcast={selectedPodcast} />
      <EpisodesCart id={id} />
    </div>
  );
}
