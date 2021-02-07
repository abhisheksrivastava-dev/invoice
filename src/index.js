const express = require('express');
require('./db/mongoose')

const bodyParser = require('body-parser');
const Customer = require('./model/customer')
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
    console.log(req.body)
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

// app.get('', (req, res) =>{
//   res.render('homepage', {
//       title : 'Weather App',
//       name : 'Abhishek Srivastava'
//   })
// })

// app.get('/weather', (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: 'You must provide address term'
//     })
//   }
//   console.log(req.query.address)
//   // res.send(req.query.address)
//   res.send({
//     forecast: "1",
//     address: req.query.address
//   })
// })

app.listen(port, () => {
    console.log(`Server running on port ${port}!!`);
});