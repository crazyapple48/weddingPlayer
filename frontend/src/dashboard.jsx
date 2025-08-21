import { useState } from "react";
import {
  useGetDevices,
  useGetPlaylists,
  useSpotifyToken,
} from "./authentication/auth";
import axios from "axios";

function Dashboard() {
  const tokenQuery = useSpotifyToken();

  const [playbackDevice, setPlaybackDevice ] = useState();

  if (tokenQuery.isError) {
    return <span>Error: {tokenQuery.error.message}</span>;
  }

  const {
    isPending: devicesPending,
    isError: devicesIsError,
    data: devicesData,
    error: devicesError,
  } = useGetDevices();

  const {
    isPending: playlistPending,
    isError: playlistIsError,
    data: playlistData,
    error: playlistError,
  } = useGetPlaylists();

  if (playlistIsError) {
    return <span>Error: {playlistError.message}</span>;
  }

  if (devicesIsError) {
    return <span>Error: {devicesError.message}</span>
  }

  const playlists = playlistData?.data?.items;
  const devices = devicesData?.data?.devices;

  if (!devices) {
    return <span>Something went wrong</span>
  }

  const filteredPlaylists = playlists?.filter((value, index, arr) => {
    switch (value.name) {
      case "Wedding Jams":
        return true;
      case "Cocktail hour":
        return true;
      case "Wedding Jams 2":
        return true;
      case "Dessert Jams":
        return true;
      case "Dinner":
        return true;
      case "They Kiss!":
        return true;
      case "Set-up":
        return true;
      case "Pre-Ceremony":
        return true;
    }
  });

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] items-center justify-center bg-black h-screen">
        <div className="col-2 row-2 justify-self-end self-start pr-3">
          {devicesPending ? (
            <span className="text-white">Loading....</span>
          ) : (
            <select className="bg-[#8833ff] p-2 rounded-lg" onChange={e => setPlaybackDevice(e.target.value)}>
              {devices.map((device) => {
                return <option key={device.id} value={device.id}>{device.name}</option>
              })}
            </select>
          )}
        </div>
        <div className="col-1 row-1 col-span-2">
          <h1 className="text-3xl font-bold underline text-white justify-self-center">
            Wedding Playlists
          </h1>
        </div>
        <div className="col-1 row-2 flex flex-col self-start justify-self-center">
          {playlistPending ? (
            <span className="text-white">Loading...</span>
          ) : (
            filteredPlaylists.map((playlist) => {
              return (
                <button
                  className="rounded-lg bg-[#aa33aa] p-3 my-1"
                  key={playlist.href}
                  onClick={() =>
                    playPlaylist(playlist.uri, tokenQuery.data.accessToken, playbackDevice)
                  }
                >
                  {playlist.name}
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

async function playPlaylist(href, accessToken, device) {
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
