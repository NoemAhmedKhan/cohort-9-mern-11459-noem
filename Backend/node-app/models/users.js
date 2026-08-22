const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8,
        maxlength: 16
    }
}, { timestamps: true });

schema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const saltRound = 12;
        this.password = await bcrypt.hash(this.password, saltRound);
    } catch (error) {
        throw new Error('Save password failed!');
    }
});

const User = mongoose.model("User", schema);

module.exports = User;