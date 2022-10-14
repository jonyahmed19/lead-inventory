const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const validator = require("validator");

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a brand name'],
        maxLength: 100,
        unique: [true, 'Please provide unique brand name'],
        lowerCase: true
    },
    description: String,
    email: {
        type: String,
        lowerCase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    website: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid url']
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    suppliers: [
        {
            name: String,
            contactNumber: String,
            id: {
                type: ObjectId,
                ref: "Supplier"
            }
        }

    ]

})

const Brand = mongoose.model("Brand", brandSchema)

module.exports = Brand;





