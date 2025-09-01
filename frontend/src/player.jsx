import { useEffect, useState } from "react";
import PlayerButton from "./components/playerButton";
import { useGetCurrentlyPlayingTrack } from "./authentication/auth";

function Player( { playbackDevice, accessToken }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { data } = useGetCurrentlyPlayingTrack();

  console.log(data);

  useEffect(() => {
    if (!data) return;

    if (data.data.is_playing) {
     console.log("Is playing?: " + data.data.is_playing)

      setIsPlaying(true);
    } 
    else {
      setIsPlaying(false);
    }
  }, [data, isPlaying])

  return (
    <div className="flex flex-col items-end box-border pr-10 gap-5">
      <PlayerButton icon="play" isPlaying={isPlaying}/>  
      <PlayerButton icon="pause" isPlaying={isPlaying} onButtonClick={() => pausePlayback(playbackDevice, accessToken)}/>
      <PlayerButton icon="forward" />
      <PlayerButton icon="backward" />
      <PlayerButton icon="volumeUp" />
      <PlayerButton icon="volumeDown" />
    </div>
  );
}

export default Player;

async function pausePlayback(device, accessToken ) {
  const endpoint = `https://api.spotify.com/v1/me/player/play?device_id=${device}`;

  const response = await axios.put(
    `${endpoint}`,
    {
      context_uri: href,
    },
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  return response;
}