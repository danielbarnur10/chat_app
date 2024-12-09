const { register } = require('../controllers/authController');
const req = {"body": {
  "username": "testuser",
  "password": "testpassword"
}};
(async () => {
  const users = await register(req);
  console.log('Users:', JSON.stringify(users));
})();