


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=e762fb45d4bc41419ef7a3f640970e2e&response_type=code&redirect_uri=https://192.168.0.39:5000/callback&scope=streaming%20user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state"

function Login() {
    return (
        <div className="flex items-center justify-center bg-black h-screen" style={{ minHeight: "100vh" }}>
            <a href={AUTH_URL}>
               <div className="flex items-center justify-center bg-fuchsia-500 p-5 rounded-md hover:bg-fuchsia-800 active:scale-75">
                    <p className="">
                        Login
                    </p>
                </div>
            </a>
        </div>
    )
}

export default Login
