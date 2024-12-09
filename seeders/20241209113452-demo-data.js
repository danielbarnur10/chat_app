'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
      await queryInterface.bulkInsert('Users', [
          { username: 'Alice', email: 'alice@example.com', passwordHash: 'hashedPassword1', createdAt: new Date(), updatedAt: new Date() },
          { username: 'Bob', email: 'bob@example.com', passwordHash: 'hashedPassword2', createdAt: new Date(), updatedAt: new Date() },
      ]);

      await queryInterface.bulkInsert('Messages', [
          { text: 'Hello, Bob!', senderId: 1, receiverId: 2, createdAt: new Date(), updatedAt: new Date() },
          { text: 'Hey, Alice!', senderId: 2, receiverId: 1, createdAt: new Date(), updatedAt: new Date() },
      ]);
  },
  down: async (queryInterface) => {
      await queryInterface.bulkDelete('Messages', null, {});
      await queryInterface.bulkDelete('Users', null, {});
  },
};