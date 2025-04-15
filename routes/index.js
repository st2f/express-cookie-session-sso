const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const router = require('express').Router();
const { ensureAutenticated } = require('../config/security.config')

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.get('/protected', ensureAutenticated, (req, res) => {
    res.render('protected', {'user': req.user}); 
})

router.get('/', (req, res) => {
    res.render('index', {'user': req.user}); 
})

module.exports = router;