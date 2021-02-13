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
// Next id for adding a new Product
var nextId = 1;
// ID of Product currently editing
var activeId = 0;

function productDisplay(ctl) {
    var row = $(ctl).parents("tr");
    var cols = row.children("td");

    activeId = $($(cols[0]).children("button")[0]).data("id");
    $("#productname").val($(cols[1]).text());
    $("#hsn_code").val($(cols[2]).text());
    $("#amount").val($(cols[3]).text());
    $("qty").val($(cols[4]).text());
    $("net_amount").val($(cols[5]).text());
    $("tax").val($(cols[5]).text());

    // Change Update Button Text
    $("#updateButton").text("Update");
}

function productUpdate() {
    if ($("#updateButton").text() == "Update") {
        productUpdateInTable(activeId);
    } else {
        productAddToTable();
    }

    // Clear form fields
    formClear();

    // Focus to product name field
    $("#productname").focus();
}

// Add product to <table>
function productAddToTable() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }

    // Append product to table
    $("#productTable tbody").append(
        productBuildTableRow(nextId));

    // Increment next ID to use
    nextId += 1;
}

// Update product in <table>
function productUpdateInTable(id) {
    // Find Product in <table>
    var row = $("#productTable button[data-id='" + id + "']")
        .parents("tr")[0];

    // Add changed product to table
    $(row).after(productBuildTableRow(id));
    // Remove original product
    $(row).remove();

    // Clear form fields
    formClear();

    // Change Update Button Text
    $("#updateButton").text("Add");
}

// Build a <table> row of Product data
function productBuildTableRow(id) {
    var ret =
        "<tr>" +
        "<td>" +
        "<button type='button' " +
        "onclick='productDisplay(this);' " +
        "class='btn btn-default' " +
        "data-id='" + id + "'>" +
        "<span class='glyphicon glyphicon-edit' />" +
        "</button>" +
        "</td>" +
        "<td>" + "<input name='p_name_" + id + "' value=" + $("#productname").val() + ">" + "</td>" +
        "<td>" + "<input name='h_name_" + id + "' value=" + $("#hsn_code").val() + ">" + "</td>" +
        "<td>" + "<input name='amount_" + id + "' value=" + $("#amount").val() + ">" + "</td>" +
        "<td>" + "<input name='discont_" + id + "' value=" + $("#qty").val() + ">" + "</td>" +
        "<td>" + "<input name='net_amount_" + id + "' value=" + $("#net_amount").val() + ">" + "</td>" +
        "<td>" + "<input name='tax_" + id + "' value=" + $("#tax").val() + ">" + "</td>" +
        "<td>" +
        "<button type='button' " +
        "onclick='productDelete(this);' " +
        "class='btn btn-default' " +
        "data-id='" + id + "'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>"

    return ret;
}

// Delete product from <table>
function productDelete(ctl) {
    $(ctl).parents("tr").remove();
}

// Clear form fields
function formClear() {
    $("#productname").val("");
    $("#hsn_code").val("");
    $("#amount").val("");
    $("#qty").val("");
    $("#net_amount").val("");
    $("#tax").val("");
}

function updateInput() {
    var qty = document.getElementsByName("qty")[0].value;
    var amount = document.getElementsByName("amount")[0].value;
    document.getElementsByName("net_amount")[0].value = amount * qty;
}

function length_validation(uid, len) {
    var uid_len = uid.value.length;
    if (uid_len == len) {
        return true;
    } else {
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
    } else {
        alert(`${uname.getAttribute("placeholder")} should not be empty`);
        uname.focus();
        return false;
    }
}

function alphanumeric(uadd) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (uadd.value.match(letters)) {
        return true;
    } else {
        alert(`${uadd.getAttribute("placeholder")} should not be empty`);
        uadd.focus();
        return false;
    }
}

function allnumeric(uzip) {
    var numbers = /^[0-9]+$/;
    if (uzip.value.match(numbers)) {
        return true;
    } else {
        alert(`${uzip.getAttribute("placeholder")} should not be empty`);
        uzip.focus();
        return false;
    }
}

function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
        return true;
    } else {
        alert("Enter an valid email address!");
        uemail.focus();
        return false;
    }
}