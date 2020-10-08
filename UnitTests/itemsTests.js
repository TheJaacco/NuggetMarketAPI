const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const expect = chai.expect;


describe('Slot operations', function() {

    before(function(){
        server.start();
    });

    after(function(){
        server.stop();
    })

    describe('Read slots',function() {
        it("Should respond with an array of slots", function() {
            chai.request("http://localhost:3000")
            .get('/slots')
            .then(response => {
                console.log(response);
                
            })
        })
    })
})