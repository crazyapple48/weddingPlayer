import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from 'axios'


export function useLogin(code) {
        const queryClient = useQueryClient();

        return  useMutation({
        mutationFn: async () => {
            const result = await axios.post("https://192.168.0.39:3000/login", {
            code,
             })
            return result
        },
        onSuccess: (response) => {
            const tokenData = response.data;
            queryClient.setQueryData(["spotify-token"], {
                accessToken: tokenData.accessToken,
                refreshToken: tokenData.refreshToken,
                expiresAt: Date.now() + (tokenData.expiresIn * 1000)
            });
        },
        onError: (error) => {
            console.error(error);
            window.location.href = "/login"
        }
    })
    
}

export function useGetPlaylists() {
    const queryClient = useQueryClient();

    const { data } = useSpotifyToken();

    const  accessToken = data?.accessToken

    return useQuery({ 
        queryKey: ['playlists'], 
        queryFn: async () => {

            const result = await axios.get("https://api.spotify.com/v1/users/crazyapple48/playlists", { headers: {
                                                            'Authorization': 'Bearer ' + accessToken,
                                                        }})
            return result;
        },
        enabled: !!accessToken
    })

}

// the "smart" refresh flow

export function useSpotifyToken(refreshToken) {
    const queryClient = useQueryClient()

    const cached = queryClient.getQueryData(["spotify-token"])

    const token = cached?.refreshToken

    return useQuery({
        queryKey: ["spotify-token"],
        queryFn: async () => {

            console.log("hi")

            if (!token) {
                window.location.href = "/login"
                return null
            }

            const { data } = await axios.post("https://192.168.0.39:3000/refresh", {
                refreshToken: token
            });

            return {
                accessToken: data.accessToken,
                refreshToken: token,
                expiresAt: Date.now() + (data.expiresIn * 1000)
            };
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
        onError: () => {
            window.location.href = "/login"
        }
    })
}