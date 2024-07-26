export class UserMock {}

export const mockUser = [
  {
    id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
    userName: 'testName',
    parentUserId: null,
  },
  {
    id: 'c41aeb9b-3370-44a2-9b68-590c53210e88',
    userName: 'testName2',
    parentUserId: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
  },
];

export const mockUserTree = [
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
];

export const mockOneUser = {
  id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
  userName: 'testName',
  parentUserId: null,
};

export const mockOneUserUpdate = {
  id: 'b72add7e-5a4b-42fb-b988-4fb0a2555439',
  userName: 'testName2',
  parentUserId: null,
};
export const mockUserRepository = {
  find: jest.fn().mockResolvedValue(mockUser),
  findOneBy: jest.fn().mockResolvedValue(mockOneUser),
  findOneById: jest.fn().mockResolvedValue(mockOneUser),
  update: jest.fn().mockResolvedValue(undefined),
  save: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue(undefined)
};
