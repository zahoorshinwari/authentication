const ensureAuthenticated = require('../auth');
const { createCompany, getCompanies, getCompanyById, updateCompanyById, deleteCompanyById } = require('../conrollers/companyController');

const router = require('express').Router();

router.post('/',  createCompany); // Secure
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', updateCompanyById); // Secure
router.delete('/:id', deleteCompanyById); // Secure

module.exports = router;
