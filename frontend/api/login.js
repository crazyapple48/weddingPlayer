import SpotifyWebApi from "spotify-web-api-node"


export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { code } = req.body.code
    if (!code) {
        return res.status(400).json({ error: "Missing code"})
    }

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://wedding-player-seven.vercel.app',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        res.status(200).json({
            accessToken: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
            expiresIn: data.body['expires_in']
        })
    } catch (err) {
        console.error(err)
        res.status(err.statusCode || 500).json({ error: err.message || "Login failed"})
    }
}