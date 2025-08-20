const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const https = require('https');
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json())
1
app.post('/login', (req, res) => {
    const code = req.body.code
    
    
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://192.168.0.39:5000/callback',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })
    


    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
            expiresIn: data.body['expires_in']
        })
    }).catch((err) => {
        console.error(err)
        res.status(err.statusCode).json(err.body.error)
    })
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://192.168.0.39:5000/callback',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body['access_token'],
            expiresIn: data.body['expires_in']
        })
    })
    .catch(err => {
        console.error(err);
        res.status(err.statusCode).json(err.body.error)
    })
})


const options = {
    key: fs.readFileSync('192.168.0.39+2-key.pem'),
    cert: fs.readFileSync('192.168.0.39+2.pem')
};

https.createServer(options, app).listen(3000, '192.168.0.39', () => {
    console.log('HTTPS server running on https://192.168.0.39:3000');
});
