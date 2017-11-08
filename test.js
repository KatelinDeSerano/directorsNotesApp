const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server.js');
//var request = require('request');

const should = chai.should();
chai.use(chaiHttp);
var expect  = require('chai').expect;


describe('director app unit tests', function() {

    it('should verify server is running', function() {
        return chai.request(server)
        .get('/')
        .then(function(res) {
            expect(res).to.have.status(200);
        });
    });
});
    


