const { sequelize } = require('./models');

module.exports = async () => {
  try {
    await sequelize.sync({ force: true }); // Recreate all tables
    console.log('Test database synced');
  } catch (err) {
    console.error('Error syncing test database:', err);
  }
};