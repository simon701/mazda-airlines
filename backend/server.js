const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const requestsRoutes = require('./routes/requestsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestsRoutes);

app.get('/', (req, res) => res.send('🛫 Mazda Airlines API'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
