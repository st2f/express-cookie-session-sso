const { createUser, updateLastLogin } = require('../queries/user.queries');

exports.userNew = (req, res, next) => {    
    res.render('signup', { error: null });
}

exports.userCreate = async(req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        req.login(user, (err) => {
            if (err) { next(e); }
            updateLastLogin(req.user).then(u => {
                console.log('Successful login:', u);
                res.redirect('/'); 
            })
        });
        
    } catch(e) {
        console.log(e)
        res.render('signup', { error: e.message });
    }
}