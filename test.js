const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, closeServer, runServer} = require('./server.js');
//var request = require('request');


const should = chai.should();
chai.use(chaiHttp);
var expect  = require('chai').expect;


describe('director app unit tests', function() {
    before(function() {
        return runServer();
    });
    after(function() {
        return closeServer();
    });

    it('should verify server is running', function(done) {
        return chai.request(app)
        .get('/')
        .then(function(res) {
            expect(res).to.have.status(200);
        });
        done();
    });
});
    


