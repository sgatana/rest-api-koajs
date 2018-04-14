process.env.NODE_ENV='test'

const chai = require('chai');
const should = chai.should();
const chaihttp = require('chai-http');

chai.use(chaihttp);

const server = require('../app');

describe('routes', () => {
    it('should return json', (done) =>{
        chai.request(server)
        .get('/api/v1/movies')
        .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.be.eql('application/json');
            res.body.status.should.eql('success');
            res.body.message.should.eql('hello world');
            done();
        });
    });
});