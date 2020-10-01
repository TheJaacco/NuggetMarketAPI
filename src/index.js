const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('API says hello');
});

app.get('/', (req, res) => {
    console.log(req)
    res.send('Hello Nugget!')
});
