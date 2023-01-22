function validate() {
    const userID = validateUserID();
    console.log("user ID check: ", userID);
    const email = validateEMail();
    console.log("email check: ", email);
    const PWD = validatePWD();
    console.log("password check: ", PWD);
    const name = validateName()
    console.log("name check: ", name);
    const country = validateCountry();
    console.log("country check: ", country);
    const language = validateLanguage()
    console.log("language check: ", language);


    const success = userID && email && PWD && name && country && gender && language;
    if (success){
        alertInfo();
    }
    console.log(success);
    return success;
}

function validateUserID() {
    inputUserIdValue = document.getElementById("userID").value;

    output = document.getElementById("userID-output");

    // Min length = 5, max = 12
    const idPattern = /[A-Z].{3,10}[^a-zA-Z]$/

    return validatePattern(idPattern, inputUserIdValue, output, msgFalse = `User ID should be 5-12 characters long, 
    start with a capital letter and end with a special character or number`);
}


function validatePattern(pattern, text, output, msgTrue = "Looks good!", msgFalse = "Not quite right") {
    if (!pattern.test(text)) {
        incorrect(output, msgFalse);
        return false;
    }

    correct(output, msgTrue);
    return true;
}

function validatePWD() {
    const min = 12;
    const recommended = 14;

    input_PWD_Value = document.getElementById("password_user").value;
    input_PWD2_Value = document.getElementById("password_user2").value;

    output = document.getElementById("password_user-output");

    // checks if both passwords are the same || Technically not RegEx, but we feel like this is a vital part of the page working as it should. 
    if (input_PWD_Value !== input_PWD2_Value) {
        console.log("Passwords are not the same");
        console.log("PWD1: " + input_PWD_Value);
        console.log("PWD2: " + input_PWD2_Value);
        incorrect(output, "Passwords are not the same");
        return false;
    }

    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{12,}/;


    return validatePattern(pattern, input_PWD_Value, output, msgFalse = `Password should be at least 12 characters long, 
    and consist of lowercase and uppercase letters, numbers and special characters`);
}

function validateName() {
    first_name = document.getElementById("fname").value;
    last_name = document.getElementById("lname").value;
    output_first = document.getElementById("fname-output");
    output_last = document.getElementById("lname-output");

    const pattern = /[A-Z]\w*/;

    const firstNameValid = validatePattern(pattern, first_name, output_first);
    const lastNameValid = validatePattern(pattern, last_name, output_last);
    return firstNameValid && lastNameValid;
}

// function for checking if a country is choosen.
// this function is technically not really needed because we can just set the first option as default
function validateCountry() {
    input_country = document.getElementById("country").value;
    output = document.getElementById("country-output");
    pattern = /.+/; // Note that the default option is "", so any character will indicate a non-default option chosen.

    return validatePattern(pattern, input_country, output);
}

// function for checking if a language is choosen.
// this function is technically not really needed because we can just set the first option as default
function validateLanguage() {
    input = document.getElementById("language").value;
    output = document.getElementById("language-output");

    pattern = /.+/; // Note that the default option is "", so any character will indicate a non-default option chosen.
    return validatePattern(pattern, input, output);
}

function validateEMail() {
    input = document.getElementById("email_user").value;
    output = document.getElementById("email_user-output");
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}/
    return validatePattern(pattern, input, output);
}

// changes the output field to the correct style
function correct(node, text) {
    node.innerHTML = text;
    node.className = "input-correct";
}

// changes the output field to the incorrect style
function incorrect(node, text) {
    node.innerHTML = text;
    node.className = "input-wrong";
}

// function for loading the file content
function loadFile(filePath) {
    var req = new XMLHttpRequest();
    req.open("GET", filePath, false);
    req.send();
    var result = "nothing :)";
    if (req.status == 200) {
        result = req.responseText;
    }
    return result;
}

function alertInfo() {
    user_id = document.getElementById("userID").value;
    email = document.getElementById("email_user").value;
    PWD = document.getElementById("password_user").value;
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    account_type = document.querySelector('input[name="account_type"]:checked').value;
    street = document.getElementById("street_name").value;
    house_number = document.getElementById("house_number").value;
    city = document.getElementById("city").value;
    zipcode = document.getElementById("zip_code").value;
    country = document.getElementById("country").value;
    gender = document.querySelector('input[name="gender"]:checked').value;
    language = document.getElementById("language").value;
    image = document.getElementById("profile_picture").value;
    bio = document.getElementById("bio").value;

    let text = "";
    text += "User ID: " + user_id + "\n";
    text += "Email: " + email + "\n";
    text += "Password: " + PWD + "\n";
    text += "First name: " + fname + "\n";
    text += "Last name: " + lname + "\n";
    text += "Account Type: " + account_type + "\n";
    text += "Street Name: " + street + "\n";
    text += "House number: " + house_number + "\n";
    text += "City: " + city + "\n";
    text += "Zip Code: " + zipcode + "\n";
    text += "Country: " + country + "\n";
    text += "Gender: " + gender + "\n";
    text += "Language: " + language + "\n";
    text += "Profile picture: " + image + "\n";
    text += "Bio: " + bio + "\n";
    alert(text);
    return false;
}