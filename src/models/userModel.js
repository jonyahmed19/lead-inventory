const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const validator = require('validator');
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, 'Provide a valid Email'],
            trim: true,
            lowerCase: true,
            unique: true,
            required: [true, 'Email address is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: value =>{
                    return validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1
                    })
                }
            },
            message: "Password {VALUE} is not strong enough"
        },
        confirmPassword: {
            type: String,
            require: [true, 'Please confirm your password'],
            validate: {
                validator: value => {
                    return value === this.password
                },
                message: "Passwords don't match"
            }
        },
        role: {
            type: String,
            enum: ['buyer', 'store-manager', 'admin'],
            default: 'buyer'
        },
        firstName: {
            type: String,
            required: [true, 'Please provide a first name'],
            trim: true,
            minLength: [3, 'Name must be at least 3 characters'],
            maxLength: [100, "name is too large"]
        },
        lastName: {
            type: String,
            required: [true, 'Please provide a last name'],
            trim: true,
            minLength: [3, 'Name must be at least 3 characters'],
            maxLength: [100, "name is too large"]
        },
        contactName: {
            type: String,
            validate: [validator.isMobilePhone, 'Please provide a valid contact number']
        },
        shippingAddress: String,
        imageURL: {
            type: String,
            validate: [validator.isURL, 'Please provide a valid url']
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'inactive', 'blocked'],

        },
        confirmToken: String,
        confirmationTokenExpires: Date,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', function (next){
    if(!this.isModified('password')){
        return next()
    }
    const password= this.password;
    const hashedPassword= bcrypt.hashSync(password)
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next()
})


const User = mongoose.model('User', userSchema);

module.exports = User;