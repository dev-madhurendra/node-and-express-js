const request = require('supertest');
const { app } = require('..'); 
const Blog = require('../models/blog'); 
const User = require('../models/user'); 
const { createBlogJson, registerUserJson, loginCreds, loginUserJson } = require('../utils/testConstants');

// Mocking the necessary models
jest.mock('../models/blog'); 
jest.mock('../models/user');

describe('Blog API', () => {
  let token; // To store the token
  
  beforeAll(async () => {
    // Mocking User.findOne and generateAuthToken
    User.findOne.mockResolvedValue({
      ...registerUserJson,
      password: 'Test@123',
      generateAuthToken: jest.fn().mockReturnValue('mockToken'), // Mocking token generation
    });

    console.log(">> Mocked User for Registration and Login");

    // Register the user
    const registrationResponse = await request(app)
      .post('/api/v1/register')
      .send({ ...registerUserJson, password: 'Test@123' });

    console.log(">> User Registered:", registrationResponse.body);

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/v1/login')
      .send(loginCreds);

    console.log(">> User Logged In:", loginResponse.body);

    // Set the token from the login response
    token = loginResponse.body.token;
    console.log(">> Token received:", token);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid conflicts
  });

  it.only('should create a new blog successfully', async () => {
    // Mock the save function of Blog model to return the blog data
    Blog.prototype.save.mockResolvedValue({
      _id: 'blog_id',
      ...createBlogJson
    });

    // Send a POST request to create a blog
    const response = await request(app)
      .post('/api/v1/blogs')
      .set('Authorization', `Bearer ${token}`) // Set the token in the Authorization header
      .send(createBlogJson);

    // Assertions to verify blog creation
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Blog created successfully!');
    expect(response.body).toHaveProperty('blog');
    expect(response.body.blog).toHaveProperty('_id', 'blog_id');
  });

  it('should return an error when failing to create a blog', async () => {
    // Mock the save function to throw an error
    Blog.prototype.save.mockRejectedValue(new Error('Failed to save'));

    // Send a POST request to create a blog, expecting it to fail
    const response = await request(app)
      .post('/api/v1/blogs')
      .set('Authorization', `Bearer ${token}`) // Set the token in the Authorization header
      .send(createBlogJson);

    // Assertions to verify the error response
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Failed to create blog');
  });
});
