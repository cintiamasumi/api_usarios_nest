import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from 'src/app.module';
import { mockUserRepository } from 'src/__mock__/userMock';
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const mockRepository = mockUserRepository;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    jwtService = app.get(JwtService);
    await app.init();

    // Simular a criação de um token JWT válido
    token = jwtService.sign({ userId: 'b72add7e-5a4b-42fb-b988-4fb0a2555439' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/tree (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/tree')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
        userName: 'testName',
        parentUserId: null,
        parents: [
          {
            id: 'c41aeb9b-3370-44a2-9b68-590c53210e88',
            userName: 'testName2',
            parentUserId: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
            parents: [],
          },
        ],
      },
    ]);
  });

  it('/users/:id (GET)', async () => {
    const id = 'b72add7e-5a4b-42fb-b988-4fb0a2555439';

    const response = await request(app.getHttpServer())
      .get(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
      userName: 'testName',
      parentUserId: null,
    });
  });

  it('/users/:id (PUT)', async () => {
    const id = 'b72add7e-5a4b-42fb-b988-4fb0a2555439';

    const updateUserDto = {
      userName: 'testName2',
      parentUserId: null,
    };

    const response = await request(app.getHttpServer())
      .put(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateUserDto)
      .expect(200);

    expect(response.body).toEqual({});
  });
});
