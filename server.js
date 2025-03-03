require('dotenv').config();  // .env dosyasındaki bilgileri yükler
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());  // CORS hatalarını engeller
app.use(express.json());  // JSON verilerini işlemek için

// MongoDB bağlantısını burada yapıyoruz
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    });


// Ana sayfa route'u
app.get('/', (req, res) => {
    res.send('YouGuide API is running...');
});

// Sunucuyu başlatıyoruz
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const locationRoutes = require('./routes/locationRoutes');
app.use('/api/locations', locationRoutes);
const Location = require("./models/Location");



const seedDatabase = async () => {
  const existing = await Location.find();
  if (existing.length === 0) {
    await Location.create([
      { name: "Toronto", lat: 43.6532, lng: -79.3832 },
      { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
      { name: "New York", lat: 40.7128, lng: -74.0060 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Paris", lat: 48.8566, lng: 2.3522 }
    ]);
    console.log("✅ Test verileri başarıyla eklendi!");
  } else {
    console.log("✅ Veritabanı zaten dolu, ekleme yapılmadı.");
  }
};
seedDatabase();
