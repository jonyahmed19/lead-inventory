const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const validator = require('validator');


const supplierShema = mongoose.Schema(
    {
        name: {
            required: [true, 'Please provide a name'],
            lowerCase: true,
            trim: true,
            type: String,
            minLength: [3, 'Name must be at least 3 characters'],
            maxLength: [100, 'Name is too large']
        },
        email: {
            type: String,
            validate: [validator.isEmail, 'Provide a valid Email'],
            trim: true,
            lowerCase: true,
            unique: true
        },
        brand: {
            name: {
                type: String,
                trim: true,
                required: true
            },
            id: {
                type: ObjectId,
                required: true,
                ref: "Brand"
            }
        },
        contactNumber: [{
            type: String,
            required: [true, 'Please provide a contact number'],
            validate: {
                validator: (value) => {
                    return validator.isMobilePhone(value)
                },
                message: 'Please provide a valid phone number'

            }
        }],
        emergencyContactNumber: {
            type: String,
            required: [true, 'Please provide a emergency contact number'],
            validate: {
                validator: value => {
                    return validator.isMobilePhone(value)
                },
                message: 'Please provide a valid phone number'
            }
        },
        tradeLicenseNumber: {
            type: Number,
            required: [true, 'Please provide your trade license number']
        },
        presentAddress: {
            type: String,
            required: [true, 'Please provide your present address']
        },
        permanentAddress: {
            type: String,
            required: [true, 'Please provide your permanent address'],
        },
        location: {
            type: String,
            required: true,
            lowerCase: true,
            enum: {
                values: ["dhaka", "rajshahi", "chattogram", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
                message: "{VALUE} is not  a correct division!",
            }
        },
        imageURL: {
            type: String,
            validate: [validator.isURL, 'Please provide a valid url']
        },
        nationalIdImageURL: {
            type: String,
            required: true,
            validate: [validator.isURL, 'Please provide a valid url']
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'inactive']
        }
    },
    {
        timestamps: true
    }
);


const Supplier = mongoose.model('Supplier', supplierShema);

module.exports = Supplier;