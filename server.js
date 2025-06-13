// --- File: server.js ---

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(express.static(__dirname));


app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'requests.json');

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

// Get all requests
app.get('/requests', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Add new request
app.post('/requests', (req, res) => {
  const { name, city } = req.body;
  const newEntry = { name, city, status: 'pending', eta: null };
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(201).json({ success: true });
});

// Update status and ETA
app.put('/requests/:name', (req, res) => {
  const { status, eta } = req.body;
  const name = req.params.name;
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const user = data.find(d => d.name === name);
  if (user) {
    user.status = status;
    user.eta = eta;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Mazda Airlines backend running at http://localhost:${PORT}`);
});
