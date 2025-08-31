import { IoMdPause, IoMdPlay, IoMdSkipBackward, IoMdSkipForward, IoMdVolumeHigh, IoMdVolumeLow } from "react-icons/io"

function PlayerButton({ icon }) {

    switch (icon) {
        case "play":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square"><IoMdPlay /></button>
        case "pause":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square"><IoMdPause /></button>
        case "forward":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square"><IoMdSkipForward /></button>
        case "backward":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square"><IoMdSkipBackward /></button>
        case "volumeUp":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square"><IoMdVolumeHigh /></button>
        case "volumeDown":
            return <button className="bg-fuchsia-500 rounded-full p-3 aspect-square"><IoMdVolumeLow /></button>
    }

}

export default PlayerButton
