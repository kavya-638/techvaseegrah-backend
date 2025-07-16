const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Load variables from .env

const app = express();
const PORT = 5000;

// 🔐 API KEY from .env file
const API_KEY = process.env.API_KEY;

// 🔐 Middleware to check API key
const checkApiKey = (req, res, next) => {
  const clientKey = req.headers["x-api-key"];
  if (clientKey !== API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  next();
};

app.use(cors());
app.use(express.json());

// 🔢 Sample Data
const instaxbotData = [
  { date: '2025-07-07', amount: 1200 },
  { date: '2025-07-08', amount: 900 },
  { date: '2025-07-09', amount: 1600 }
];

const f3Data = [
  { date: '2025-07-07', amount: 800 },
  { date: '2025-07-08', amount: 600 },
  { date: '2025-07-09', amount: 1000 }
];

const shoppifyData = [
  { date: '2025-07-07', amount: 1500 },
  { date: '2025-07-08', amount: 2000 },
  { date: '2025-07-09', amount: 1800 }
];

const gowhatsData = [
  { date: '2025-07-07', amount: 1100 },
  { date: '2025-07-08', amount: 1400 },
  { date: '2025-07-09', amount: 1300 }
];

const billzzyData = [
  { date: '2025-07-07', amount: 950 },
  { date: '2025-07-08', amount: 700 },
  { date: '2025-07-09', amount: 1200 }
];

// 🔐 Apply checkApiKey to all data routes
app.get('/api/instaxbot', checkApiKey, (req, res) => res.json(instaxbotData));
app.get('/api/f3', checkApiKey, (req, res) => res.json(f3Data));
app.get('/api/shoppify', checkApiKey, (req, res) => res.json(shoppifyData));
app.get('/api/gowhats', checkApiKey, (req, res) => res.json(gowhatsData));
app.get('/api/billzzy', checkApiKey, (req, res) => res.json(billzzyData));

// 🔓 Login route (NO API key needed for login)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    res.status(200).json({ key: API_KEY }); // ✅ Send key if needed
  } else {
    res.sendStatus(401);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
