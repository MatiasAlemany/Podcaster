export interface Podcast {
  id: string;
  name: string;
  artist: string;
  image: string;
  description: string;
}

interface EntryId {
  attributes: {
    "im:id": string;
  };
}

export interface ApiResponse {
  feed: {
    entry: {
      id: EntryId;
      "im:name": { label: string };
      "im:artist": { label: string };
      "im:image": { label: string }[];
      summary: { label: string };
    }[];
  };
}

export type PodcastParams = Promise<{
  id: string 
}>;

export type Props = {
  podcast: Podcast;
};

export interface Episodes {
  id: string;
  title: string;
  date: string;
  duration: string;
  audioUrl: string;
  description: string;
}

export interface EpisodesCartProps {
  id: string;
}

export type AudioPlayerProps = {
  podcastId: string;
  episodeId: string;
};

export type DescriptionProps = {
  html: string | TrustedHTML;
};
