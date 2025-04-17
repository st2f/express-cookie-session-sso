const { sessionNew, sessionCreate, sessionDelete, googleAuth, googleAuthCb } = require('../controllers/auth.controller');
const router = require('express').Router();
//const passport = require('passport');

router.get('/signin/form', sessionNew);
// router.post('/signin', passport.authenticate('local', {
//    successRedirect: '/',
//    failureRedirect: '/auth/signin/form'
// }));
router.post('/signin', sessionCreate);
router.get('/signout', sessionDelete); 
router.get('/google', googleAuth);
router.get('/google/cb', googleAuthCb);

module.exports = router;