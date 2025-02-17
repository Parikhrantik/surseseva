// src/app.js
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const presentEvntRoutes = require('./src/routes/presentEventRoutes');

const competitionRoutes = require('./src/routes/competitionRoutes');
const performanceRoutes = require('./src/routes/performanceRoutes');
const contactUsRoutes = require('./src/routes/contactUsRoutes');
const competitionManagemenRoutes = require('./src/routes/competitionManagemenRoutes');
const voteRoutes = require('./src/routes/voteRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));



app.get('/', (req, res) => {
  res.send('Welcome!');
});

// Use routes
app.use(userRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Increase the body size limit for incoming requests (default 100kb)
app.use(bodyParser.json({ limit: '100mb' })); // or '100mb' based on your file size
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/events', presentEvntRoutes);
app.use('/contact', contactUsRoutes);
app.use('/competition', competitionRoutes);
app.use('/performance', performanceRoutes);
app.use('/competitionMangement', competitionManagemenRoutes);
app.use('/vote', voteRoutes);

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
