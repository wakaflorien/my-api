import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Contact from '../models/Contact';
import app from '..';
import {
  badMessage,
  malId,
  newUser,
  message,
  messageUpdate,
  user,
} from '../utils/testData';
import User from '../models/User';

dotenv.config();

chai.should();
chai.use(chaiHttp);

let id;
let token;

describe('Messages', () => {
  before((done) => {
    Contact.deleteMany({}, (err) => {
      done();
    });
  });
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
    Contact.deleteMany({}, (err) => {
      done();
    });
  });
  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe('🔽🔽 /POST message', () => {
    it('❌❌ It should not POST a post with incorrect fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/message')
        .send(badMessage)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai.expect(res.body).to.have.property('error');
          done();
        });
    });
    it('✅✅ It should POST a new message with complete and correct fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/message')
        .send(message)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('message added');
          chai.expect(res.body.data).to.be.a('object');
          chai.expect(res.req.method).to.equal('POST');
          chai.expect(res.req.path).to.equal('/api/v1/message');
          id = res.body.data._id;
          done();
        });
    });
  });

  describe('🔽🔽 /GET message', () => {
    it('✅✅ It should GET all messages', (done) => {
      chai
        .request(app)
        .get(`/api/v1/message`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('All messages');
          chai.expect(res.body.data).to.be.a('array');
          done();
        });
    });
    it('✅✅ It should GET a single message', (done) => {
      chai
        .request(app)
        .get(`/api/v1/message/${id}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('message found');
          chai.expect(res.body.data).to.be.a('object');
          id = res.body.data._id;
          done();
        });
    });
    it('❌❌ It should not GET a single message for unavailable id', (done) => {
      chai
        .request(app)
        .get(`/api/v1/message/${malId}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('error')
            .with.equal('message does not exist');
          done();
        });
    });
  });
  //
  describe('🔽🔽 /PUT message', () => {
    it('❌❌ It should not UPDATE a message when unauthorized', (done) => {
      chai
        .request(app)
        .put(`/api/v1/message/${id}`)
        .send(messageUpdate)
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
    it('❌❌ It should not UPDATE a message when id is unvailable', (done) => {
      chai
        .request(app)
        .put(`/api/v1/message/${malId}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(messageUpdate)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('error')
            .with.equal('message does not exist');
          done();
        });
    });
    it('✅✅ It should UPDATE a message when id is available and user is authorized', (done) => {
      chai
        .request(app)
        .put(`/api/v1/message/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(messageUpdate)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('message updated');
          chai.expect(res.body.data).to.be.a('object');
          chai.expect(res.req.method).to.equal('PUT');
          chai.expect(res.req.path).to.equal(`/api/v1/message/${id}`);
          done();
        });
    });
  });

  describe('🔽🔽 /DELETE post', () => {
    it('❌❌ It should not DELETE a message when unauthorized', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/message/${id}`)
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
    it('❌❌ It should not DELETE a message when id is unvailable', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/message/${malId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('error')
            .with.equal('message does not exist');
          done();
        });
    });
    it('✅✅ It should DELETE a message when id is available and user is authorized', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/message/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.req.method).to.equal('DELETE');
          chai.expect(res.req.path).to.equal(`/api/v1/message/${id}`);
          done();
        });
    });
  });
});
