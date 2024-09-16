const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController'); // Adjust this path to where your controller is located


router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

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
