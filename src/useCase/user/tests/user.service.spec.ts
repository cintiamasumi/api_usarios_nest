import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/database/entities/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../service/user.service';
import { mockOneUser, mockUser, mockUserRepository, mockUserTree } from 'src/__mock__/userMock';

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;
  
    // Mock de um usuários
    /*const mockUser = [
      {
        id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
        userName: 'testName',
        parentUserId: null
      },
      {
        id: 'c41aeb9b-3370-44a2-9b68-590c53210e88',
        userName: 'testName2',
        parentUserId: 'b72add7e-5a4b-42fb-b988-4fb0a2555439'
      }
    ];

    const mockUserTree = [
      {
        id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
        userName: 'testName',
        parentUserId: null,
        parents: [
          {
            id: 'c41aeb9b-3370-44a2-9b68-590c53210e88',
            userName: 'testName2',
            parentUserId: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
            parents:[]
          }
        ]
      } 
    ]

    const mockOneUser = {
      id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
      userName: 'testName',
      parentUserId: null
    }
  
    const mockUserRepository = {
      find: jest.fn().mockResolvedValue(mockUser),
      findOneBy: jest.fn().mockResolvedValue(mockOneUser),
      findOneById: jest.fn().mockResolvedValue(mockOneUser),
      update: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue(mockUser),
      remove: jest.fn().mockResolvedValue(undefined),
    };*/
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: getRepositoryToken(User),
            useValue: mockUserRepository,
          },
        ],
      }).compile();
  
      service = module.get<UserService>(UserService);
      repository = module.get<Repository<User>>(getRepositoryToken(User));
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    describe('getUsersTree', () => {
      it('should return a user tree', async () => {
        const result = await service.getUsersTree();
        expect(result).toEqual(mockUserTree);
        expect(repository.find).toHaveBeenCalledWith({ where: { isDeleted: false } });
      });
    });
  
    describe('findOneById', () => {
      it('should return a user by ID', async () => {
        const result = await service.findOneById('b72add7e-5a4b-42fb-b988-4fb0a2555439');
        
        expect(result).toEqual(mockOneUser);
        expect(repository.findOneBy).toHaveBeenCalledWith({ id: mockUser[0].id });
      });
    });
  
    describe('update', () => {
      it('should update a user', async () => {
        const userUpdate = { userName: 'updatedName', passWord: 'newPass' };
        const hashedPassword = 'hashedPassword';
        jest.spyOn(service, 'updatePassword').mockResolvedValue(hashedPassword);
        await service.update(mockOneUser.id, userUpdate);
        expect(repository.update).toHaveBeenCalledWith(mockOneUser.id, { ...userUpdate, passWord: hashedPassword });
      });
    });
  
    describe('remove', () => {
      it('should mark a user as deleted', async () => {
        await service.remove(mockOneUser.id);
        expect(repository.save).toHaveBeenCalledWith({ ...mockOneUser, isDeleted: true });
      });
    });

  });