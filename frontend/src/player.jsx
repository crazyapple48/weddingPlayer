import PlayerButton from "./components/playerButton";

function Player( { playbackDevice, isPlaying }) {


  return (
    <div className="flex flex-col items-end box-border pr-10 gap-5">
      <PlayerButton icon="play" isPlaying={isPlaying}/>  
      <PlayerButton icon="pause" isPlaying={isPlaying} device={playbackDevice}/>
      <PlayerButton icon="forward" />
      <PlayerButton icon="backward" />
      <PlayerButton icon="volumeUp" />
      <PlayerButton icon="volumeDown" />
    </div>
  );
}

export default Player;
