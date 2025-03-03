import { Dhurjati } from "next/font/google";

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
        "id": EntryId;
        "im:name": { label: string };
        "im:artist": { label: string };
        "im:image": { label: string }[];
        "summary": {label: string};
      }[];
    };
  }

interface PodcastParams {
  params: { id: string };
}

type Props = {
  podcast: Podcast;
};

export interface Episodes {
  title: string;
  date: string;
  duration: string;
}

export interface EpisodesCartProps {
  id: string;
}
  