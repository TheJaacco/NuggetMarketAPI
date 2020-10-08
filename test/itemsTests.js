const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

// -------------- tests for GET ------------------------
describe('Test get all items', function() {

    before(function(){
        server.start();
    });

    after(function(){
        server.stop();
    })

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
