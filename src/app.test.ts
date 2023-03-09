import request from 'supertest';
import app from './app';
import { Bookmark } from './types';
import { v4 as uuidv4 } from 'uuid';

describe('Bookmarks API Testing', () => {
  let bookmark: Bookmark;

  describe('POST /bookmarks', () => {
    it('It should create a new bookmark', async () => {
      const response = await request(app).post('/api/v1/bookmark').send({
        url: 'https://baomoi.com/',
      });
      expect(response.status).toBe(201);
      bookmark = response.body;
    });

    it('It should returns 400 for missing or invalid URL', async () => {
      const response = await request(app).post('/api/v1/bookmark').send({ url: 'htps://baomoi.com/' });
      expect(response.status).toBe(400);
    });
  });

  describe('GET /bookmark', () => {
    it('It should returns all bookmarks', async () => {
      const response = await request(app).get('/api/v1/bookmark');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /bookmark/:id', () => {
    it('It should returns a bookmark by id', async () => {
      const response = await request(app).get(`/api/v1/bookmark/${bookmark.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(bookmark);
    });

    it('It should returns 404 for non-existing bookmark', async () => {
      const response = await request(app).get(`/api/v1/bookmark/${uuidv4()}`);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /bookmarks/:id', () => {
    it('It should updates an existing bookmark', async () => {
      const response = await request(app).patch('/api/v1/bookmark').send({
        id: bookmark.id,
        title: 'News Paper',
        description: 'Read News paper today',
        image: 'https://s1.vnecdn.net/vnexpress/restruct/i/v738/logo_default.jpg',
      });
      expect(response.status).toBe(200);
    });

    it('It should returns 404 for non-existing or deleted bookmark', async () => {
      const response = await request(app).patch('/api/v1/bookmark').send({
        id: uuidv4(),
        title: 'News Paper',
        description: 'Read News paper today',
        image: 'https://s1.vnecdn.net/vnexpress/restruct/i/v738/logo_default.jpg',
      });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /bookmark/:id', () => {
    it('It should moves an existing bookmark to the rash area', async () => {
      const response = await request(app).delete(`/api/v1/bookmark/${bookmark.id}`);
      expect(response.status).toBe(200);
    });

    it('It should returns 404 for non-existing bookmark', async () => {
      const response = await request(app).delete(`/api/v1/bookmark/${uuidv4()}`);
      expect(response.status).toBe(404);
    });
  });

  describe('GET /bookmark/deleted', () => {
    it('It should returns all bookmarks which was deleted', async () => {
      const response = await request(app).get('/api/v1/bookmark/deleted');
      expect(response.status).toBe(200);
    });
  });

  describe('PATCH /bookmark/:id', () => {
    it('It should restore an existing bookmark to the rash area', async () => {
      const response = await request(app).patch(`/api/v1/bookmark/restore/${bookmark.id}`);
      expect(response.status).toBe(200);
    });

    it('It should returns 404 for non-existing or non-deleted bookmark', async () => {
      const response = await request(app).patch(`/api/v1/bookmark/restore/${uuidv4()}`);
      expect(response.status).toBe(404);
    });
  });
});
