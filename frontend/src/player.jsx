import PlayerButton from "./components/playerButton";

function Player() {
  return (
    <div className="flex flex-col items-end box-border pr-10 gap-5">
      <PlayerButton icon="play" />  
      <PlayerButton icon="pause" />
      <PlayerButton icon="forward" />
      <PlayerButton icon="backward" />
      <PlayerButton icon="volumeUp" />
      <PlayerButton icon="volumeDown" />
    </div>
  );
}

export default Player;
