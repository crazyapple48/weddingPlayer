import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import axios from 'axios'
import { useGetPlaylists, useLogin, useRefresh } from './authentication/auth';

function Dashboard({ code }) {

    const queryClient = useQueryClient();

    const { data, isError: loginIsError, error: loginError } = useLogin(code);

    const { data: refreshData, isError: refreshIsError, error: refreshError } = useRefresh()
    
    if (loginIsError) {
        return <span>Error: {loginError.message}</span>
    }

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
