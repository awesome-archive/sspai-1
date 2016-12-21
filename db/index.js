const config = require('../config/index.js');
const mongoose = require('mongoose');
// Connect to mongodb
mongoose.connect(config.mongoDB, { server: { socketOptions: { keepAlive: 1 } } });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));