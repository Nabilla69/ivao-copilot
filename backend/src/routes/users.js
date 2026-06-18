const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/subscribe', async (req, res) => {
  try {
    const { vid, telegramId, simbreefLink } = req.body;

    if (!vid || !telegramId || !simbreefLink) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let user = await User.findOne({ vid });
    if (user) {
      user = await User.findOneAndUpdate({ vid }, { telegramId, simbreefLink }, { new: true });
    } else {
      user = new User({ vid, telegramId, simbreefLink, active: true });
      await user.save();
    }

    res.status(201).json({ message: 'Subscription created', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:vid', async (req, res) => {
  try {
    const user = await User.findOne({ vid: req.params.vid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:vid', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { vid: req.params.vid },
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:vid', async (req, res) => {
  try {
    await User.findOneAndDelete({ vid: req.params.vid });
    res.json({ message: 'Subscription deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
