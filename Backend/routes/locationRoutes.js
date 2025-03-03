const express = require("express");
const router = express.Router();
const Location = require("../models/Location"); // Modeli çağırıyoruz

// Lokasyon arama API'si
router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const locations = await Location.find({ name: { $regex: query, $options: "i" } });
    console.log("MongoDB'den Gelen Veriler:", locations); // Konsola yazdır
    res.json(locations);
  } catch (err) {
    console.error("MongoDB Hatası:", err);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
