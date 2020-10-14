const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
const { v4: uuidv4 } = require('uuid');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

let firtsUserId = "";
let putAddres = "";
let lastUserAddres =""

// -------------- tests for GET ------------------------
describe('Test get all users', function() {

    before(function(){
        server.start();
    });

    describe('Get statuscode', function() {
        it("Should respond with statuscode 200", async function() {
            await chai.request(apiAddress)
            .get('/users')
            .auth('Admin', 'Adminpassword')
            .then(response => {
                expect(response.statusCode).to.equal(200);
                firtsUserId = response.body[0].id;
                lastUserAddres ='/users/' + response.body[2].id;
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Should have property: FullName", async function() {
            await chai.request(apiAddress)
            .get('/users')
            .auth('Admin', 'Adminpassword')
            .then(response => {
                //console.log(response.body); //Uncommet if you want to see users printed and see if test really works
                expect(response.body[0]).to.have.a.property('FullName');
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Should have property: Email", async function() {
            await chai.request(apiAddress)
            .get('/users')
            .auth('Admin', 'Adminpassword')
            .then(response => {
                expect(response.body[0]).to.have.a.property('Email');
            })
            .catch(error => {
                expect.fail(error)
            })
         })
    });
});
// --------------Test for POST--------------------------------
describe('Post new user', function() {
    it('Should post new user', async function() {
      await chai.request(apiAddress)
        .post('/users')
        .send({
            id: uuidv4(),
            FullName: "Sepi Testeri",
            UserName: 'Test44j4',
            Email: "testi@mai.com",
            Address: "Testikuja 6",
            Country: "Somalia",
            PhoneNumber: "98465498",
            Password: '8489616516661',
        })
        .then(response => {
          expect(response.status).to.equal(200);
        })
        .catch(error => {
          expect.fail(error)
        })
    })
    // Uncommet if you want to see users printed and see if test really works
    /*it("Print all items", async function() {
        await chai.request(apiAddress)
        .get('/users')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            expect.fail(error)
        })
     })*/
  })
//-------------------------- Test for PUT----------------------------------------------------------------

describe('Modify first user', function() {
    before(function() {
        putAddres = "/users/" + firtsUserId;
      })
    it('Should modify username for first user ', async function() {
      await chai.request(apiAddress)
        .put(putAddres)
        .auth('JaaccoMura', 'Murica')
        .send({
            UserName: "ToimiikoTesti"
        })
        .then(response => {
          expect(response.status).to.equal(200);
        })
        .catch(error => {
          expect.fail(error)
        })
    })
    // Uncomment if you want to see users printed and see if test really works
   /*it("Print all users", async function() {
        await chai.request(apiAddress)
        .get('/users')
        .auth('Admin', 'Adminpassword')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            expect.fail(error)
        })
     })*/

  })

  //-------------- Test for DELETE-----------------------------------

  describe('Delete third user', function() {
    after(function() {
        server.stop();
      })
    it('Should delete third user', async function() {
      await chai.request(apiAddress)
        .delete(lastUserAddres)
        .auth('Puha123', 'Murica')
        .send({
        })
        .then(response => {
          expect(response.status).to.equal(200);
        })
        .catch(error => {
          expect.fail(error)
        })
    })
    // Uncommet if you want to see users printed and see if test really works
    /*it("Print all items", async function() {
        await chai.request(apiAddress)
        .get('/users')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            expect.fail(error)
        })
     })*/
  })