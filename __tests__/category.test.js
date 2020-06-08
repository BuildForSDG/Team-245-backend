/* eslint-disable implicit-arrow-linebreak */
import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/index';
import Category from '../src/models/category';
import getAuthToken from './getAuth';

const authHeader = 'team-245-auth-token';

describe('Test for category endpoint', () => {
  let request;
  let server;
  let adminPayload;
  let adminToken;

  beforeAll(async () => {
    await Category.deleteMany();
    adminPayload = await getAuthToken(true);
    adminToken = adminPayload.token;
  });

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
    mongoose.disconnect();
  });

  describe('Post /category , tests to create new category', () => {
    let name;
    const exec = async () =>
      request
        .post('/api/v1/category/')
        .send({
          name
        })
        .set(authHeader, adminToken);
    beforeEach(() => {
      name = 'Poilitics';
    });
    it('should create a new category', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('should reject empty body', async () => {
      name = '';
      const res = await exec();
      expect(res.status).toBe(422);
    });
  });

  describe('GET /category ', () => {
    const exec = async () => request.get('/api/v1/category/');
    it('should return all categories', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /category', () => {
    let id;
    const exec = async () => request.delete(`/api/v1/category/${id}`).set(authHeader, adminToken);
    beforeAll(async () => {
      let newCategory = new Category({ name: 'Business' });
      newCategory = await newCategory.save();
      id = newCategory.id;
    });
    it('should delete a category', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should return 404 since category has been deleted once', async () => {
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });
});
