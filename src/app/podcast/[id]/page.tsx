import { findPodcastById } from "@/app/lib/getPodcast";
import { PodcastParams } from "@/app/types";
import Image from "next/image";


export default async function PodcastEpisode({params}: PodcastParams) {
    const { id } = await params
    const selectedPodcast = await findPodcastById(id);

    if(!selectedPodcast){
        return <h1>Podcast no encontrado</h1>
    }

    return (
        <>
        <div className="m-4 gap-2 items-start w-1/3 shadow-xl rounded-xl">
        <div className="flex flex-col items-center p-4 m-2">
        <Image width={180} height={180} alt={selectedPodcast.image} src={selectedPodcast.image} className="rounded-sm"/>
        <hr className="block w-full h-px m-4 bg-gray-400 border-0 shadow-lg"/> 
        <h1>{selectedPodcast.artist}</h1>
        <h2>by {selectedPodcast.name}</h2>
        <hr className="block w-full h-px m-4 bg-gray-400 border-0 shadow-lg"/> 
        <h3>Description: {selectedPodcast.description}</h3>
        </div>
        </div>
        </>
    )
}