const mongoose = require('mongoose');
require('dotenv').config();
const mongodb=mongoose.connect(process.env.MONGO_URI,{family: 4 }
).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

module.exports=mongodb;