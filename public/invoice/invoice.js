function formValidation() {
    var company_name = document.invoice.company_name;
    var customer_name = document.invoice.customer_name;
    var email = document.invoice.email;
    var gstin = document.invoice.gstin;
    var mobile = document.invoice.mobile;
    if (allLetter(company_name)) {
        if (allLetter(customer_name)) {
            if (ValidateEmail(email)) {
                if (length_validation(gstin, 15)) {
                    if (allnumeric(mobile)) {
                        if (length_validation(mobile, 10)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}
// Add products to <table>
// function productsAdd() {
//     $("#productTable tbody").append("<tr>" + 
//         "<td>My First Video</td>" +
//         "<td>6/11/2015</td>" +
//         "<td>www.pluralsight.com</td>" +
//         "</tr>");
// }
if ($("#productTable tbody").length == 0) {
    $("#productTable").append("<tbody></tbody>");
}
function productsAdd() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }
    
    // Append product to the table
    $("#productTable tbody").append("<tr>" +
        "<td>Extending Bootstrap with CSS, JavaScript and jQuery</td>" +
        "<td>6/11/2015</td>" +
        "<td>http://bit.ly/1SNzc0i</td>" +
        "</tr>");
        
    $("#productTable tbody").append("<tr>" +
        "<td>Build your own Bootstrap Business Application Template in MVC</td>" +
        "<td>1/29/2015</td>" +
        "<td>http://bit.ly/1I8ZqZg</td>" +
        "</tr>");
}
$(document).ready(function () {
    productsAdd();
});
function productUpdate() {
    if ($("#productname").val() != null && $("#productname").val() != '') {
        // Add product to Table
        productAddToTable();

        // Clear form fields
        formClear();

        // Focus to product name field
        $("#productname").focus();
    }
}
function productAddToTable() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }

    // Append product to the table
    $("#productTable tbody").append("<tr>" +
        "<td>" + $("#productname").val() + "</td>" +
        "<td>" + $("#introdate").val() + "</td>" +
        "<td>" + $("#url").val() + "</td>" +
        "</tr>");
}

function formClear() {
    $("#productname").val("");
    $("#introdate").val("");
    $("#url").val("");
}
function length_validation(uid, len) {
    var uid_len = uid.value.length;
    if (uid_len == len) {
        return true;
    }
    else {
        alert(`${uid.getAttribute("placeholder")} should not be empty or length be ${len} `);
        uid.focus();
        return false;
    }
}
function allLetter(uname, print) {
    var letters = /^[A-Za-z]+$/;
    console.log(uname);
    if (uname.value.match(letters)) {
        return true;
    }
    else {
        alert(`${uname.getAttribute("placeholder")} should not be empty`);
        uname.focus();
        return false;
    }
}
function alphanumeric(uadd) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (uadd.value.match(letters)) {
        return true;
    }
    else {
        alert(`${uadd.getAttribute("placeholder")} should not be empty`);
        uadd.focus();
        return false;
    }
}
function allnumeric(uzip) {
    var numbers = /^[0-9]+$/;
    if (uzip.value.match(numbers)) {
        return true;
    }
    else {
        alert(`${uzip.getAttribute("placeholder")} should not be empty`);
        uzip.focus();
        return false;
    }
}
function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
        return true;
    }
    else {
        alert("Enter an valid email address!");
        uemail.focus();
        return false;
    }
}