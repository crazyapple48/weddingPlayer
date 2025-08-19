import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import axios from 'axios'
import { useGetPlaylists, useLogin } from './authentication/auth';

function Dashboard({ code }) {

    const queryClient = useQueryClient();

    const { data } = useLogin(code);


    // const { data, isError: loginIsError, error: loginError } = useSuspenseQuery({
    //     queryKey: ['accessToken'],
    //     queryFn: async () => {
    //         const result = await axios.post("https://192.168.0.39:3000/login", {
    //         code,
    //          })
    //          console.log(result);
    //         return result
    //     },
    // })

    // const { data: refreshData, isError: refreshIsError, error: refreshError } = useQuery({
    //     queryKey: ["refresh-token"],
    //     queryFn: async () => {
    //         const result = await axios.post("https://192.168.0.39:3000/refresh", { refreshToken: data.data.refreshToken})
    //         return result
    //     },
    //     refetchInterval: 1000,
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["access-token"].accessToken, refreshData.data.accessToken)
    //     },
    //     enabled: !!data.data.refreshToken
    // })
  
    // if (loginIsError) {
    //     return <span>Error: {loginError.message}</span>
    // }

    // if (refreshIsError) {
    //     return <span>Error: {refreshError.message}</span>
    // }

    const { isPending: playlistPending, isError: playlistIsError, data: playlistData,  error: playlistError } = useGetPlaylists()
    
    if (playlistPending) {
        return <span>Loading....</span>
    }

    if (playlistIsError) {
        return <span>Error: {playlistError.message}</span>
    }

    const playlists = playlistData.data.items
    
    return (
        <Container>
            {playlists.map((playlist) => {
                return <p key={playlist.href}>{playlist.name}</p>
            })}
        </Container>
    )
}

export default Dashboard
