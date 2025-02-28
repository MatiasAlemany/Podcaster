import { ApiResponse, Podcast } from "../types/index";

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
        description: entry["summary"].label   
      }));
    });
};


export const findPodcastById = async (id: string | string[] | undefined): Promise<Podcast | null> => {
  if (id === undefined) return null;
  const podcasts = await getPodcast();

  return podcasts.find(podcast => podcast.id === id) || null;
  
}