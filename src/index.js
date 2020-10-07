const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());
let dateObj = new Date();
let currTime = dateObj.getDate(); 

let user = [
    {
        id: uuidv4(),
        passwordSet: false
    }
];

let items = [
    {
        Id: "007",
        Title: "Nuggetteja halvalla",
        Description: "Hyväkuntoisia vähän syötyjä nuggetteja halvalla, voin lämmittää lisämaksusta",
        Category: "Ruoka",
        Location: {
         City: "Oulu",
          Country: "Suomi",
          PostalCode: "95414"
        },
        Images: "*kuva nuggetista*",
        AskingPrice: "200e",
        DateOfPosting: dateObj.getDate(),
        DeliveryType: "Posti",
        SellerName: "Jaakko Nugget",
        ContactInformation: "0400123123"
      }
];

app.listen(port, () => {
    console.log('API says hello');
});

// ------------------items part--------------------------------------------
app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/todos/:id', (req, res) => {
    const result = todos.find(t => t.id == req.params.id);
    if(result !== undefined)
    {
        res.json(result);
    }
    else
    {
        res.sendStatus(404);
    }
})

app.post('/items', (req, res) => {
    console.log('Post request received!');
    res.send('Working');
});

//-------------------- User part ----------------------------------------------
app.get('/user', (req, res) => {
    res.json(user);
    res.sendStatus(404);
})

// -------------------- Login part----------------------------------------------
