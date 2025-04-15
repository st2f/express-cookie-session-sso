const User = require('../database/models/user.model');

exports.createUser = async (body) => {
  try {
    const hashedPassword = await User.hashPassword(body.password);
    const user = new User({ 
      username: body.username,
      local: {
        email: body.email,
        password: hashedPassword
      }
    })
    return user.save();
  } catch(e) {
    throw e;
  }
}

exports.findUserPerEmail = (email) => {
  return User.findOne({ 'local.email': email });
}

exports.findUserPerGoogleId = (googleId) => {
  return User.findOne({ 'local.googleId': googleId });
}

exports.updateLastLogin = (user) => {
  try {
    return User.findOneAndUpdate( 
      { 'local.email': user.local.email }, 
      { 'lastLogin' : Date.now() },
      { new: true }
    );
  } catch(e) {
    next(e);
  }
  
}