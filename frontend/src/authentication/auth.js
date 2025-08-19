import { useQueryClient, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import axios from 'axios'


export function useLogin(code) {
    const queryClient = useQueryClient();

        return  useSuspenseQuery({
        queryKey: ['accessToken'],
        queryFn: async () => {
            const result = await axios.post("https://192.168.0.39:3000/login", {
            code,
             })
            return result
        },
    })
    
}

export function useRefresh() {
    const queryClient = useQueryClient();

    const refreshToken = queryClient.getQueryData(['accessToken']).data.refreshToken

    return useQuery({
        queryKey: ["refresh-token"],
        queryFn: async () => {
            const result = await axios.post("https://192.168.0.39:3000/refresh", { refreshToken })
            return result
        },
        refetchInterval: 1000 * 60 * 59,
        onSuccess: (data) => {
            queryClient.setQueryData(["access-token"].accessToken, refreshData.data.accessToken)
        },
        enabled: !!refreshToken
    })
  
}

export function useGetPlaylists() {
    const queryClient = useQueryClient();

    const accessToken = queryClient.getQueryData(["accessToken"]).data.accessToken


    return useQuery({ 
        queryKey: ['playlists'], 
        queryFn: async () => {

            const result = await axios.get("https://api.spotify.com/v1/users/crazyapple48/playlists", { headers: {
                                                            'Authorization': 'Bearer ' + accessToken,
                                                        }})
            return result;
        },
        isEnabled: !!accessToken
    })

}
