const express = require('express');
const Shoe = require('../models/shoe');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const router = express.Router();

// Simple auth middleware for protected routes
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// List shoes with simple pagination
router.get('/', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
  const offset = parseInt(req.query.offset || '0', 10);
  const shoes = await Shoe.findAll({ limit, offset });
  res.json(shoes);
});

router.get('/:id', async (req, res) => {
  const shoe = await Shoe.findByPk(req.params.id);
  if (!shoe) return res.status(404).json({ error: 'Not found' });
  res.json(shoe);
});

router.post('/', authenticate, async (req, res) => {
  try {
    const payload = req.body;
    const shoe = await Shoe.create(payload);
    res.status(201).json(shoe);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const shoe = await Shoe.findByPk(req.params.id);
  if (!shoe) return res.status(404).json({ error: 'Not found' });
  await shoe.update(req.body);
  res.json(shoe);
});

router.delete('/:id', authenticate, async (req, res) => {
  const shoe = await Shoe.findByPk(req.params.id);
  if (!shoe) return res.status(404).json({ error: 'Not found' });
  await shoe.destroy();
  res.status(204).end();
});

module.exports = router;
