const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const storeShema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowerCase: true,
            enum: {
                values: [
                    'dhaka',
                    'rajshahi',
                    'chattogram',
                    'sylhet',
                    'khulna',
                    'barishal',
                    'rangpur',
                    'mymensingh'
                ]
            },
            message: "{VALUE} is not a correct division!"
        },
        description: String,
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        manager: {
            name: String,
            contactNumber: String,
            id: {
                type: ObjectId,
                ref: 'User'
            }
        }
    },
    {
    timestamps: true
});


const Store = mongoose.model('Store', storeShema);

module.exports = Store