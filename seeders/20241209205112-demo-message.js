'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users;`
    );

    const [userResults] = users; // Destructure to get the array of users

    if (userResults.length < 2) {
      throw new Error('Not enough users to seed messages');
    }

    await queryInterface.bulkInsert('messages', [
      {
        content: 'Hello Jane!',
        senderId: userResults[0].id, // Replace with a valid sender ID
        receiverId: userResults[1].id, // Replace with a valid receiver ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Hi John!',
        senderId: userResults[1].id, // Replace with a valid sender ID
        receiverId: userResults[0].id, // Replace with a valid receiver ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {});
  },
};