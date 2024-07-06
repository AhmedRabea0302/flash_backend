import 'dotenv/config'
import Pusher from "pusher";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import axios from 'axios';

// App Config
const app = express();
const port = process.env.PORT || 8080;

// Middleware 
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

// Generate random token
const generateRandomToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

// Verify user credentials 
const verifyClientCredentials = (clientId, clientSecret) => {
    const validClientId = process.env.CLIENT_ID;
    const validClientSecret = process.env.CLIENT_SECRET;

    if (clientId === validClientId && clientSecret === validClientSecret) {
        const accessToken = generateRandomToken();
        return {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 3600
        };
    } else {
        return null;
    }
};

// Routes
app.get('/health', (req, res) => {
    res.status(200).send('Up and running');
});

app.post('/v1/auth/token', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({
            error: 'INVALID_CLIENT',
            error_description: 'Invalid client credentials.'
        });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [clientId, clientSecret] = credentials.split(':');

    const tokenResponse = verifyClientCredentials(clientId, clientSecret);

    if (tokenResponse) {
        res.status(200).json(tokenResponse);
    } else {
        res.status(401).json({
            error: 'INVALID_CLIENT',
            error_description: 'Invalid client credentials.'
        });
    }
});


app.post('/v1/orders', (req, res) => {
    const integrationId = req.body.integrationId;

    // Make a request for created orders service
    axios.get(`http://localhost:9000/orders?integrationId=${integrationId}`)
    .then((response) => {
        res.status(200).json(response?.data[0]);
    })
    .catch((error) => {
        res.sendStatus(500).json({"error": error})
        return;
    });
});


app.listen(port, () => {
    console.log('APP listening on port: ' + port);
});