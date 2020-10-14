const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
const { v4: uuidv4 } = require('uuid');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

let firtsItemId = "";
let putAddres = "";

// -------------- tests for GET ------------------------
describe('Test get all items', function() {

    before(function(){
        server.start();
    });

    describe('Get statuscode', function() {
        it("Should respond with statuscode 200", async function() {
            await chai.request(apiAddress)
            .get('/items')
            .then(response => {
                expect(response.statusCode).to.equal(200);
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Should have property: id", async function() {
            await chai.request(apiAddress)
            .get('/items')
            .then(response => {
                //console.log(response.body); Uncommet if you want to see items printed and see if test really works
                firtsItemId = response.body.items[0].id;
                expect(response.body.items[0]).to.have.a.property('id');
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Should have property: Category", async function() {
            await chai.request(apiAddress)
            .get('/items')
            .then(response => {
                expect(response.body.items[0]).to.have.a.property('Category');
            })
            .catch(error => {
                expect.fail(error)
            })
         })
    });
});
// --------------Test for POST--------------------------------
describe('Post new item', function() {
    it('Should post new item', async function() {
      await chai.request(apiAddress)
        .post('/items')
        .auth('JaaccoMura', 'Murica')
        .send({
                id: uuidv4(),
                Title: "Ilmaa",
                Description: "Vähän höngittyä",
                Category: "Oleellinen",
                Location: {
                 City: "Turku",
                  Country: "Suomi",
                  PostalCode: "815"
                },
                Images: "Ilmaa",
                AskingPrice: "10e",
                DateOfPosting: "Eilen",
                DeliveryType: "Posti",
                SellerName: "Seppo Sebastian",
                ContactInformation: "0400123123",
        })
        .then(response => {
          expect(response.status).to.equal(200);
        })
        .catch(error => {
          expect.fail(error)
        })
    })
    // Uncommet if you want to see items printed and see if test really works
    /*it("Print all items", async function() {
        await chai.request(apiAddress)
        .get('/items')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            expect.fail(error)
        })
     })*/
  })
//-------------------------- Test for PUT----------------------------------------------------------------

describe('Modify first item', function() {
    before(function() {
        putAddres = "/items/" + firtsItemId;
      })
    it('Should modify asking price for first item ', async function() {
      await chai.request(apiAddress)
        .put(putAddres)
        .auth('JaaccoMura', 'Murica')
        .send({
            AskingPrice: "13e"
        })
        .then(response => {
          expect(response.status).to.equal(200);
        })
        .catch(error => {
          expect.fail(error)
        })
    })
    // Uncomment if you want to see items printed and see if test really works
    /*it("Print all items", async function() {
        await chai.request(apiAddress)
        .get('/items')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            expect.fail(error)
        })
     })*/

  })

  //-------------- Test for DELETE-----------------------------------

  describe('Delete first item', function() {

    it('Should delete first item', async function() {
      await chai.request(apiAddress)
        .delete(putAddres)
        .auth('JaaccoMura', 'Murica')
        .send({
        })
        .then(response => {
          expect(response.status).to.equal(200);
        })
        .catch(error => {
          expect.fail(error)
        })
    })
    // Uncommet if you want to see items printed and see if test really works
    /*it("Print all items", async function() {
        await chai.request(apiAddress)
        .get('/items')
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            expect.fail(error)
        })
     })*/
  })
  
// ----------------- Tests for sorting ----------------------------------------------------------------
describe('Get items sorted by:', function() {
    after(function() {
        server.stop();
      })
        it("Sort by city: Turku", async function() {
            await chai.request(apiAddress)
            .get('/items/city/Turku')
            .then(response => {
                expect(response.statusCode).to.equal(200);
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Sort by category: Clothing ", async function() {
            await chai.request(apiAddress)
            .get('/items/category/Clothing')
            .then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.sortedItems[0].Category).to.equal("Clothing");
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Sort by date: descending", async function() {
            await chai.request(apiAddress)
            .get('/items/date/descending')
            .then(response => {
                expect(response.statusCode).to.equal(200);
            })
            .catch(error => {
                expect.fail(error)
            })
         })
         it("Sort by date: ascending", async function() {
            await chai.request(apiAddress)
            .get('/items/date/ascending')
            .then(response => {
                expect(response.statusCode).to.equal(200);
            })
            .catch(error => {
                expect.fail(error)
            })
         })
});