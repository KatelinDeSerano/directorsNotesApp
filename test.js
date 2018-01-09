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


describe('Productions', function() {

    before(function() {
      return runServer();
    });
  
    after(function() {
      return closeServer();
    });
  
    it('should list user productions on GET', function() {
     
      return chai.request(app)
        .get('/productions/director/:user')
        .then(function(res) {
  
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
  
          res.body.should.have.length.of.at.least(1);
  
          res.body.forEach(function(item) {
            item.should.be.a('object');
            item.should.include.keys('_id', 'productionName', 'director', 'actors');
          });
        });
    });
})