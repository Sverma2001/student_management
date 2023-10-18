const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const router = require('./router');
require('dotenv').config();
require('./db/mongoose');
const port = process.env.PORT
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log('Server is listening on port ' , port);
})
