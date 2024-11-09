const { registerAdmin, loginAdmin, getAdmins, getAdminById, updateAdminById, deleteAdminById } = require('../conrollers/adminController');
const router = require('express').Router();

// /admins/register
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);

module.exports = router;
