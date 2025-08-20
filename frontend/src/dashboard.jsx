import { Button, Container } from 'react-bootstrap';
import { useGetPlaylists, useSpotifyToken } from './authentication/auth';

function Dashboard() {
  
    
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
    })
    
    return (
        <Container className="d-flex flex-column w-50 h-100">
            {filteredPlaylists.map((playlist) => {
                return <Button key={playlist.href} variant='outline-success' >{playlist.name}</Button>
            })}
        </Container>
    )
}

export default Dashboard
