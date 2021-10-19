import { Test } from '@nestjs/testing';
import { HttpServer } from '@nestjs/common';
import * as request from 'supertest';
import { Connection, Types } from 'mongoose';
import { userStub } from './stubs/userStub';
import { DatabaseService } from '../database/databse.service';
import { User } from './interfaces/user.interface';
import { AppModule } from '../app.module';

describe('UserController', () => {
  let dbConnection: Connection;
  let httpServer: HttpServer;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getConnection();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('users').deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const userCreateObject: User = userStub();
      await dbConnection.collection('users').insertOne(userCreateObject);
      const response = await request(httpServer).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([toRawObject(userCreateObject)]);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userCreateObject: User = userStub();
      await dbConnection.collection('users').insertOne(userCreateObject);
      const response = await request(httpServer).get(
        `/users/${userCreateObject['_id']}`,
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(toRawObject(userCreateObject));
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const userCreateObject: User = userStub();
      const response: any = await request(httpServer)
        .post('/users')
        .send(userCreateObject);
      const user = await dbConnection
        .collection('users')
        .findOne({ _id: new Types.ObjectId(response.body['_id']) });
      expect(response.body).toMatchObject(toRawObject(user));
      expect(response.status).toBe(201);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const userCreateObject: User = userStub();
      await dbConnection.collection('users').insertOne(userCreateObject);

      userCreateObject.name = 'New TestUsername';
      userCreateObject.description = 'New TestUsername';
      userCreateObject.dob = new Date();

      const response = await request(httpServer)
        .patch(`/users/${userCreateObject['_id']}`)
        .send(userCreateObject);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(toRawObject(userCreateObject));
    });
  });

  describe('remove', () => {
    it('it should delete and return a user', async () => {
      const userCreateObject: User = userStub();
      await dbConnection.collection('users').insertOne(userCreateObject);

      const response = await request(httpServer).delete(
        `/users/${userCreateObject['_id']}`,
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(toRawObject(userCreateObject));
    });
  });
});

const toRawObject = (x: any) => JSON.parse(JSON.stringify(x));
