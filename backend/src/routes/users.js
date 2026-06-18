const express = require('express');
const router = express.Router();

// In-memory storage
const users = new Map();

router.post('/subscribe', (req, res) => {
  try {
    const { vid, telegramId } = req.body;

    if (!vid || !telegramId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = {
      vid,
      telegramId,
      active: true,
      createdAt: new Date()
    };

    users.set(vid, user);
    res.status(201).json({ message: 'Subscription created', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:vid', (req, res) => {
  try {
    const user = users.get(req.params.vid);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:vid', (req, res) => {
  try {
    const user = users.get(req.params.vid);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const updatedUser = { ...user, ...req.body };
    users.set(req.params.vid, updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:vid', (req, res) => {
  try {
    users.delete(req.params.vid);
    res.json({ message: 'Subscription deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
