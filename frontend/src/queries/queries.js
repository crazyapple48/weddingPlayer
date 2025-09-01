import axios from "axios";
import {
  useGetCurrentlyPlayingTrack,
  useSpotifyToken,
} from "../authentication/auth";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function usePlayPlaylist() {
  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["playPlaylist"],
    mutationFn: async ({ href, playbackDevice }) => {
      const endpoint = `https://api.spotify.com/v1/me/player/play?device_id=${playbackDevice}`;

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
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["playbackTrack"] });
      }, 1000);
    },
    onError: (error) => {
      console.error("Failed to play playlist: ", error);
    },
  });
}

export function usePausePlaylist() {
  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["pausePlayback"],
    mutationFn: async ({ device }) => {
      const endpoint = `https://api.spotify.com/v1/me/player/pause`;

      const response = await axios.put(
        `${endpoint}`,
        {
          device_id: device,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return response;
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["playbackTrack"] });
      }, 1000);
    },
    onError: (error) => {
      console.error("Failed to play playlist: ", error);
    },
  });
}
