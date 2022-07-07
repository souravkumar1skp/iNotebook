const connectToMongo = require('./db');
const express = require('express');
// const bodyparser= require("body-parser");

connectToMongo();
const app = express()
const port = 5000

app.use(express.json());
// app.use(bodyparser.urlencoded({extended: true}));

app.use('/api/auth',require('./routes/auth.js'));
// app.use('/api/notes',require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
