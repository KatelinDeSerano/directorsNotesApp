var chai = require('chai');
var chaiHttp = require('chai-http');
const faker = require('faker');
const { app, closeServer, runServer } = require('./server.js');
const { TEST_DATABASE_URL } = require('./config.js');
//var request = require('request');


const should = chai.should();
chai.use(chaiHttp);

// function seedUsersData() {
//     console.info('seeding users data');
//     const seedData = [];
//     for (let i = 1; i <= 10; i++) {
//       seedData.push({
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: lastName.toLowerCase()+'@'+faker.internet.domainName(),
//         userType: faker.lorem.sentence(),
//       });
//     }
//     // this will return a promise
//     return BlogPost.insertMany(seedData);
//   }
  
  
  describe('directors notes API resource', function () {
  
    before(function () {
      return runServer(TEST_DATABASE_URL);
    });
  
    beforeEach(function () {
      return seedBlogPostData();
    });
  
    // afterEach(function () {
    //   // tear down database so we ensure no state from this test
    //   // effects any coming after.
    //   return tearDownDb();
    // });
  
    after(function () {
      return closeServer();
    });
  })

// describe('director app unit tests', function () {
//     before(function () {
//         return runServer();
//     });
//     after(function () {
//         return closeServer();
//     });

//     //dummy test
//     it('should take less than 500ms', function (done) {
//         setTimeout(done, 300);
//     });

//     //dummy test
//     it('should take less than 500ms', function (done) {
//         setTimeout(done, 300);
//     });

//     //test server running
//     it('should verify server is running', function () {
//         return chai.request('http://localhost:8080/')
//             .get('/')
//             .then(function (res) {
//                 expect(res).to.have.status(200);
//             })
//     });

// });

// describe('Productions', function() {

//     before(function() {
//       return runServer();
//     });
  
//     after(function() {
//       return closeServer();
//     });
  
//     it('should list items on GET', function() {
//       return chai.request(app)
//       const userId = "5a47c3204f476e1e7be3ce69"
//         .get('/productions/actor/userId')
//         .then(function(res) {
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.a('array');
//           expect(res.body.length).to.be.above(0);
//           res.body.forEach(function(item) {
//             expect(item).to.be.a('object');
//             expect(item).to.have.all.keys(
//               '_id', 'director', 'productionName', 'actors')
//           });
//         });
//     });
// })