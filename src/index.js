const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const app = express()
const port = 3000

app.use(bodyParser.json());
let dateObj = new Date();
let currTime = dateObj.getDate() + "." + dateObj.getMonth() + "." + dateObj.getFullYear(); 

let users = [
    {
        id: uuidv4(),
        FullName: "Mister X",
        UserName: "JaaccoMura",
        Email: "NoneOfYerBisness@fuckU.com",
        Address: "Nugettikuja 6",
        Country: "Svenska",
        PhoneNumber: "280357289",
        Password: "Jaakon homma"
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
// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});
 
// get spesific user
app.get('/users/:id', (req, res) => {
    const result = users.find(t => t.id == req.params.id);
    if(result !== undefined)
    {
        res.json(result);
    }
    else
    {
        res.sendStatus(404);
    }
})
// Create new user
app.post('/users', (req, res) => {
    const newUser = {
        id: uuidv4(),
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        Address: req.body.Address,
        Country: req.body.Country,
        PhoneNumber: req.body.PhoneNumber,
        Password: req.body.Password
    };

users.push(newUser);
res.sendStatus(200);
});
// Modify information on user
app.put('/users/:id', (req, res) =>{
    const result = users.find(t => t.id == req.params.id);
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
// Delete user
app.delete('/users/:id', (req, res)=>{
    const result = users.find(t => t.id == req.params.id);
    if(result !== -1)
    {
        users.splice(result, 1);
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
    }
});

// -------------------- Login part----------------------------------------------
//--HTTP Basic Auth--//
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(username, password, done) {
        const user = users.getUserByName(username);
        if(user == undefined) {
            console.log('Username not found');
            return done(null, false, { message: "HTTP Basic username not found"});
        }
        if(bcrypt.compareSync(password, user.password) == false) {
            console.log('Password does not match username')
            return done(null, false, { message: "HTTP Basic password not found"})
        }
        return done(null, user);
    }
<<<<<<< HEAD
));
=======
));

app.post('/registerUser', (req, res) => {
    if('username' in req.body == false) {
        res.status(400);
        res.json({status: "No username"})
        return;
    }
    if('password' in req.body == false) {
        res.status(400);
        res.json({status: "No password"})
        return;
    }
    if('email' in req.body == false) {
        res.status(400);
        res.json({status: "No email"})
        return;
    }
});
>>>>>>> 2f7e37b... Started Login part with http basic auth
