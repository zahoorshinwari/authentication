const { registerAdmin, loginAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById, approveUser, rejectUser } = require('../conrollers/adminController');
const router = require('express').Router();

// /admins/register
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);

// Route to approve a user
router.post('/approve-user/:userId', approveUser);

// Route to reject a user
router.post('/reject-user/:userId', rejectUser);

module.exports = router;
