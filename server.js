require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

const bearerToken = process.env.TWITTER_API_KEY;
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/get-account-profile/:IDs', async (req, res) => {
    const IDs = req.params['IDs'];
    console.log("requesting for ID:", IDs);

    await axios.get(`https://api.twitter.com/1.1/users/lookup.json?user_id=${IDs}`, {
        "headers": {
            'Authorization': `Bearer ${bearerToken}`
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(error.response.status);
        res.json(error);
    })
})

app.get('/handle-search/:accountName', async (req, res) => {
    const accountName = req.params['accountName'];
    console.log("searching for account name:", accountName);

    await axios.get(`https://api.twitter.com/1.1/users/search.json?q=${accountName.replace("/", "")}`, {
        "headers": {
            'Authorization': `Bearer ${bearerToken}`
        }
    })
    .then(response => {
        // console.log(response.data)
        res.json(response.data);
    })
    .catch(error => {
        res.status(error.response.status);
        res.json(error);
    })
})

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
})