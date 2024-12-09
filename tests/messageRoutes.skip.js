const request = require('supertest');
const app = require('../app'); // Path to your app's main server file
const { Message, User } = require('../models'); // ORM models
const { sequelize } = require('../models'); // Sequelize instance

jest.mock('../middlewares/authMiddleware', () => ({
  authenticateToken: (req, res, next) => {
    req.user = { id: 'test-user-id' }; // Mock authenticated user
    next();
  },
}));

beforeAll(async () => {
  // Sync the database and add mock data
  await sequelize.sync({ force: true });

  await User.bulkCreate([
    { id: 'test-user-id', name: 'Test User', email: 'testuser@example.com', password: 'password' },
    { id: 'receiver-id', name: 'Receiver', email: 'receiver@example.com', password: 'password' },
  ]);

  await Message.create({
    id: 'test-message-id',
    content: 'Hello, this is a test message!',
    senderId: 'test-user-id',
    receiverId: 'receiver-id',
  });
});

afterAll(async () => {
  // Close database connection
  await sequelize.close();
});

describe('Message Routes', () => {
  test('GET /messages/all - should fetch all messages', async () => {
    const response = await request(app)
      .get('/messages/all')
      .set('Authorization', 'Bearer mock-token'); // Mock authorization header

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      content: 'Hello, this is a test message!',
      senderId: 'test-user-id',
      receiverId: 'receiver-id',
    });
  });

  test('GET /messages/:userId - should fetch messages for a user', async () => {
    const response = await request(app)
      .get('/messages/receiver-id')
      .set('Authorization', 'Bearer mock-token');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      content: 'Hello, this is a test message!',
      senderId: 'test-user-id',
    });
  });

  test('POST /messages - should create a new message', async () => {
    const response = await request(app)
      .post('/messages')
      .send({ receiverId: 'receiver-id', content: 'Another test message!' })
      .set('Authorization', 'Bearer mock-token');

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      content: 'Another test message!',
      senderId: 'test-user-id',
      receiverId: 'receiver-id',
    });

    const message = await Message.findOne({ where: { content: 'Another test message!' } });
    expect(message).not.toBeNull();
  });
});