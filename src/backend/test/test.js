const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../server')

//Assertion Style
chai.expect();
chai.use(chaiHttp);

// Health Check
describe('Health Check', () => {
    // Test the GET Endpoint
    describe('GET /api/v1/health', () => {
        it('It should GET a healthy response', (done) => {
            chai.request(server)
                .get('/api/v1/health')
                .end((err, response) => {
                    expect(response.status).to.be.equal(200);
                    done();
                })
        })
    });
});
