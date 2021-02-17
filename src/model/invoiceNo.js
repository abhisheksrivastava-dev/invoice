const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    invoice_no: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice