
const { sessionNew, sessionCreate, sessionDelete } = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/signing/form', sessionNew);
router.post('/signing', sessionCreate);
router.get('/signup', sessionDelete);

module.exports = router;