const express = require('express');
const router = express.Router();
const {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchEmployees);
router.route('/').get(protect, getEmployees).post(protect, addEmployee);
router.route('/:id').put(protect, updateEmployee).delete(protect, deleteEmployee);

module.exports = router;
