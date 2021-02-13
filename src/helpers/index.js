const { createInvoice } = require("./createPdf");

function invoice(data) {
    const invoice = {
        details: {
            // number: ,
            address: "1234 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: 94111,
            baddress: "BH-372 SECTOR-12 PRATAP VIHAR GHAZIABAD INDIAN UTTAR PRADESH"
        },
        shipping: {
            name: "John Doe",
            address: "1234 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: 94111,
            baddress: "BH-372 SECTOR-12 PRATAP VIHAR GHAZIABAD INDIAN UTTAR PRADESH"
        },
        items: [{
                item: "TC 100",
                description: "8425",
                quantity: 2,
                amount: 50000
            },
            {
                item: "OZONE GENERATOR 2-GM",
                description: "USB",
                quantity: 1,
                amount: 2000
            },
            {
                item: "OZONE GENERATOR 5-GM",
                description: "USB",
                quantity: 1,
                amount: 2000
            },
            {
                item: "OZONE GENERATOR 30-GM",
                description: "USB",
                quantity: 1,
                amount: 2000
            },
            {
                item: "OZONE GENERATOR 10-GM",
                description: "USB",
                quantity: 1,
                amount: 2000
            },
            {
                item: "OZONE GENERATOR 15-GM   BBBBBBBBBB CCCCCC",
                description: "USB",
                quantity: 1,
                amount: 2000
            },
            {
                item: "OZONE GENERATOR 12-GM",
                description: "USB",
                quantity: 1,
                amount: 2000
            },
            {
                item: "OZONE GENERATOR 20-GM",
                description: "USB",
                quantity: 1,
                amount: 2000
            }

        ],
        subtotal: 8000,
        paid: 0,
        invoice_nr: 1234,
        customer: "ABHISHEK SRIVASTAVA",
        party: "OZONE INDIA TECHNOLOGY",
    };

    createInvoice(invoice, "E:\\githubProject\\invoice\\src\\helpers\\invoice2.pdf");
    console.log(data)
}

module.exports = {
    invoice
}