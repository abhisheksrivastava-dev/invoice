const mongoose = require('mongoose')
const validator = require('validator')

const customerSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true
    },
    customer_name: {
        type: String,
        required: true,
        trim: true
    },
    gstin: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number
    },
    email: {
        type:  String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    billing_address: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    
},
{
    timestamps: true
})

const Customer = mongoose.model('User', customerSchema)

module.exports = Customer