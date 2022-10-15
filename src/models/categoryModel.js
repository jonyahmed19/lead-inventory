const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const validator = require('validator');

const categoryShema = mongoose.Schema(
    {
        name: {
            lowerCase: true,
            type: String,
            trim: true,
            required: [true, 'Please provide a category name'],
            unique: [true, 'Please provide unique category name']
        },
        description: {
            type: String
        },
        imageUrl: {
            type: String,
            validate: [validator.isURL, 'Please provide a valid URL']
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', categoryShema)

module.exports = Category