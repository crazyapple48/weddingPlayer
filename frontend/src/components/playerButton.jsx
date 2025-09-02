import { IoMdPause, IoMdPlay, IoMdSkipBackward, IoMdSkipForward, IoMdVolumeHigh, IoMdVolumeLow } from "react-icons/io"
import { usePausePlaylist, useResumePlayback, useSkipTrack } from "../queries/queries"

function PlayerButton({ icon, isPlaying, device }) {

    const pausePlayback = usePausePlaylist();
    const resumePlayback = useResumePlayback();
    const skipForward = useSkipTrack();


    switch (icon) {
        case "play":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out" disabled={isPlaying} onClick={() => resumePlayback.mutate({device})}><IoMdPlay /></button>
        case "pause":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out" disabled={!isPlaying} onClick={() => pausePlayback.mutate({device})}><IoMdPause /></button>
        case "forward":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out" disabled={skipForward.isPending} onClick={() => skipForward.mutate({device})}><IoMdSkipForward /></button>
        case "backward":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out"><IoMdSkipBackward /></button>
        case "volumeUp":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out"><IoMdVolumeHigh /></button>
        case "volumeDown":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out"><IoMdVolumeLow /></button>
    }
}

export default PlayerButton
