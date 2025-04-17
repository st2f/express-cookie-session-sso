const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const userSchema = schema({
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        googleId: { type: String },
    },
    username: String,
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

userSchema.statics.hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch(e) {
        throw e;
    }
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password);
}

// UserSchema.statics.login = function login(id, callback) {
//     return this.findByIdAndUpdate(id, { $set : { 'last_login_date' : Date.now() }, { new : true }, callback);

//     return User.findOneAndUpdate( 
//         { 'local.email': user.local.email }, 
//         { 'lastLogin' : Date.now() },
//         { new: true }
//     );
//  }

const User = mongoose.model('user', userSchema);

module.exports = User; 