const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5000;

// REPLACE this with your actual Bearer Token
const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEiF1wEAAAAAxvsjsZWgKmvj1aBj8NhqH3HHIwA%3DcHuv0lEtkY1Oqn5tP9JxHavjExbdgNtU1mPspBHZz678JI1lS1';

// Enable CORS if your frontend and backend are on different ports/domains
app.use(cors());

app.get('/api/followers/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // 1. Get user ID from username
    const userResp = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
      }
    );
    const userData = await userResp.json();
    if (!userData.data) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userId = userData.data.id;

    // 2. Get followers count
    const detailsResp = await fetch(
      `https://api.twitter.com/2/users/${userId}?user.fields=public_metrics`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
      }
    );
    const detailsData = await detailsResp.json();
    const followers = detailsData.data.public_metrics.followers_count;

    res.json({
      username,
      followers,
      date: new Date().toISOString().slice(0, 10)
    });
  } catch (err) {
    res.status(500).json({ error: 'API error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
