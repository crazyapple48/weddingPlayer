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
    onMutate: async (variables) => {
      queryClient.setQueryData(["playbackTrack"], (old) => ({
        ...old,
        data: { ...old?.data, is_playing: true, context: { uri: variables.href } },
      }));
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["playbackTrack"] });
      }, 1500);
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
    onMutate: async (variables) => {
      queryClient.setQueryData(["playbackTrack"], (old) => ({
        ...old,
        data: { ...old?.data, is_playing: false},
      }));
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["playbackTrack"] });
      }, 1500);
    },
    onError: (error) => {
      console.error("Failed to pause playlist: ", error);
    },
  });
}

export function useResumePlayback() {
  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
  mutationKey: ["resumePlayback"],
  mutationFn: async ({ device }) => {
    const endpoint = `https://api.spotify.com/v1/me/player/play`;

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
  onMutate: async (variables) => {
    queryClient.setQueryData(["playbackTrack"], (old) => ({
      ...old,
      data: { ...old?.data, is_playing: true},
    }));
  },
  onSuccess: () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["playbackTrack"] });
    }, 1500);
  },
  onError: (error) => {
    console.error("Failed to play playlist: ", error);
  },
})
}

export function useSkipTrack() {
  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
  mutationKey: ["skipForward"],
  mutationFn: async ({ device }) => {
    const endpoint = `https://api.spotify.com/v1/me/player/next`;

    const response = await axios.post(
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
  onError: (error) => {
    console.error("Failed to skip track: ", error);
  },
})
}

export function usePreviousTrack() {
  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;
  const queryClient = useQueryClient();

  return useMutation({
  mutationKey: ["previous"],
  mutationFn: async ({ device }) => {
    const endpoint = `https://api.spotify.com/v1/me/player/previous`;

    const response = await axios.post(
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
  onError: (error) => {
    console.error("Failed to go back to previous track: ", error);
  },
})
}