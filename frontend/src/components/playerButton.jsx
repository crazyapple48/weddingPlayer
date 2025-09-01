import { IoMdPause, IoMdPlay, IoMdSkipBackward, IoMdSkipForward, IoMdVolumeHigh, IoMdVolumeLow } from "react-icons/io"
import { usePausePlaylist } from "../queries/queries"

function PlayerButton({ icon, isPlaying, device }) {

    const pausePlayback = usePausePlaylist();


    switch (icon) {
        case "play":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75" disabled={isPlaying} onClick={() => console.log("Play")}><IoMdPlay /></button>
        case "pause":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75" disabled={!isPlaying} onClick={() => pausePlayback.mutate({device})}><IoMdPause /></button>
        case "forward":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75"><IoMdSkipForward /></button>
        case "backward":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75"><IoMdSkipBackward /></button>
        case "volumeUp":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75"><IoMdVolumeHigh /></button>
        case "volumeDown":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75"><IoMdVolumeLow /></button>
    }
}

export default PlayerButton
