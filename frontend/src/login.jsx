


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=e762fb45d4bc41419ef7a3f640970e2e&response_type=code&redirect_uri=https://192.168.0.39:5000/callback&scope=streaming%20user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state"

function Login() {
    return (
        <dive className="" style={{ minHeight: "100vh" }}>
            <a className="" href={AUTH_URL}>Login</a>
        </dive>
    )
}

export default Login
