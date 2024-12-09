const { getAllUsers } = require('../controllers/userController');

(async () => {
  const users = await getAllUsers();
  console.log('Users:', JSON.stringify(users));
})();