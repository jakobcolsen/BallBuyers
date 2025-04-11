const mongoose =  require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: [true, "Username is required"], unique: true},
    password: {type: String, required: [true, "Password is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true},
    firstName: {type: String, required: [true, "First name is required"]},
    lastName: {type: String, required: [true, "Last name is required"]},
});

// Called before saving
userSchema.pre("save", function(next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10)
        .then(hash => { this.password = hash; })
        .catch(err => { return next(err); });
    }
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
