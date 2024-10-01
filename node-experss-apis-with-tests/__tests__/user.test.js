const request = require('supertest');
const User = require('../models/user'); 
const { app } = require('..');
const { registerUserJson, 
  loginUserJson, 
  loginCreds, 
  loginWrongCreds 
} = require('../utils/testConstants');

jest.mock('../models/user'); 

describe('Test User API', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should register a new user', async () => {
    
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(registerUserJson),
    }));

    const response = await request(app)
      .post('/api/v1/register') 
      .send({...registerUserJson, password:'Password@123'});

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully!');
  });

  it('should not register a user with an existing email', async () => {
    
    User.findOne = jest.fn().mockResolvedValueOnce({
      email: 'john.doe@example.com',
    });

    const response = await request(app)
      .post('/api/v1/register')
      .send({...registerUserJson, password:'Password@123'});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'User already exists, please login !');
  });

  it('should log in an existing user', async () => {
    
    User.findOne = jest.fn().mockResolvedValue(loginUserJson);

    const response = await request(app)
      .post('/api/v1/login') 
      .send(loginCreds);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token'); 
  });

  it('should not log in with invalid credentials', async () => {
    
    User.findOne = jest.fn().mockResolvedValue({
      _id: '12345',
      email: 'john.doe@example.com',
      matchPassword: jest.fn().mockResolvedValue(false), 
    });

    const response = await request(app)
      .post('/api/v1/login')
      .send(loginWrongCreds);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid email or password');
  });
});
