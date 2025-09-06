const express = require('express');
const router = express.Router();

// GET user profile
router.get('/profile', (req, res) => {
  res.json({
    message: 'User profile endpoint',
    user: {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com'
    }
  });
});

module.exports = router;