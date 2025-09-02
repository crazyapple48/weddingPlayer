import PlayerButton from "./components/playerButton";

function Player( { playbackDevice, isPlaying }) {

  return (
    <div className="flex flex-col items-end box-border pr-10 justify-between items-center h-75 mt-7">
      <PlayerButton icon="play" isPlaying={isPlaying} device={playbackDevice}/>  
      <PlayerButton icon="pause" isPlaying={isPlaying} device={playbackDevice}/>
      <PlayerButton icon="forward" device={playbackDevice} />
      <PlayerButton icon="backward" device={playbackDevice}/>
    </div>
  );
}

export default Player;
