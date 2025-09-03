import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLogin(code) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await axios.post("/api/login", {
        code,
      });
      return result;
    },
    onSuccess: (response) => {
      const tokenData = response.data;

      const token = {
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        expiresAt: Date.now() + tokenData.expiresIn * 1000,
      };
      queryClient.setQueryData(["spotify-token"], token);

      sessionStorage.setItem("spotify-token", JSON.stringify(token));

      window.history.replaceState({}, document.title, "/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useSpotifyToken(refreshToken) {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData(["spotify-token"]);

  const token = cached?.refreshToken;

  return useQuery({
    queryKey: ["spotify-token"],
    queryFn: async () => {
      if (!token) {
        return null;
      }

      const { data } = await axios.post("/api/refresh", {
        refreshToken: token,
      });

      return {
        accessToken: data.accessToken,
        refreshToken: token,
        expiresAt: Date.now() + data.expiresIn * 1000,
      };
    },
    onSuccess: (newToken) => {
      queryClient.setQueryData(["spotify-token"], newToken);
      sessionStorage.setItem("spotify-token", JSON.stringify(newToken));
    },
    enabled: !!token,
    refetchInterval: (data) => {
      if (!data) {
        return false;
      }

      const msUntilExpiry = data.expiresAt - Date.now();

      return msUntilExpiry > 60000 ? msUntilExpiry - 60000 : 0;
    },
    refetchIntervalInBackground: true,
    onError: (err) => {
      console.error(err);
    },
  });
}

export function useGetPlaylists() {
  const queryClient = useQueryClient();

  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;
  const playlistOrder = ["Set-up", "Pre-Ceremony", "They Kiss!", "Cocktail hour", "Dinner", "Wedding Jams", "Dessert Jams", "Wedding Jams 2"]


  return useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const result = await axios.get(
        "https://api.spotify.com/v1/users/crazyapple48/playlists",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      return result;
    },
    enabled: !!accessToken,
    select: (data) => {

      if (!data || !Array.isArray(data.data.items)) {
        return {...data, data: { items: []}}
      } 

      const items = data.data.items;

      const orderMap = playlistOrder.reduce((map, name, idx) => {
        map[name] = idx;
        return map;
      }, {});

      const filteredItems = items.filter(p => orderMap[p.name] !== undefined)

      return {...data, data: {items: filteredItems.sort((a, b) => {
        const aIndex = orderMap[a.name] ?? Infinity;
        const bIndex = orderMap[b.name] ?? Infinity;
        return aIndex - bIndex;
    })}};
  }
  });
}

export function useGetDevices() {
    const queryClient = useQueryClient();

    const { data } = useSpotifyToken();

    const accessToken = data?.accessToken;

    return useQuery({
        queryKey: ["devices"],
        queryFn: async () => {
            const result = await axios.get("https://api.spotify.com/v1/me/player/devices", {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
            return result
        },
        enabled: !!accessToken,
        refetchInterval: 1000 * 15,
        refetchIntervalInBackground: true
    })
}

export function useGetCurrentlyPlayingTrack() {
  const queryClient = useQueryClient();

  const { data } = useSpotifyToken();

  const accessToken = data?.accessToken;

  return useQuery({
    queryKey: ["playbackTrack"],
    queryFn: async () => {
      const result = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      });
      return result
    },
    enabled: !!accessToken,
    refetchInterval: 1000 * 15,
    refetchIntervalInBackground: true
  })
}