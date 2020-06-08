/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
import supertest from 'supertest';
import http from 'http';
import mongoose from 'mongoose';
import app from '../src/index';
import Post from '../src/models/post';
import getAuthToken from './getAuth';

const authHeader = 'team-245-auth-token';

describe('Test for post endpoint', () => {
  let request;
  let server;
  let adminPayload;
  let adminToken;
  let payload;
  let nonAdminToken;

  beforeAll(async () => {
    await Post.deleteMany();
    payload = await getAuthToken(false);
    nonAdminToken = payload.token;
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

  describe('Post /posts , tests to create new post', () => {
    let title;
    let description;
    const exec = async () =>
      request
        .post('/api/v1/posts/')
        .send({
          title,
          description
        })
        .set(authHeader, nonAdminToken);
    beforeEach(() => {
      title = 'Doloremque sed fugiat iure magni nihil iusto odio aliquam.';
      description = 'Quam quo ut est quam sint maiores. Ullam reiciendis voluptatem a deserunt totam et et accusamus. ';
    });
    it('should create a new post', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('should reject empty body', async () => {
      title = '';
      description = '';
      const res = await exec();
      expect(res.status).toBe(422);
    });
  });

  // get posts
  describe('GET /posts requests tests', () => {
    let id;
    let newPost;
    const exec = async () => request.get(`/api/v1/posts/${id}`);
    beforeAll(async () => {
      newPost = new Post({
        title: 'Et accusamus et.',
        description:
          'Odio optio perspiciatis nulla libero ea. Illo et dolorem. Aut dolor nam. Aut quo dolorum deleniti nihil voluptates. Sed excepturi sed aliquam dolore dolores nobis.'
      });
      newPost = await newPost.save();
    });
    beforeEach(() => {
      id = '';
    });
    it('should return all posts', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('should return a specific post', async () => {
      id = newPost._id;
      const res = await exec();
      expect(res.status).toBe(200);
    });
    it('should return 404 for post with invalid id', async () => {
      id = '5e9e243ac9a91b2af463f0b0';
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /posts', () => {
    let title;
    let description;
    let id;
    let newPost;
    const exec = async () =>
      request.patch(`/api/v1/posts/${id}`).send({ title, description }).set(authHeader, nonAdminToken);
    beforeAll(async () => {
      newPost = new Post({
        title: 'Et accusamus et.',
        description:
          'Odio optio perspiciatis nulla libero ea. Illo et dolorem. Aut dolor nam. Aut quo dolorum deleniti nihil voluptates. Sed excepturi sed aliquam dolore dolores nobis.'
      });
      newPost = await newPost.save();
      id = newPost._id;
    });

    beforeEach(() => {
      title = 'new post title';
      description = 'Odio optio perspiciatis nulla libero ea. Illo et dolorem. Aut dolor nam. Aut quo dolorum';
    });

    it('should patch post', async () => {
      const res = await exec();
      expect(res.body.data.title).toBe(title);
    });

    it('should return 404 if post not found', async () => {
      id = '5e9e243ac9a91b2af463f0b0';
      const res = await exec();

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /posts', () => {
    let id;
    const exec = async () => request.delete(`/api/v1/posts/${id}`).set(authHeader, adminToken);
    beforeAll(async () => {
      let newPost = new Post({ name: 'Business' });
      newPost = await newPost.save();
      id = newPost.id;
    });

    it('should delete a post', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it('should return 404 if post not found', async () => {
      id = '5e9e243ac9a91b2af463f0b0';
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should return 404 since post has been deleted once', async () => {
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });
});
