const request = require('supertest');
const app = require('../app');
const { User } = require('../models'); // Adjust the path to your User model

describe('Auth Tests', () => {
  it('should register a new user', async () => {
    const newUser = { username: 'testuser', password: 'password123', email: 'testuser@example.com' };
    const response = await request(app).post('/auth/register').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.username).toBe('testuser');
  });

  it('should not register a user with an existing username', async () => {
    // Create a user first
    await User.create({ username: 'testuser', passwordHash: 'dummyhash',email: 'testuser@example.com' });

    const newUser = { username: 'testuser', password: 'password123',email: 'testuser@example.com' };
    const response = await request(app).post('/auth/register').send(newUser);

    expect(response.status).toBe(200); // Adjust status code based on your error handling
    expect(response.body).toHaveProperty('error');
  });
});
