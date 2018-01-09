var chai = require('chai');
var chaiHttp = require('chai-http');
const { app, closeServer, runServer } = require('./server.js');
//var request = require('request');


//const should = chai.should();
chai.use(chaiHttp);
var expect = require('chai').expect;

describe('Productions', function() {

    before(function() {
      return runServer();
    });
  
    after(function() {
      return closeServer();
    });
  
    it('should list productions on GET', function() {
        return chai.request('localhost/directors-notes-app');
        const userId = "5a47c3204f476e1e7be3ce69"
          .get('/productions/director/userId')
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