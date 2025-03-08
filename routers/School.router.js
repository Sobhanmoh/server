const express = require('express');
const authMiddleware = require('../auth/auth');
const { registerSchool, updateSchool, loginSchool, getAllschools, getSchoolOwnData } = require('../controllers/school.con');

const router = express.Router();

router.post('/register',registerSchool);
router.get('/all',getAllschools);
router.get('/login',loginSchool);
router.patch('/update',authMiddleware(['SCHOOL']), updateSchool);
router.get("/fetch-single",authMiddleware(['SCHOOL']), getSchoolOwnData);



module.exports = router;