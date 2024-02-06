const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Completed', 'Cancelled']
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    confirmationEmail: String
});

module.exports = mongoose.model('Order', orderSchema);