const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: 'Query is required' });

    res.json({ message: `Searching for ${query}` });
});

module.exports = router;
