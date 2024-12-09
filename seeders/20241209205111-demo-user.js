'use strict';
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const uuid2 = uuidv4();

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [ // Lowercase
      {
        id: uuid,
        username: 'User1',
        email: 'user1@example.com',
        passwordHash: 'hashedpassword1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid2,
        username: 'User2',
        email: 'user2@example.com',
        passwordHash: 'hashedpassword2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },ß
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {}); // Lowercase
  },
};