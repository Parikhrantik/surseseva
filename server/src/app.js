// src/app.js
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/competition', competitionRoutes);
app.use('/performance', performanceRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// const crypto = require('crypto');
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);
module.exports = app;
