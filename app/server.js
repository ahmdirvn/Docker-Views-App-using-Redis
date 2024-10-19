const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

// Buat client Redis
const client = createClient({
    url: 'redis://redis:6379', // Ganti dengan URL Redis Anda
});

// Coba untuk terhubung ke Redis
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

app.get('/increment', async (req, res) => {
    try {
        await client.incr('views');
        const views = await client.get('views');
        res.json({ views: parseInt(views) });
    } catch (error) {
        console.error('Error incrementing views:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/views', async (req, res) => {
    try {
        const views = await client.get('views');
        res.json({ views: parseInt(views) || 0 });
    } catch (error) {
        console.error('Error getting views:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
