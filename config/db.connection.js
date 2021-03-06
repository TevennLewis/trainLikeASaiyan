const mongoose = require('mongoose');

require('dotenv').config();

const connectionStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/train';

mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected ๐ค๐ค๐ค !');
});

mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error ๐ญ๐ญ !', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected  โกโกโก !');
});