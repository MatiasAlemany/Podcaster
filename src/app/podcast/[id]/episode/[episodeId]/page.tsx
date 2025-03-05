import { findPodcastById, getEpisodeById } from "@/app/lib/getPodcast";
import { PodcastCart } from "@/app/components/podcast-cart";
import { DescriptionProps } from "@/app/types";
import { AudioPlayerProps } from "@/app/types";

const Description = ({ html }: DescriptionProps) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const AudioPlayer = async ({
  podcastId,
  episodeId,
}: AudioPlayerProps) => {
  const episode = await getEpisodeById(podcastId, episodeId);

  if (!episode) return "Episode not found";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{episode?.title}</h1>
      <Description html={episode?.description || "No description available"} />
      <div className="mt-6">
        <audio
          controls
          className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2"
        >
          <source src={episode?.audioUrl} />
        </audio>
      </div>
    </div>
  );
};

type Params = Promise<{
  podcastId: string;
  episodeId: string;
}>

export default async function EpisodeReproducer({
  params,
}:{params: Params}) {
  const { podcastId, episodeId } = await params;
  const podcast = await findPodcastById(podcastId);

  if (!podcast) {
    return <h1>Podcast no encontrado</h1>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start p-8">
      <PodcastCart podcast={podcast} />
      <AudioPlayer podcastId={podcastId} episodeId={episodeId} />
    </div>
  );
}
