const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter an valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter an password'],
        minLength: [6, 'password at lease 6 characters']
    }
});
// hash password before save to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hashSync(this.password, salt);
    next()
})
// check user when login
userSchema.static.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const authen = await bcrypt.compareSync(password, user.password)
        if (authen) return user;
    }
    throw Error('incorrect username or password');
}
const User = mongoose.model('user', userSchema)
module.exports = User;