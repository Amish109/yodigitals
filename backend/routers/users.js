const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController'); 
const {  authenticate } = require('../middleware/Authenticate');


router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.put('/change-password', authenticate, userController.changePassword);

router.get('/user-data', async (req, res) => {
  try {
      const users = await User.findAll({
          include: [
              {
                  model: BusinessInfo,
                  as: 'businessInfos', 
              },
          ],
      });
      
      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;
