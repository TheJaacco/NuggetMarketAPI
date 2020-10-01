const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());

let user = [
    {
        id: uuidv4(),
        passwordSet: false
    }
];

app.listen(port, () => {
    console.log('API says hello');
});

app.get('/', (req, res) => {
    //console.log(req) //check some stuff with this bad boy
    res.send('Some Bullshit')
});

app.get('/user', (req, res) => {
    res.json(user);
    res.sendStatus(404);
})

app.post('/todo', (req, res) => {
    console.log('Post request received!');
    res.send('Working');
});