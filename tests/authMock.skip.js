const { register } = require('../controllers/authController');
const { User } = require('../models');
jest.mock('../models', () => ({
  User: {
    create: jest.fn(),
  }
}));

describe('register', () => {
  it('should register a user and call User.create', async () => {
    const req = { body: { username: 'testuser', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await register(req, res);

    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: expect.any(String),  // Expecting a hashed password
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: expect.objectContaining({ username: 'testuser' }),
    });
  });
});