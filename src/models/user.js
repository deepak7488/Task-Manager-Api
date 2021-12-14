const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be Postive Number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain password');
            }
        }


    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.generateAuthTokens = async function() {
        const user = this
        const token1 = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRETS, { expiresIn: "7 days" })
        user.tokens = user.tokens.concat({ token: token1 })
        await user.save()
        return token1
    }
    // userSchema.methods.getPublicProfile = async function() {

//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password
//     delete userObject.tokens
//     return userObject

// }
userSchema.methods.toJSON = function() {

    const user = this
        // console.log(this)
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject

}
userSchema.statics.findByCredentials = async(email, password) => {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Unable to login!')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Unable to login!')
        }
        return user
    }
    //hash password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        // console.log("Password Hassed Succesfuly!")
        // next()
    }
    // console.log(await bcrypt.compare('deepak@2001', user.password))
    next()
})
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User