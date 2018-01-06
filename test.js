var chai = require('chai');
var chaiHttp = require('chai-http');
const { app, closeServer, runServer } = require('./server.js');
//var request = require('request');


//const should = chai.should();
chai.use(chaiHttp);
var expect = require('chai').expect;


describe('director app unit tests', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });

    //dummy test
    it('should take less than 500ms', function (done) {
        setTimeout(done, 300);
    });

    //dummy test
    it('should take less than 500ms', function (done) {
        setTimeout(done, 300);
    });

    //test server running
    it('should verify server is running', function () {
        return chai.request('http://localhost:8080/')
            .get('/')
            .then(function (res) {
                expect(res).to.have.status(200);
            })
    });

});



