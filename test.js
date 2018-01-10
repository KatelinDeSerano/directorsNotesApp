var chai = require('chai');
var chaiHttp = require('chai-http');
const { app, closeServer, runServer } = require('./server.js');


chai.use(chaiHttp);
var expect = require('chai').expect;


describe('director app unit tests', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });
  
    it('should take less than 500ms', function (done) {
        setTimeout(done, 300);
    });

    it('should take less than 500ms', function (done) {
        setTimeout(done, 300);
    });

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
  
    it('should list items on GET', function() {
      return chai.request(app)
      const userId = "5a47c3204f476e1e7be3ce69"
        .get('/productions/actor/userId')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.above(0);
          res.body.forEach(function(item) {
            expect(item).to.be.a('object');
            expect(item).to.have.all.keys(
              '_id', 'director', 'productionName', 'actors')
          });
        });
    });
})