require('dotenv').config();

const express = require('express')
const app = express()

const bearerToken = process.env.TWITTER_API_KEY;
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
})