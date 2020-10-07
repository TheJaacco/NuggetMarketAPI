const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());
let dateObj = new Date();
let currTime = dateObj.getDate() + "." + dateObj.getMonth() + "." + dateObj.getFullYear(); 

let user = [
    {
        id: uuidv4(),
        FullName: "Jaakko"

    }
];

let items = [
    {
        id: uuidv4(),
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
        DateOfPosting: currTime,
        DeliveryType: "Posti",
        SellerName: "Jaakko Nugget",
        ContactInformation: "0400123123"
      }
];

app.listen(port, () => {
    console.log('API says hello');
});

// ------------------items part--------------------------------------------

// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});
 
// get spesific item
app.get('/items/:id', (req, res) => {
    const result = items.find(t => t.id == req.params.id);
    if(result !== undefined)
    {
        res.json(result);
    }
    else
    {
        res.sendStatus(404);
    }
})
// Create new item
app.post('/items', (req, res) => {
    const newItem = {
        id: uuidv4(),
        Title: req.body.Title,
        Description: req.body.Description,
        Category: req.body.Category,
        Location: {
          City: req.body.Location.City,
          Country: req.body.Location.Country,
          PostalCode: req.body.Location.PostalCode,
        },
        Images: req.body.Images,
        AskingPrice: req.body.AskingPrice,
        DateOfPosting: currTime,
        DeliveryType: req.body.DeliveryType,
        SellerName: req.body.SellerName,
        ContactInformation: req.body.ContactInformation,
    };

items.push(newItem);
res.sendStatus(200);
});
// Modify information on item
app.put('/items/:id', (req, res) =>{
    const result = items.find(t => t.id == req.params.id);
    if(result !== undefined)
    {
        for(const key in req.body)
        {
            result[key] = req.body[key];
        }
        res.sendStatus(200)
    }
    else{
        res.sendStatus(404)
    }
});
// Delete item
app.delete('/items/:id', (req, res)=>{
    const result = items.find(t => t.id == req.params.id);
    if(result !== -1)
    {
        items.splice(result, 1);
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
    }
});

//-------------------- User part ----------------------------------------------
app.get('/user', (req, res) => {
    res.json(user);
    res.sendStatus(404);
})

// -------------------- Login part----------------------------------------------
