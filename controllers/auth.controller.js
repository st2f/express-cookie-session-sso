const passport = require('passport');
const { updateLastLogin } = require('../queries/user.queries');

exports.sessionNew = (req, res, next) => {
  res.render('signin', { error:null });
}

exports.sessionCreate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      next(e); 
      return; 
    }

    if (!user) {
        res.render('signin', { error: info.message });
        return;
    }

    req.login(user, (err) => {
      if (err) { next(e); }
      updateLastLogin(req.user).then(u => {
        console.log('Successful login:', u);
        res.redirect('/'); 
      })
    });
    
  })(req, res, next);
}

exports.sessionDelete = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};