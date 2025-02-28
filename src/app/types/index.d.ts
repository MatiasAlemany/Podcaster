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
  