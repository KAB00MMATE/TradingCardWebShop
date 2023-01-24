const specialChars = "`!@#$%^&*()_+-=[]{}\\\";':|,.<>/?~";
const path = "../documents/dictionary.txt";

const dictionary = loadFile(path).split("\n");

let firstTime = true;

function validate(){
    const id = validateUserID();
    console.log("user ID check: ", id);
    const email = validateEMail();
    console.log("email check: ", email);
    const pwd = validatePWD();
    console.log("password check: ", pwd);
    const name = validateName();
    console.log("name check: ", name);
    const zip = validateZipCode();
    console.log("zip code check: ", zip);
    const country = validateCountry();
    console.log("country check: ", country);
    const gender = validateGender();
    console.log("gender check: ", gender);
    const language = validateLanguage();
    console.log("language check: ", language);

    const success = id && email && pwd && name && zip && country && gender && language;

    if (success){
        alertInfo();
    }

    if (firstTime){
        addingEvents();
        firstTime = false;
    }
    
    return success;
}

function addingEvents(){
    console.log("Adding Events");
    const userID = document.getElementById("userID");
    userID.oninput = validateUserID;
    const pwd = document.getElementById("password_user");
    pwd.oninput = validatePWD;
    const pwd2 = document.getElementById("password_user2");
    pwd2.oninput = validatePWD;
    const fname = document.getElementById("fname");
    fname.oninput = validateName;
    const lname = document.getElementById("lname");
    lname.oninput = validateName;
    const zipcode = document.getElementById("zip_code");
    zipcode.oninput = validateZipCode;
    const country = document.getElementById("country");
    country.oninput = validateCountry;
    const language = document.getElementById("language");
    language.oninput = validateLanguage;
    const email = document.getElementById("email_user");
    email.oninput = validateEMail;

    const genders = document.querySelectorAll("input[name='gender']");
    genders.forEach(element => {
        element.oninput = validateGender;
    });
}

function validateUserID() {
    const min = 5;
    const max = 12;
    input_userID_Value = document.getElementById("userID").value;

    output = document.getElementById("userID-output");

// checks if the input is empty, this is technically not needed. Because we can just use REQUIRED
    if (emptyString(input_userID_Value)){
        console.log("User ID is empty");
        Incorrect(output, "User ID is empty");
        return false;
    }

// although this is already checked through the form, with minlength="5" and maxlength="12"
    if (!checkLength(input_userID_Value, min, max)){
        console.log("Length is incorrect: " + input_userID_Value.length);
        Incorrect(output, "Length should be between: " + min + " and " + max);
        return false;
    }
    
    if (!startsWithCapital(input_userID_Value)){
        console.log("Doesn't start with a capital letter: " + input_userID_Value.charAt(0));
        Incorrect(output, "Doesn't start with a capital letter");
        return false;
    }

    if (!endsWithNumberOrSpecial(input_userID_Value)){
        console.log("Doesn't end with a special character or number: " + input_userID_Value.charAt(input_userID_Value.length-1));
        Incorrect(output, "Doesn't end with a special character or number");
        return false;
    }

    Correct(output, "User ID is accepted");
    return true;
}

function emptyString(word){
    if (word.length == 0){
        return true;
    }
    return false;
}

// check if the length of the word is inbetween min and max, both are included
function checkLength(word, min, max){
    return word.length >= min && word.length <= max;
}

// checks if the length of the word is larger or equal to min
function checkLength(word, min){
    return word.length >= min;
}

// check if the word starts with a capital letter
function startsWithCapital(word){
    let letter = word.charAt(0);
    return isCapital(letter);
}

// checks if the input is capital letters
function isCapital(letter){
    if (!isNaN(letter*69)){
        return false;
    }
    if (letter == letter.toLowerCase()){
        return false;
    }
    if (letter == letter.toUpperCase()){
        return true;
    }
    return false;
}

// checks if the input is a lowercase letter
function isLowerCase(letter){
    if (!isNaN(letter*69)){
        return false;
    }
    if (letter == letter.toUpperCase()){
        return false;
    }
    if (letter == letter.toLowerCase()){
        return true;
    }
    return false;
}

// return true if the word or char contains one of the special characters
function containsSpecialChar(word){
    for (i = 0; i < word.length; i++){
        if (isSpecialChar(word.charAt(i))){
            return true;
        }
    }
    return false;
}

function isSpecialChar(letter){
    return specialChars.includes(letter);
}

// return true if word or char contains uppercase letter
function containsUppercase(word){
    for (i = 0; i < word.length; i++){
        if (isCapital(word.charAt(i))){
            return true;
        }
    }
    return false;
}

// return true if word or char contains lowercase letter
function containsLowercase(word){
    for (i = 0; i < word.length; i++){
        if (isLowerCase(word.charAt(i))){
            return true;
        }
    }
    return false;
}

// return true if word or char contains a number
function containsNumber(word){
    for (i = 0; i < word.length; i++){
        if (isNumber(word.charAt(i))){
            return true;
        }
    }
    return false;
}

function isNumber(letter){
    return !isNaN(letter*69);
}

// return true if the word ends with a number or a special character
function endsWithNumberOrSpecial(word){
    let letter = word.charAt(word.length-1);

    if(containsSpecialChar(letter)){
        return true;
    }

    if (!isNaN(letter * 69)){
        return true;
    }

    return false;
}

function validatePWD() {
    const min = 12;
    const recommended = 14;

    input_PWD_Value = document.getElementById("password_user").value;
    input_PWD2_Value = document.getElementById("password_user2").value;

    output = document.getElementById("password_user-output");
    
// checks if the input is empty, this is technically not needed. Because we can just use REQUIRED
    if (emptyString(input_PWD_Value)){
        console.log("Password is empty");
        Incorrect(output, "Password is empty");
        return false;
    }

// although this is already checked through the form, with minlength="12"
    if (!checkLength(input_PWD_Value, min)){
        console.log("Length is incorrect: " + input_PWD_Value.length);
        Incorrect(output, "Too short, min: " + min);
        return false;
    }

// checks if there are lowercase letters
    if (!containsLowercase(input_PWD_Value)){
        console.log("Doesn't contain lowercase letters");
        Incorrect(output, "Doesn't contain a lowercase letter");
        return false;
    }

// checks if there are uppercase letters
    if (!containsUppercase(input_PWD_Value)){
        console.log("Doesn't contain uppercase letters");
        Incorrect(output, "Doesn't contain uppercase letter");
        return false;
    }

// checks if there are numbers
    if (!containsNumber(input_PWD_Value)){
        console.log("Doesn't contain numbers");
        Incorrect(output, "Doesn't contain a number");
        return false;
    }

// checks if there are special characters
    if (!containsSpecialChar(input_PWD_Value)){
        console.log("Doesn't contain special characters");
        Incorrect(output, "Doesn't contain a special character");
        return false;
    }

// checks if the password is a known word. this a bit weird because numbers are not in the dictionary
    if (dictionary.includes(input_PWD_Value.toLowerCase())){
        console.log("This password is just a normal word");
        Incorrect(output, "Password has a word in it");
        return false;
    }

// checks if both passwords are the same
if (input_PWD_Value !== input_PWD2_Value){
    console.log("Passwords are not the same");
    console.log("PWD1: " + input_PWD_Value);
    console.log("PWD2: " + input_PWD2_Value);
    Incorrect(output, "Passwords are not the same");
    return false;
}

// checks if the input under the recommended length
    if (!checkLength(input_PWD_Value, recommended)){
        console.log("Password is a bit short, recommended length: " + recommended);
        semiCorrect(output, "Password is a bit short, recommended length: " + recommended);
    }else{
        Correct(output, "Password Accepted");
    }

    return true;
}

function validateName(){
    first_name = document.getElementById("fname").value;
    last_name = document.getElementById("lname").value;
    output_first = document.getElementById("fname-output");
    output_last = document.getElementById("lname-output");

// check if the input is not empty. Redunded because the form has REQUIRED
    if (emptyString(first_name)){
        console.log("empty first name");
        Incorrect(output_first, "Empty first name");
        return false;
    }

// this system is not bulletproof. If you enter a character that is not in the list, the input will get accepted.
    if (containsNumber(first_name)){
        console.log("first name contains number");
        Incorrect(output_first, "First name contains a number");
        return false;
    }

    if (containsSpecialChar(first_name)){
        console.log("first name contains special character");
        Incorrect(output_first, "First name contains a special character");
        return false;
    }
    Correct(output_first, "First name accepted");
    
    if (emptyString(last_name)){
        console.log("empty last name");
        Incorrect(output_last, "Empty last name");
        return false;
    }

    if (containsNumber(last_name)){
        console.log("last name contains number");
        Incorrect(output_last, "Last name contains a number");
        return false;
    }

    if (containsSpecialChar(last_name)){
        console.log("last name contains special character");
        Incorrect(output_last, "Last name contains a special character");
        return false;
    }

    Correct(output_last, "Last name accepted");
    return true;
}

function validateZipCode(){
    const zipcode = document.getElementById("zip_code");
    zipcode.value = zipcode.value.toUpperCase();
    const input = zipcode.value;
    const output = document.getElementById("zip_code-output");

    if (emptyString(input)){
        resetNode(output);
        return true;        
    }

    if (input.length != 6){
        console.log("length incorrect");
        Incorrect(output, "Length is incorrect");
        return false;
    }

    if (!checkZip(input)){
        console.log("Doesn't fit the format '1234AB'");
        Incorrect(output, "Doesn't fit the format '1234AB'");
        return false
    }

    Correct(output, "Zip code fits criteria");
    return true;
}

function checkZip(input){
    for (i = 0; i < 4; i++){
        if (!isNumber(input.charAt(i))){
            return false;
        }
    }
    for (i = 4; i < 6; i++){
        if (!isCapital(input.charAt(i))){
            return false;
        }
    }
    return true;
}

// function for checking if a country is choosen.
// this function is technically not really needed because we can just set the first option as default
function validateCountry(){
    input_country = document.getElementById("country").value;
    const output = document.getElementById("country-output");

    if (input_country == "default"){
        console.log("country not choosen");
        Incorrect(output, "No country has been choosen");
        return false;
    }

    Correct(output, "Country choosen");

    return true;
}

// this check is a bit not needed, because in the form we use CHECKED, meaning always one is already checked
function validateGender(){
    input_male = document.getElementById("male").checked;
    input_female = document.getElementById("female").checked;
    input_other = document.getElementById("other").checked;
    const output = document.getElementById("gender-output");

    const success = input_male || input_female || input_other;

    if (success) {
        Correct(output, "Correct chosen a gender");
    }else{
        Incorrect(output, "Please select a gender");
    }
    return success;
}

// function for checking if a language is choosen.
// this function is technically not really needed because we can just set the first option as default
function validateLanguage(){
    const input = document.getElementById("language").value;
    const output = document.getElementById("language-output");

    if (input == "default"){
        console.log("language not chosen");
        Incorrect(output, "No language has been chosen");
        return false;
    }

    Correct(output, "Language Chosen");

    return true;
}

function validateEMail(){
    const input = document.getElementById("email_user").value;
    output = document.getElementById("email_user-output");
    
    if (emptyString(input)){
        console.log("Email empty");
        Incorrect(output, "E-mail field is empty");
        return false;
    }


    const parts = input.split("@");
    if (parts.length < 2){
        console.log("Email doesn't contain @");
        Incorrect(output, "E-mail field doesn't contain @");
        return false;
    }

    if (parts.length > 2){
        console.log("E-mail field contains too many @");
        Incorrect(output, "E-mail field contains too many @");
        return false;
    }

    const subParts = parts[1].split(".");
    if (subParts.length < 2){
        console.log("E-mail doesn't contain '.' after @");
        Incorrect(output, "E-mail doesn't contain '.' after @");
        return false;
    }

    const lengthPart = subParts[subParts.length-1].length;
    if (lengthPart < 2 || lengthPart > 4){
        console.log("E-mail doesn't contain the right amount of characters after the '.'");
        Incorrect(output, "E-mail doesn't contain the right amount of characters after the '.'");
        return false;
    }

    Correct(output, "E-mail fits criteria");
    return true;
}

// changes the output field to the correct style
function Correct(node, text){
    node.innerHTML = text;
    node.className = "input-correct";
}

// changes the output field to the incorrect style
function Incorrect(node, text){
    node.innerHTML = text;
    node.className = "input-wrong";
}

function semiCorrect(node, text){
    node.innerHTML = text;
    node.className = "input-semiCorrect";
}

function resetNode(node){
    node.innerHTML = "";
    node.className = "";
}

function resetAllOutput(){
    const allOutputs = document.querySelectorAll(".input-wrong, .input-correct, .input-semiCorrect");
    allOutputs.forEach(element => {
        resetNode(element);
    });
    console.log("Reset all output fields");
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

function alertInfo(){
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
    text += "Bio: " + bio;
    alert(text);
    return false;
}