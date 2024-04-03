const mongoose = require('mongoose');
require('dotenv').config();

const DB_Connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('\x1b[42m%s\x1b[0m', 'Database connected successfully');
    })
    .catch((error) => {
        console.error('\x1b[41m%s\x1b[0m', `Error connecting to database: ${error.message}`);
    });
};

module.exports = DB_Connect;
