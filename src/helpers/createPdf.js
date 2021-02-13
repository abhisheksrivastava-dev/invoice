const fs = require("fs");
const PDFDocument = require("pdfkit");

var spaceValue = 50;

function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc);
    generateInformation(doc, invoice);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc
        .image("E:\\githubProject\\invoice\\src\\helpers\\company_logo.png", 475, spaceValue, { width: 70 })
        .image("E:\\githubProject\\invoice\\src\\helpers\\iso.png", 50, spaceValue, { width: 55 })
        .image("E:\\githubProject\\invoice\\src\\helpers\\ce.png", 100, spaceValue, { width: 50 })
        // .fillColor("#444444")
        // .fontSize(25)
        // .text("OZ-INDIA", 140, 75)
        .fillColor("#444444")
        .fontSize(20)
        .text("OZONE INDIA TECHNOLOGY", 50, spaceValue - 5, { align: "center" })
        .fontSize(10)
        .text("BH-372 SECTOR-12 PRATAP VIHAR GHAZIABAD-201009(U.P.)", 50, spaceValue + 15, { align: "center" })
        // .text("", 200, 80, { align: "right" })
        .text("GSTIN No :- 09BSZPS3331L1ZT", 50, spaceValue + 30, { align: "center" })
        .text("M: +91-9650017943,9599500580", 50, spaceValue + 45, { align: "center" })
        .text("Email:- ozoneindiatechnology@gmail.com Website:- www.ozoneindiatechnology.com", 50, spaceValue + 60, { align: "center" })
        // .text("", 50, 125, { align: "center" })
        .moveDown();
    generateHr(doc, spaceValue + 75);
}

function generateInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Tax Invoice", 50, spaceValue + 80, { align: "center" });

    generateHr(doc, spaceValue + 100);

    const customerInformationTop = spaceValue + 105;

    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.invoice_nr, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Reverse Charge:", 50, customerInformationTop + 30)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            150,
            customerInformationTop + 30
        )
        .text("State(Code):", 50, customerInformationTop + 45)
        .text(
            "Uttar Pradesh(09)",
            150,
            customerInformationTop + 45
        )

    .font("Helvetica-Bold")
        .text("Transport Mode:", 300, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.invoice_nr, 450, customerInformationTop)
        .font("Helvetica")
        .text("Vehicle Number:", 300, customerInformationTop + 15)
        .text(formatDate(new Date()), 450, customerInformationTop + 15)
        .text("Date of Supply:", 300, customerInformationTop + 30)
        .text(
            invoice.subtotal,
            450,
            customerInformationTop + 30
        )
        .text("Place of Supply:", 300, customerInformationTop + 45)
        .text("Ghaziabad", 450, customerInformationTop + 45)
        .moveDown();

    generateHr(doc, customerInformationTop + 60);
}

function generateCustomerInformation(doc, invoice) {

    const addressInfo = spaceValue + 170;
    doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Billing Address", 50, addressInfo);
    doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Shipping Address", 300, addressInfo);

    generateHr(doc, addressInfo + 15);

    const customerInformationTop = addressInfo + 20;

    doc
        .fontSize(10)
        // .text("er:", 50, customerInformationTop)
        // .font("Helvetica-Bold")
        .text(invoice.customer, 50, customerInformationTop) // customername 
        .text(invoice.party, 50, customerInformationTop + 15) // companyname
        // .font("Helvetica")
        // .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(invoice.shipping.baddress, 50, customerInformationTop + 30, { width: 250 }) //Address
        // .text(invoice.shipping.city, 50, customerInformationTop + 45) //Address
        .text("GSTIN No:", 50, customerInformationTop + 60)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            150,
            customerInformationTop + 60
        ) // GSTIN
        .text("Email:", 50, customerInformationTop + 75)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            150,
            customerInformationTop + 75
        ) // Email
        .text("M:", 50, customerInformationTop + 90)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            150,
            customerInformationTop + 90
        ) // Mobile
        .text("State(Code):", 50, customerInformationTop + 105)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            150,
            customerInformationTop + 105
        ) // State(Code)

    .font("Helvetica-Bold")
        // .text("Transport Mode:", 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.customer, 300, customerInformationTop) // customername 
        .text(invoice.party, 300, customerInformationTop + 15) // companyname
        // .font("Helvetica")
        // .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(invoice.shipping.baddress, 300, customerInformationTop + 30) //Address
        // .text(invoice.shipping.city, 300, customerInformationTop + 45) //Address
        .font("Helvetica")
        .text("M:", 300, customerInformationTop + 60) // mobile
        .text(formatDate(new Date()), 450, customerInformationTop + 60)
        .text("State(Code):", 300, customerInformationTop + 75)
        .text(
            formatCurrency(invoice.subtotal - invoice.paid),
            450,
            customerInformationTop + 75
        ) //State(Code)
        .text("P.O. No.:", 300, customerInformationTop + 90)
        .text(formatDate(new Date()), 450, customerInformationTop + 90) // PO no.
        .text("P.O. Date:", 300, customerInformationTop + 105)
        .text(formatDate(new Date()), 450, customerInformationTop + 105) // PO Date
        .moveDown();

    generateHr(doc, customerInformationTop + 120);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    var invoiceTableTop = spaceValue + 315;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Product Description",
        "HSN Code",
        "Qty",
        "Rate",
        "Tax",
        "Net Amount",
        'N'
    );
    generateHr(doc, invoiceTableTop + 10);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        var position = invoiceTableTop + (i + 1) * 15;
        generateTableRow(
            doc,
            position,
            item.item,
            item.description,
            item.quantity,
            formatCurrency(item.amount / item.quantity),
            item.quantity,
            formatCurrency(item.amount),
            'Y'
        );
        invoiceTableTop = invoiceTableTop + 10
            // generateHr(doc, position + 20);
            // invoiceTableTop = invoiceTableTop + 20
    }

    const packaging = invoiceTableTop + (i + 1) * 15;
    generateTableRow(
        doc,
        packaging,
        "",
        "PACKAGING CHARGES",
        "",
        "",
        "",
        formatCurrency(invoice.subtotal)
    );

    const subtotalPosition = packaging + 15;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "TOTAL AMOUNT BEFORE TAX",
        "",
        "",
        "",
        formatCurrency(invoice.paid)
    );

    const paidToDatePosition = subtotalPosition + 15;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "TOTAL TAX AMOUNT",
        "",
        "",
        "",
        formatCurrency(invoice.subtotal - invoice.paid)
    );

    const duePosition = paidToDatePosition + 15;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "TOTAL AMOUNT AFTER TAX",
        "",
        "",
        "",
        formatCurrency(invoice.subtotal - invoice.paid)
    );
    doc.font("Helvetica");
}

function generateTableRow(
    doc,
    y,
    Product_Description,
    HSN_Code,
    Qty,
    Rate,
    Tax,
    Net_Amount,
    filter
) {
    const table = 50
    doc
        .fontSize(10)
        .text(Product_Description, table, y, { width: 250 })
        .text(HSN_Code, table + 240, y)
        .text(Qty, table + 300, y)
        .text(Rate, table + 330, y)
        .text(Tax, table + 390, y)
        .text(Net_Amount, table + 420, y);
    if (filter == 'Y') {
        generateHr(doc, y + 20);
    }
}

function generateFooter(doc) {
    const footer = 680;
    doc
        .fontSize(10)
        .text("Thank you for your business.", 50, footer, { align: "center", width: 500 });
    doc
        .font("Helvetica")
        .text("Terms & conditions", 50, footer + 15)
        .text("If Bills is not paid within 30 days,", 50, footer + 30)
        .text("interest @ 24% will be ", 50, footer + 45)
        .text("SUBJECT TO GHAZIABAD JURISDICTION", 50, footer + 60);
    generatevr(doc, 247, 695)
    doc
        .font("Helvetica-Bold")
        .text("Bank Details", 257, footer + 15)
        .font("Helvetica-Bold")
        .text("CENTRAL BANK OF INDIA", 257, footer + 30)
        .font("Helvetica-Bold")
        .text("BANK A/C: 3347547141", 257, footer + 45)
        .font("Helvetica-Bold")
        .text("BANK IFSC: CBIN0282338", 257, footer + 60)
    generatevr(doc, 400, 695)
    doc
        .font("Helvetica")
        .text("PAYMENT TERMS", 410, footer + 15)
        .font("Helvetica")
        .text("50% ADVANCE", 410, footer + 30)
        .text("40% PRIOR DELIVERY", 410, footer + 45)
        .text("10% AFTER iNSTALLATION", 410, footer + 60)
    doc
        .text("(This is computer generated document, Hence it doesn't required signature.)", 50, footer + 80, { align: "center", width: 500 })
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function generatevr(doc, x, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(x, y)
        .lineTo(x, y + 55)
        .stroke();
}

function formatCurrency(cents) {
    return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
}

module.exports = {
    createInvoice
};