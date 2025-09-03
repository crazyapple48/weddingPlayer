// /frontend/api/refresh.js
import SpotifyWebApi from "spotify-web-api-node"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { refreshToken } = req.body

  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://wedding-player-seven.vercel.app',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  try {
    const data = await spotifyApi.refreshAccessToken()
    res.status(200).json({
      accessToken: data.body["access_token"],
      expiresIn: data.body["expires_in"],
    })
  } catch (err) {
    console.error(err)
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Refresh failed" })
  }
}
