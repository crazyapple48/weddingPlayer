import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Container } from 'react-bootstrap';
import axios from 'axios'
import { useGetPlaylists, useLogin, useSpotifyToken } from './authentication/auth';
import { useEffect } from 'react';

function Dashboard({ code }) {

    const queryClient = useQueryClient();
    
    
    const loginMutation = useLogin(code);

    useEffect(() => {
        if (code) {
            loginMutation.mutate()
        }
    }, [code])
    
    const tokenQuery = useSpotifyToken();

    if (tokenQuery.isError) {
        return <span>Error: {tokenQuery.error.message}</span>
    }

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
