module.exports = {
    testEnvironment: 'node', // Required for database tests
    globalSetup: './setupTestDB.js', // Path to your database setup file
    setupFiles: ['dotenv/config'], // Automatically load environment variables (e.g., `.env.test`)
  };