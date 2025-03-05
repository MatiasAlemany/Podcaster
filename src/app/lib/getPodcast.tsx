import { parseStringPromise } from "xml2js";
import { ApiResponse, Podcast } from "../types/index";
import { Episodes } from "../types/index";

export const getPodcast = () => {
  return fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  )
    .then((res) => res.json())
    .then((res: ApiResponse) => {
      // Mapeamos los datos de la API a la forma que espera el tipo `Podcast`
      return res.feed.entry.map((entry) => ({
        id: entry.id.attributes["im:id"], // Extraemos el id desde entry.id.attributes["im:id"]
        name: entry["im:name"].label,
        artist: entry["im:artist"].label,
        image: entry["im:image"][0]?.label, // Tomamos la primera imagen disponible
        description: entry["summary"].label,
      }));
    });
};

export const findPodcastById = async (
  id: string | string[] | undefined
): Promise<Podcast | null> => {
  if (id === undefined) return null;
  const podcasts = await getPodcast();

  return podcasts.find((podcast) => podcast.id === id) || null;
};

export const getEpisodesById = async (id: string) => {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("No se encontraron datos para este podcast");
  }

  const formatDurationInSeconds = (durationInSeconds: number) => {
    // Obtener las horas, minutos y segundos
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    // Formatear la duración como HH:MM:SS
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const rssUrl = data.results[0].feedUrl;

  const rssResponse = await fetch(rssUrl);
  const xml = await rssResponse.text();

  const formatDateUsingIntl = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    return formatter.format(date);
  };

  //Convertir XML a JSON
  const json = await parseStringPromise(xml);

  const episodes = json.rss.channel[0].item.map((episode: any) => ({
    id: episode.guid ? episode.guid[0]._ : null,
    title: episode.title ? episode.title[0] : "No title",
    duration: episode["itunes:duration"]
      ? formatDurationInSeconds(episode["itunes:duration"][0])
      : "No duration",
    date: episode.pubDate ? formatDateUsingIntl(episode.pubDate[0]) : "No date",
    audioUrl: episode["media:content"]
      ? episode["media:content"][0].$?.url
      : null,
    description: episode.description
      ? episode.description[0]
      : "No description",
  }));

  return episodes;
};

export const getEpisodeById = async (
  podcastId: string,
  episodeId: string
): Promise<Episodes | null> => {
  const episodes = await getEpisodesById(podcastId);
  const myEpisode = episodes.find((episode: Episodes) =>
    episode.id.includes(episodeId)
  );

  console.log(myEpisode);
  return myEpisode;
};
