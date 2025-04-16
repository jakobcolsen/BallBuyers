const mongoose =  require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: {type: String, required: [true, "Password is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true},
    firstName: {type: String, required: [true, "First name is required"]},
    lastName: {type: String, required: [true, "Last name is required"]},
});

// Called before saving
userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
    .catch(err => { next(err) });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
