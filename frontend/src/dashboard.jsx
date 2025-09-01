import { useEffect, useState } from "react";
import { useGetDevices, useGetPlaylists, useSpotifyToken } from "./authentication/auth";
import Player from "./player";
import { useGetCurrentlyPlayingTrack } from "./authentication/auth";
import { usePlayPlaylist } from "./queries/queries";

function Dashboard() {
  const tokenQuery = useSpotifyToken();

  const [playbackDevice, setPlaybackDevice] = useState("");
  const [isDevices, setIsDevices] = useState(false);

  if (tokenQuery.isError) {
    return <span>Error: {tokenQuery.error.message}</span>;
  }

  const {
    isPending: devicesPending,
    isError: devicesIsError,
    data: devicesData,
    error: devicesError,
    refetch: refetchDevices,
  } = useGetDevices();

  const {
    isPending: playlistPending,
    isError: playlistIsError,
    data: playlistData,
    error: playlistError,
  } = useGetPlaylists();


  const playbackState = useGetCurrentlyPlayingTrack();

  const playlists = playlistData?.data?.items;
  const devices = devicesData?.data?.devices ?? [];
  const isPlaying = playbackState?.data?.data?.is_playing
  
  const playPlaylist = usePlayPlaylist();
  

  useEffect(() => {
    if (devices.length > 0 && !playbackDevice) {
      setIsDevices(true);
      setPlaybackDevice(devices[0].id);
    }
  }, [devices]);
  
  if (playlistIsError) {
    return <span>Error: {playlistError.message}</span>;
  }

  if (devicesIsError) {
    return <span>Error: {devicesError.message}</span>;
  }

  if (!devices) {
    return <span>Something went wrong</span>;
  }

  if (!playlists) {
    return <span>There are no playlists. Sorry bruh</span>
  }
  // const playlistOrder = ["Set-up", "Pre-Ceremony", "They Kiss!", "Cocktail hour", "Dinner", "Wedding Jams", "Dessert Jams", "Wedding Jams 2"]

  // const orderedPlaylists = playlistOrder.map((playlist) => {
    
  // })

  // const filteredPlaylists = playlists?.filter((value, index, arr) => {
  //   switch (value.name) {
  //     case "Wedding Jams":
  //       return true;
  //     case "Cocktail hour":
  //       return true;
  //     case "Wedding Jams 2":
  //       return true;
  //     case "Dessert Jams":
  //       return true;
  //     case "Dinner":
  //       return true;
  //     case "They Kiss!":
  //       return true;
  //     case "Set-up":
  //       return true;
  //     case "Pre-Ceremony":
  //       return true;
  //   }
  // });

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] grid-rows-[2fr_1fr_6fr] items-center justify-center bg-black h-screen">
        <div className="col-2 row-2 justify-self-end self-start pr-3">
          {devicesPending ? (
            <span className="text-white">Loading....</span>
          ) : (
            <select
              className="bg-[#8833ff] p-2 rounded-lg"
              onChange={(e) => setPlaybackDevice(e.target.value)}
              onFocus={(e) => refetchDevices()}
            >
              {devices.map((device) => {
                return (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="col-1 row-1 col-span-2">
          <h1 className="text-3xl font-bold underline text-white justify-self-center">
            Wedding Playlists
          </h1>
        </div>
        <div className="col-1 row-2 row-span-2 flex flex-col self-start justify-self-center">
          {playlistPending ? (
            <span className="text-white">Loading...</span>
          ) : (
            playlists.map((playlist) => {
              return (
                playlistPending ? <button>Playing Playlist....</button> :
                <button
                  className="rounded-lg bg-fuchsia-500 p-3 my-1 hover:bg-fuchsia-800 disabled:opacity-25 disabled:bg-gray-300 active:scale-75"
                  key={playlist.href}
                  onClick={() => {
                    playPlaylist.mutateAsync(
                      { href: playlist.uri,
                        playbackDevice}
                      )
                    }}
                  disabled={!isDevices}
                >
                  {playlist.name}
                </button>
              );
            })
          )}
        </div>
        <div className="flex flex-col justify-center w-full justify-self-center self-start col-2 row-3">
          <Player playbackDevice={playbackDevice} accessToken={tokenQuery.data.accessToken} isPlaying={isPlaying}/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

