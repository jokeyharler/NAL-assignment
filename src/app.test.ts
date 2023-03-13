import request from "supertest";
import { faker } from "@faker-js/faker";
import mongoose from 'mongoose';
import app from "./app";
import { v4 as uuidv4 } from 'uuid';
import userModel from "./models/user.model";
import eventModel from "./models/event.model";
import { user } from "./types/user.type";
import { event } from "./types/event.type";

const databaseName = "test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url);
});

afterAll(done => {
  userModel.deleteMany();
  eventModel.deleteMany();
  mongoose.connection.close()
  done()
})

describe('API testing', () => {
  let user: user;
  let event: event;
  let accessToken: string;

  describe('POST /auth/register', () => {
    it('It should creates a new user', async () => {
      const userData = {
        username: faker.internet.userName(),
        password: '12345678'
      }
      const response = await request(app).post('/api/v1/auth/register').send(userData)
  
      expect(response.status).toBe(200);
      expect(response.body.user).toMatchObject({ username: userData.username });

      user = response.body.user
    })
    it('It should returns 400 for duplicate user name', async () => {
      const response = await request(app).post('/api/v1/auth/register').send(
          { 
            username: user.username, password: '123132' 
          }
        )
      expect(response.status).toBe(400);
    })
  })

  describe('POST /auth/login', () => {
    it('It should login with existed account', async () => {
      const response = await request(app).post('/api/v1/auth/login').send(
        { 
          username: user.username, password: '12345678'
        }
      )
  
      expect(response.status).toBe(200);

      accessToken = response.body.body.accessToken
    })
  
    it('It should returns 400 for user not exist', async () => {
      const response = await request(app).post('/api/v1/auth/login').send(
          { 
            username: faker.name.firstName(), password: '12345678' 
          }
        )
      expect(response.status).toBe(400);
    })

    it('It should returns 400 wrong password', async () => {
      const response = await request(app).post('/api/v1/auth/login').send(
          { 
            username: user.username, password: '12345213123678' 
          }
        )
      expect(response.status).toBe(400);
    })
  })

  describe('POST /events', () => {
    it('It should creates a new event', async () => {
      const response = await request(app)
      .post('/api/v1/events').set('Authorization', `Bearer ${accessToken}`)
      .send(
        { 
          eventName: faker.animal.bird(),
          description: faker.company.name(),
          startDate: '2022-11-12',
          dueDate: '2022-11-12'
        }
      )

      expect(response.status).toBe(200);
      event = response.body.event
    })

    it('It should returns 400 if the due date is before the start date', async () => {
      const response = await request(app)
      .post('/api/v1/events').set('Authorization', `Bearer ${accessToken}`)
      .send(
        { 
          eventName: faker.animal.bird(),
          description: faker.company.name(),
          startDate: '2022-11-12',
          dueDate: '2022-11-11'
        }
      )

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('the due date must be greater than the start date')
    })
  })

  describe('PUT /events', () => {
    it('It should updates existed event', async () => {
      const updateData = { 
        eventName: faker.animal.bird(),
        description: faker.company.name(),
        startDate: "2023-03-11T08:07:59.000Z",
        dueDate: "2023-03-11T08:07:59.000Z"
      }
      const response = await request(app)
      .put(`/api/v1/events/${event.id}`).set('Authorization', `Bearer ${accessToken}`)
      .send(updateData)

      expect(response.status).toBe(200);
      expect(response.body.event).toMatchObject(updateData);
    })
    it('It should returns 400 if the event does not exists', async () => {
      const randomId = new mongoose.Types.ObjectId();
      const response = await request(app)
      .put(`/api/v1/events/${randomId}`).set('Authorization', `Bearer ${accessToken}`)
      .send(
        { 
          eventName: faker.animal.bird(),
          description: faker.company.name(),
          startDate: '2022-11-12',
          dueDate: '2022-11-12'
        }
      )

      expect(response.status).toBe(400);
    })
  })

  describe('DELETE /events', () => {
    it('It should delete existed event', async () => {
      const response = await request(app)
      .delete(`/api/v1/events/${event.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Delete succeed');
    })
    it('It should returns 400 if the event does not exists', async () => {
      const randomId = new mongoose.Types.ObjectId();
      const response = await request(app)
      .delete(`/api/v1/events/${randomId}`).set('Authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Event not exist');
    })
  })

  describe('GET /events', () => {
    it('It should get all events', async () => {
      const response = await request(app)
      .get(`/api/v1/events`)
      .set('Authorization', `Bearer ${accessToken}`)

      expect(response.status).toBe(200);
    })
  })
})