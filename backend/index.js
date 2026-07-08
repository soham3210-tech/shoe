const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/user');
const Shoe = require('./models/shoe');

const authRouter = require('./routes/auth');
const shoesRouter = require('./routes/shoes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/shoes', shoesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Sync DB and start server
async function start() {
  await sequelize.sync();
  // Optionally create indexes or initial data elsewhere
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

start().catch(err => {
  console.error('Failed to start app', err);
  process.exit(1);
});

module.exports = app;
