import { useGetPlaylists, useSpotifyToken } from "./authentication/auth";
import axios from "axios";


function Dashboard() {
  const tokenQuery = useSpotifyToken();

  if (tokenQuery.isError) {
    return <span>Error: {tokenQuery.error.message}</span>;
  }

  const {
    isPending: playlistPending,
    isError: playlistIsError,
    data: playlistData,
    error: playlistError,
  } = useGetPlaylists();

  if (playlistPending) {
    return <span>Loading....</span>;
  }

  if (playlistIsError) {
    return <span>Error: {playlistError.message}</span>;
  }

  const playlists = playlistData.data.items;

  const filteredPlaylists = playlists.filter((value, index, arr) => {
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
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="">
        <h1 className="text-3xl font-bold underline text-white">Wedding Playlists</h1>
      </div>
      <div className="">
        <div className="">
          {filteredPlaylists.map((playlist) => {
            return (
              <button
                className="text-white"
                key={playlist.href}
                onClick={() =>
                  playPlaylist(playlist.uri, tokenQuery.data.accessToken)
                }
              >
                {playlist.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

async function playPlaylist(href, accessToken) {
  const endpoint = "https://api.spotify.com/v1/me/player/play";

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
