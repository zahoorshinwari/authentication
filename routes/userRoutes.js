
const { registerUser, loginUser, getUser, getUserById, updateUserById, deleteUserById } = require('../conrollers/userController');

const router = require('express').Router();

// /users/register
router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/', getUser)    
router.get('/:id', getUserById)    
router.put('/:id', updateUserById)    
router.delete('/:id', deleteUserById)    

module.exports = router;