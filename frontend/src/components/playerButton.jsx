import {
  IoMdPause,
  IoMdPlay,
  IoMdSkipBackward,
  IoMdSkipForward,
} from "react-icons/io";
import {
  usePausePlaylist,
  usePreviousTrack,
  useResumePlayback,
  useSkipTrack,
} from "../queries/queries";
import { useEffect, useState } from "react";

function PlayerButton({ icon, isPlaying, device }) {
  const [volume, setVolume] = useState(null);

  const deviceId = device?.id;

  const pausePlayback = usePausePlaylist();
  const resumePlayback = useResumePlayback();
  const skipForward = useSkipTrack();
  const previousTrack = usePreviousTrack();

  const baseStyle =
    "bg-fuchsia-500 rounded-full p-3 aspect-square hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75 transition duration-300 ease-in-out";

  useEffect(() => {
    setVolume(device?.volume_percent ?? null);
  }, [device]);

  if (!device) {
    return  <button className="bg-gray-400 rounded-full p-3 aspect-square opacity-50 cursor-not-allowed">
      {/* placeholder icon maybe */}
      <IoMdPlay />
    </button>
  }

  switch (icon) {
    case "play":
      return (
        <button
          className={baseStyle}
          disabled={isPlaying}
          onClick={() => resumePlayback.mutate({ device: deviceId })}
        >
          <IoMdPlay />
        </button>
      );
    case "pause":
      return (
        <button
          className={baseStyle}
          disabled={!isPlaying}
          onClick={() => pausePlayback.mutate({ device: deviceId })}
        >
          <IoMdPause />
        </button>
      );
    case "forward":
      return (
        <button
          className={baseStyle}
          disabled={skipForward.isPending}
          onClick={() => skipForward.mutate({ device: deviceId })}
        >
          <IoMdSkipForward />
        </button>
      );
    case "backward":
      return (
        <button
          className={baseStyle}
          disabled={previousTrack.isPending}
          onClick={() => previousTrack.mutate({ device: deviceId })}
        >
          <IoMdSkipBackward />
        </button>
      );
  }
}

export default PlayerButton;
