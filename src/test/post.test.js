import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

import Post from '../models/Post';
import app from '..';
import {
  badPost,
  badPostUpdate,
  malId,
  newUser,
  post,
  postUpdate,
  user,
} from '../utils/testData';
import User from '../models/User';

dotenv.config();

chai.should();
chai.use(chaiHttp);

let id;
let token;

describe('Posts', () => {
  before((done) => {
    Post.deleteMany({}, (err) => {
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
    Post.deleteMany({}, (err) => {
      done();
    });
  });
  after((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('🔽🔽 /GET post', () => {
    it('✅✅ it should GET all the posts', (done) => {
      chai
        .request(app)
        .get('/api/v1/post')
        .end((err, res) => {
          chai.expect(res.req.method).to.equal('GET');
          chai.expect(res.req.path).to.equal('/api/v1/post');
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.data).to.be.a('array');
          chai.expect(res.body.status).to.equal('success');
          chai.expect(res.body.status).to.be.a('string');
          chai.expect(res.body).to.have.property('message').with.lengthOf(9);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('🔽🔽 /POST post', () => {
    it('❌❌ it should not POST a post without authorization', (done) => {
      chai
        .request(app)
        .post('/api/v1/post')
        .send(post)
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
    it('❌❌ It should not POST a post with incomplete correct incorrect fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/post')
        .set({ Authorization: `Bearer ${token}` })
        .send(badPost)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai.expect(res.body).to.have.property('message');
          done();
        });
    });
    it('✅✅ It should POST a new post with complete and correct fields', (done) => {
      chai
        .request(app)
        .post('/api/v1/post')
        .set({ Authorization: `Bearer ${token}` })
        .send(post)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('post created');
          chai.expect(res.body.data).to.be.a('object');
          chai.expect(res.req.method).to.equal('POST');
          chai.expect(res.req.path).to.equal('/api/v1/post');
          id = res.body.data._id;
          done();
        });
    });
  });
  
  describe('🔽🔽 /GET post', () => {
    it('✅✅ It should GET a single post', (done) => {
      chai
        .request(app)
        .get(`/api/v1/post/${id}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('post found');
          chai.expect(res.body.data).to.be.a('object');
          id = res.body.data._id;
          done();
        });
    });
    it('❌❌ It should not GET a single post for unavailable id', (done) => {
      chai
        .request(app)
        .get(`/api/v1/post/${malId}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('post not found');
          done();
        });
    });
  });

  describe('🔽🔽 /PUT post', () => {
    it('❌❌ It should not UPDATE a post when unauthorized', (done) => {
      chai
        .request(app)
        .put(`/api/v1/post/${id}`)
        .send(postUpdate)
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
    it('❌❌ It should not UPDATE a post when id is unvailable', (done) => {
      chai
        .request(app)
        .put(`/api/v1/post/${malId}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(postUpdate)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('post not found');
          done();
        });
    });
    it('✅✅ It should UPDATE a post when id is available and user is authorized', (done) => {
      chai
        .request(app)
        .put(`/api/v1/post/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(postUpdate)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai
            .expect(res.body)
            .to.have.property('status')
            .with.equal('success');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('post updated');
          chai.expect(res.body.data).to.be.a('object');
          chai.expect(res.req.method).to.equal('PUT');
          chai.expect(res.req.path).to.equal(`/api/v1/post/${id}`);
          done();
        });
    });
  });

  describe('🔽🔽 /DELETE post', () => {
    it('❌❌ It should not DELETE a post when unauthorized', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/post/${id}`)
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
    it('❌❌ It should not DELETE a post when id is unvailable', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/post/${malId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.have.property('status').with.equal('fail');
          chai
            .expect(res.body)
            .to.have.property('message')
            .with.equal('post not found');
          done();
        });
    });
    it('✅✅ It should DELETE a post when id is available and user is authorized', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/post/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send(postUpdate)
        .end((err, res) => {
          chai.expect(res).to.have.status(204);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.req.method).to.equal('DELETE');
          chai.expect(res.req.path).to.equal(`/api/v1/post/${id}`);
          done();
        });
    });
  });
});
