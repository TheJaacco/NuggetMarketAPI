const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const app = express()
const port = 3000

app.use(bodyParser.json());
let dateObj = new Date();
let currTime = dateObj.getFullYear() +"-" +dateObj.getMonth() +"-" + dateObj.getDate(); 

// -------------------- Login part----------------------------------------------
//--HTTP Basic Auth--//
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(UserName, Password, done) {
        const user = getUserByName(UserName);
        if(user == undefined) {
            console.log('Username not found');
            return done(null, false, { message: "HTTP Basic username not found"});
        }
        if(bcrypt.compareSync(Password, user.Password) == false) {
            console.log('Password does not match username')
            return done(null, false, { message: "HTTP Basic password not found"})
        }
        return done(null, user);
    }
));

let users = [
    {
        id: uuidv4(),
<<<<<<< HEAD
        FullName: "Mister X",
        UserName: 'JaaccoMura',
        Email: "NoneOfYerBisness@fuckU.com",
        Address: "Nugettikuja 6",
        Country: "Svenska",
        City: "Turku",
        Phonenumber: "280357289",
        Password: "Nugetti"
=======
        FullName: "Admin",
        UserName: "Admin",
        Email: "admin@nugget.market.com",
        Address: "internet",
        Country: "Suomi",
        PhoneNumber: "669669",
        Password: "$2a$06$Wau95gszbzDUqg/AsHT54uaKv5Yoc7OQwju7hVAYQQ8az58BKC9AO" // Adminpassword
>>>>>>> 851661c... Admin and User logins, moved auth to top
    },
    {
        id: uuidv4(),
        FullName: "Toni Puh",
        UserName: "Puha123",
        Email: "puha@seppo.com",
        Address: "Metsokankaan",
        Country: "Ruptis",
        City: "Oulu",
        Phonenumber: "56516581",
        Password: "$2a$06$BY/CLNfLX7oOw9e/8X8pq.oLX2cHYuYSfB9lGceEPw78VrDQ32kYC" // Murica
        },
];

getUserById: (id) => users.find(u => u.id == id);
function getUserByName(UserName) {
    return users.find(u => u.UserName == UserName)  
}

function addUser(UserName, Email, Password){
    users.push({
        id: uuidv4(),
        UserName,
        Email,
        Password
    });
}

let items = [
    {
        id: uuidv4(),
        Title: "Chicken nuggets for cheap!",
        Description: "Good nuggets, just little bit eaten, can heat it up for you for extra price!",
        Category: "Food",
        Location: {
         City: "Oulu",
          Country: "Finland",
          PostalCode: "95414"
        },
        Images: "*URL for nugget*",
        AskingPrice: "200e",
        DateOfPosting: "2019-06-07",
        DeliveryType: "Post",
        SellerName: "Jaakko Nugget",
        ContactInformation: "0400123123"
      },
      {
        id: uuidv4(),
        Title: "Socks",
        Description: "Not any holes(not even that where you put your feet in)",
        Category: "Clothing",
        Location: {
         City: "Oulu",
          Country: "Finland",
          PostalCode: "95414"
        },
        Images: "",
        AskingPrice: "25e",
        DateOfPosting: "2011-01-01",
        DeliveryType: "Pickup only",
        SellerName: "Jaakko Nugget",
        ContactInformation: "0400123123"
      },
      {
        id: uuidv4(),
        Title: "Underwear (men)",
        Description: "Little dirty",
        Category: "Clothing",
        Location: {
         City: "Turku",
          Country: "Finland",
          PostalCode: "95414"
        },
        Images: "*Pic of tighty whities*",
        AskingPrice: "40e",
        DateOfPosting: "2017-02-16",
        DeliveryType: "Post",
        SellerName: "Teppo Taneli",
        ContactInformation: "0400123122"
      }
];
// Functions to start and stop server (for testing)
let apiInstance = null;
exports.start = () =>{
    apiInstance= app.listen(port, () => {
        console.log(`APIna says hello`)
      })
}
exports.stop = () =>{
    apiInstance.close();
}

// ------------------items part--------------------------------------------

// start page
app.get('/', (req, res) => {
    res.send("<b>Welcome to NuggetMarket, best marketplace on galaxy!</b>" +
    '<br><br>Documentation: <a href="https://app.swaggerhub.com/apis-docs/Tahkamura/nugget-market/1.0#/" target="_blank">Here</a>' +
    '<br><br><b>Admin login information</b><br><br>Username: Admin<br>Password: Adminpassword' +
    '<br><br>To login as user, use postman to create new user(POST) or use existing user information and then try to <br>example create new item with postman by choosing basic authentication and adding yor newly created(or existing) username and password.'
    );
});

// Get all items
app.get('/items', (req, res) => {
    res.json({items});
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
app.delete('/items/:id', passport.authenticate('basic', { session: false }), (req, res)=>{
    if(req.user.UserName === "Admin"){
        const result = items.find(t => t.id == req.params.id);
        if(result !== -1)
        {
            items.splice(result, 1);
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    }
});
//Get items by Category
app.get('/items/category/:id', (req, res) => {
    let sortedItems = [];
    for(let i = 0;i<items.length;i++)
    {
        if(items[i].Category === req.params.id)
        {
            sortedItems.push(items[i]);
        }
    }
    res.json({sortedItems});
});
// get items by date
app.get('/items/date/:id', (req, res) => {

    function sortByAscending(a, b){
        return new Date(a.DateOfPosting).getTime() - new Date(b.DateOfPosting).getTime();
    }
    function sortByDescending(a, b){
        return new Date(b.DateOfPosting).getTime() - new Date(a.DateOfPosting).getTime();
    }
    if(req.params.id === "ascending")
    {
        items.sort(sortByAscending);
    }
    if(req.params.id === "descending")
    {
        items.sort(sortByDescending);
    }
    res.json({items});
});
//get items by city
app.get('/items/city/:id', (req, res) => {
    let city = [];
    for(let i = 0;i<items.length;i++)
    {
        if(items[i].Location.City === req.params.id)
        {
            city.push(items[i]);
        }
    }
    res.json({city});
});
//-------------------- User part ----------------------------------------------
// Get all users
app.get('/users', passport.authenticate('basic', { session: false }), (req, res) => {
    console.log("logged as: " + req.user.UserName)
    if(req.user.UserName === "Admin"){
        res.json(users);
    }
    
});
 
// Get specific user as Admin
app.get('/users/:id', passport.authenticate('basic', { session: false }), (req, res) => {
    if(req.user.UserName === "Admin"){
        const result = users.find(t => t.id == req.params.id);
        if(result !== undefined)
        {
            res.json(result);
        }
        else
        {
            res.sendStatus(404);
        }
    }
})
// Get own user as user
app.get('/users/:id', passport.authenticate('basic', { session: false }), (req, res) => {
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
app.post('/users', passport.authenticate('basic', { session: false }), (req, res) => {
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
app.put('/users/:id', passport.authenticate('basic', { session: false }), (req, res) =>{
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
app.delete('/users/:id', passport.authenticate('basic', { session: false }), (req, res)=>{
    if(req.user.UserName === "Admin"){
        const result = users.find(t => t.id == req.params.id);
        if(result !== -1)
        {
            users.splice(result, 1);
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    }
});
/*
// -------------------- Login part----------------------------------------------
//--HTTP Basic Auth--//
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(UserName, Password, done) {
        const user = getUserByName(UserName);
        if(user == undefined) {
            console.log('Username not found');
            return done(null, false, { message: "HTTP Basic username not found"});
        }
        if(bcrypt.compareSync(Password, user.Password) == false) {
            console.log('Password does not match username')
            return done(null, false, { message: "HTTP Basic password not found"})
        }
        return done(null, user);
    }
));
*/

app.get('/login',
        passport.authenticate('basic', { session: false }),
        (req, res) => {
  res.json({
    resourse: "Logged in successfully"
  });
});

app.post('/registerUser', (req, res) => {
    if('UserName' in req.body == false) {
        res.status(400);
        res.json({status: "No username"})
        return;
    }
    if('Password' in req.body == false) {
        res.status(400);
        res.json({status: "No password"})
        return;
    }
    if('Email' in req.body == false) {
        res.status(400);
        res.json({status: "No email"})
        return;
    }

    const hashPassword = bcrypt.hashSync(req.body.Password, 6);
    console.log(hashPassword);
    addUser(req.body.UserName, req.body.Email, hashPassword);
    res.status(201).json({status: "User added"});
});

// Check if Admin
function isAdmin(req, res, next) {
    if (req.isAuthenticated()){
        if(req.body.UserName == "Admin"){
            next();
        }     
    }
}

//Check if normal user
function isUser(req, res, next) {
    if (req.isAuthenticated()) {
        next();  
    }
    else{
        res.json({
            resourse: "Auth failed"
          });
    }
}