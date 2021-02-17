const express = require('express');
require('./db/mongoose')
const { ObjectId } = require('mongodb')
const invNum = require('./helpers/invoiceNumber')

const bodyParser = require('body-parser');
const Customer = require('./model/customer');
const Invoice = require('./model/invoiceNo');
const { invoice } = require('./helpers/index');
const app = express();

const port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

data = {}

app.post('/invoice', async(req, res) => {
    data = {
        "company_name": req.body.company_name,
        "customer_name": req.body.customer_name,
        "email": req.body.email,
        "gstin": req.body.gstin,
        "mobile": req.body.mobile,
        "billing_address": req.body.billing_address,
        "shipping_address": req.body.shipping_address,
        "state": req.body.state
    }
    var invoiceNoGenerator = ''
    try {
        const invvoice = await Invoice.findOne({
            _id: ObjectId("602b7f25106bb7adc4aa1603")
        })
        invoiceNoGenerator = invNum.next(invvoice["invoice_no"])
        invvoice["invoice_no"] = invoiceNoGenerator
        await invoice(req.body, invoiceNoGenerator)
        const customer = new Customer(data)
        await invvoice.save()
        await customer.save()
    } catch (e) {
        res.status(400).send(e)
    }
    res.status(201).send('Done')
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!!`);
});