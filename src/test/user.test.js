import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import User from '../models/User';
import app from '..';
import {
  badUser,
  malUser,
  newUser,
  otherUser,
  user,
} from '../utils/testData';

dotenv.config();

chai.should();
chai.use(chaiHttp);

let id;
let token;

describe('Posts', () => {
  before((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  before(async () => {
    await chai.request(app).post(`/api/v1/create`).send(newUser);
  });
  before(async () => {
    const response = await chai.request(app).post('/api/v1/login').send(user);
    token = response.body.data.accessToken;
  });

  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('🔽🔽 /POST user', () => {
    it('✅✅ it POST a user with correct and complete fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/create')
        .send(otherUser)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('user created');
          chai.expect(res.body.data).to.be.a('object');
          chai.expect(res.req.method).to.equal('POST');
          chai.expect(res.req.path).to.equal('/api/v1/create');
          id = res.body.data._id;
          done();
        });
    });
    it('❌❌ It should not POST a post with incomplete correct incorrect fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/create')
        .send(badUser)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('required fields');
          done();
        });
    });
    it('❌❌ It should POST an already created user', (done) => {
      chai
        .request(app)
        .post('/api/v1/create')
        .send(otherUser)
        .end((err, res) => {
          chai.expect(res).to.have.status(409);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('User already exists');
          done();
        });
    });
  });
  describe('🔽🔽 /PUT user', () => {
    it('❌❌ It should not UPDATE a user when unauthorized', (done) => {
      chai
        .request(app)
        .put(`/api/v1/user/${id}`)
        .send(otherUser)
        .end((err, res) => {
          chai.expect(res).to.have.status(401);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('Unauthorized request!');
          done();
        });
    });
    it('❌❌ It should not UPDATE a user when id is unvailable', (done) => {
      chai
        .request(app)
        .put(`/api/v1/user/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(malUser)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('no user match found');
          done();
        });
    });
    it('✅✅ It should UPDATE a user when id is available and user is authorized', (done) => {
      chai
        .request(app)
        .put(`/api/v1/user/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(otherUser)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('user updated');
          chai.expect(res.body.data).to.be.a('object');
          chai.expect(res.req.method).to.equal('PUT');
          chai.expect(res.req.path).to.equal(`/api/v1/user/${id}`);
          done();
        });
    });
  });
});
