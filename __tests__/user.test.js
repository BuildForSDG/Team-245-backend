/* eslint-disable no-undef */
import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/index';
import User from '../src/models/user';
import getAuthToken from './getAuth';

const authHeader = 'team-245-auth-token';

describe('Tests for users endpoints', () => {
  let request;
  let server;
  let payload;
  let adminPayload;
  let adminToken;

  beforeAll(async (done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
    await User.deleteMany();
    payload = await getAuthToken(false);
    adminPayload = await getAuthToken(true);
    adminToken = adminPayload.token;
  });

  beforeEach(async () => {});

  afterAll((done) => {
    server.close(done);
    mongoose.disconnect();
  });

  // posts requests tests
  describe('post /user , tests for user register and login', () => {
    let email;
    let password;
    let type = '';
    const exec = async () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      request.post(`/api/v1/user/${type}`).send({
        email,
        password
      });

    beforeEach(() => {
      type = '';
      email = 'testing@gmail.com';
      password = 'pass123';
    });
    it('create a new user', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.data.token).toBeTruthy();
    });
    it('login users', async () => {
      type = 'login';
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('tests for non existing email login', async () => {
      type = 'login';
      email = 'email@gmail.com';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('tests for incorrect password login', async () => {
      type = 'login';
      password = 'pass1234';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('tests for invalid email and password request body', async () => {
      type = 'login';
      email = 'email';
      password = 'pass';
      const res = await exec();
      expect(res.status).toBe(422);
    });
  });

  // get users
  describe('user get requests tests', () => {
    let id;
    const exec = async () => request.get(`/api/v1/user/${id}`).set(authHeader, adminToken);
    beforeEach(() => {
      id = '';
    });
    it('should return all users', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('should return a specific user', async () => {
      id = payload.id;
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('should return 404 for post with invalid id', async () => {
      id = '5e9e243ac9a91b2af463f0b0';
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });

  // delete requests tests
  describe('user delete requests', () => {
    let id;
    const exec = async () => request.delete(`/api/v1/user/${id}`).set(authHeader, adminToken);
    beforeAll(async () => {
      const newUser = await getAuthToken(true);
      id = newUser.id;
    });
    it('should delete a user', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should return 404 since user has been deleted once', async () => {
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });
});
