const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const validator = require('validator');


const storeShema = mongoose.Schema(
    {
      productId: {
          type: ObjectId,
          required: true,
          ref: 'Product'
      },
      name: {
          type: String,
          required: true,
          trim: true,
          lowerCase: true,
          minLength: [3, 'Name must be at least 3 characters'],
          maxLength: [100, 'Name is too large']
      },
      description:{
          type: String,
          required: true
      },
        unit: {
            type: String,
            required: true,
            enum: {
                values: ['kg', 'litre', 'pcs', 'bag'],
                message: 'Unit value can\'t be {VALUE}, must be kg/litre/pcc/bag'
            }
        },
        imageURLs: [
            {
                type: String,
                required: true,
                validate: [validator.isURL, 'Please provide valid url(s)']
            }
        ],
        price: {
          type: Number,
            required: true,
            min: [0, 'Product quantity can\'t be negative']
        },
        category: {
          type: String,
            required: true,
        },
        brand: {
          name: {
              type: String,
              required: true,
          },
            id: {
              type: ObjectId,
                ref: 'Brand',
                required: true,
            }

        },
        status: {
          type: String,
            required: true,
            enum: {
              values: ['in-stock', 'out-of-stock', 'discontinued'],
                message: 'Status can\'t be {VALUE}'
            }
        },
        store: {
          name: {
              type: String,
              trim: true,
              required: [true, 'Please provide a store name'],
              lowerCase: true,
              enum: {
                  values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
                  message: "{VALUE} is not a valid name"
              }
          },
            id: {
              type: ObjectId,
                required: true,
                ref: 'Store'
            }
        },
        suppliedBy: {
          name: {
              type: String,
              trim: true,
              required: [true, 'Please provide a supplier name']
          },
            id: {
              type: ObjectId,
                ref: 'Supplier'
            }
        },
        sellCount: {
          type: Number,
            default: 0,
            min: 0
        }


    },
    {
        timestamps: true
    }
);

const Store = mongoose.model('Store', storeShema);

module.exports = Store;