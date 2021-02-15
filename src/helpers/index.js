const { createInvoice } = require("./createPdf");

function invoice(data) {
    console.log(data)
    var obj = JSON.parse(JSON.stringify(data));
    var keys = Object.keys(obj);
    var j = 1;
    for (var i = 0; i < keys.length; i++) {
        if ((keys[i]).includes(j.toString())) {
            // console.log(keys[i])
            // console.log(' iam in ');
            j = j + 1
        }
        // console.log(keys[i]);
    }
    var totalTax = 0
    var totalAmount = 0
    var totalTaxAmount = 0
    var item = []
    for (i = 1; i < j; i++) {
        var tax = ''
        if (data['tax_' + i.toString()] == 'up') {
            amountTax = parseInt(data['net_amount_' + i.toString()], 10) * 0.18
            amountNet = parseInt(data['net_amount_' + i.toString()], 10) + amountTax
            tax = '9% CGST 9% SGST'
        } else if (data['tax_' + i.toString()] == 'oup') {
            amountTax = parseInt(data['net_amount_' + i.toString()], 10) * 0.18
            amountNet = parseInt(data['net_amount_' + i.toString()], 10) + amountTax
            tax = '18% IGST'
        } else {
            amountTax = parseInt(data['net_amount_' + i.toString()], 10) * 0
            amountNet = parseInt(data['net_amount_' + i.toString()], 10) + amountTax
            tax = 'N/A'
        }
        item[i] = {
                pd: data['p_name_' + i.toString()],
                hsn: data['h_name_' + i.toString()],
                qty: data['discont_' + i.toString()],
                rate: data['amount_' + i.toString()],
                tax,
                amountNet
            }
            // console.log(item[i].pd)
        totalTax = totalTax + amountTax;
        totalAmount = totalAmount + parseInt(data['net_amount_' + i.toString()], 10);
        totalTaxAmount = totalTaxAmount + amountNet;

    }

    totalTax = totalTax + parseInt(data.packageing, 10) * 0.18;
    totalAmount = totalAmount + parseInt(data.packageing, 10);
    totalTaxAmount = totalTaxAmount + parseInt(data.packageing, 10) + parseInt(data.packageing, 10) * 0.18;
    var totalAmountWord = price_in_words(totalTaxAmount);

    const invoice = {
        details: {
            number: data.invoice_no,
            date: data.invoice_date,
            reverse_charge: data.reverse_charge,
            transport: data.transport_mode,
            vehicleNo: data.vehicle_no,
            supplyDate: data.supply_date,
        },
        billing: {
            companyName: data.company_name,
            customerName: data.customer_name,
            address: data.billing_address,
            gstin: data.gstin,
            email: data.email,
            mobile: data.mobile,
            state: data.state
        },
        shipping: {
            address: data.shipping_address,
            mobile: data.shipper_mobile,
            poNo: data.po_no,
            poDate: data.po_date,
        },
        items: item,
        packageing: data.packageing,
        totalTax,
        totalTaxAmount,
        totalAmount,
        totalAmountWord
    };

    // console.log(invoice.items[1].pd)

    createInvoice(invoice, "E:\\githubProject\\invoice\\invoice\\invoice2.pdf");
}

function price_in_words(price) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
        dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
        tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
        handle_tens = function(dgt, prevDgt) {
            return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
        },
        handle_utlc = function(dgt, nxtDgt, denom) {
            return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
        };

    var str = "",
        digitIdx = 0,
        digit = 0,
        nxtDigit = 0,
        words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
            case 0:
                words.push(handle_utlc(digit, nxtDigit, ""));
                break;
            case 1:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 2:
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
                break;
            case 3:
                words.push(handle_utlc(digit, nxtDigit, "Thousand"));
                break;
            case 4:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 5:
                words.push(handle_utlc(digit, nxtDigit, "Lakh"));
                break;
            case 6:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 7:
                words.push(handle_utlc(digit, nxtDigit, "Crore"));
                break;
            case 8:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 9:
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
        }
        str = words.reverse().join("")
    } else str = "";
    return str

}

module.exports = {
    invoice
}