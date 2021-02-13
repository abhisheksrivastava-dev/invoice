const express = require('express');
require('./db/mongoose')

const bodyParser = require('body-parser');
const Customer = require('./model/customer');
const { invoice } = require('./helpers/index');
const app = express();
// const customerRouter = require('./routers/customer')

const port = process.env.PORT || 3000

app.use(express.json())
    // app.use(customerRouter)
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
    await invoice(req.body)
        // console.log(req.body)
        // res.send(`Full name is:${req.body.company_name} ${req.body.customer_name}.`);
    const customer = new Customer(data)
    try {
        await customer.save()
            // res.status(201)
    } catch (e) {
        res.status(400).send(e)
    }
    res.status(201).send('Done')
        // console.log(data)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!!`);
});