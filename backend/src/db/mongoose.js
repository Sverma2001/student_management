require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: true,
})
    .then(() => {
        console.log("MongoDb connected successfully");
    }).catch((err) => {
        console.log(err);
    })