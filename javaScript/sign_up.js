const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const path = "../documents/dictionary.txt";

const dictionary = loadFile(path).split("\n");

function validate(){
    console.log("user ID check: " + validateUserID());
    console.log("password check: " + validatePWD());
    console.log("name check: ", validateName());
    console.log("country check: ", validateCountry());
    console.log("gender check: ", validateGender());
    console.log("language check: ", validateLanguage());
}

function validateUserID() {
    const min = 5;
    const max = 12;
    input_userID_Value = document.getElementById("userID").value;

// checks if the input is empty, this is technically not needed. Because we can just use REQUIRED
    if (emptyString(input_userID_Value)){
        console.log("User ID is empty");
        return false;
    }

// although this is already checked through the form, with minlength="5" and maxlength="12"
    if (!checkLength(input_userID_Value, min, max)){
        console.log("Length is incorrect: " + input_userID_Value.length);
        return false;
    }
    
    if (!startsWithCapital(input_userID_Value)){
        console.log("Doesn't start with a capital letter: " + input_userID_Value.charAt(0));
        return false;
    }

    if (!endsWithNumberOrSpecial(input_userID_Value)){
        console.log("Doesn't end with a special character or number: " + input_userID_Value.charAt(input_userID_Value.length-1));
        return false;
    }

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
}

// return true if the word or char contains one of the special characters
function containsSpecialChar(word){
    return specialChars.test(word)
}

// return true if word or char contains uppercase letter
function containsUppercase(word){
    return /[A-Z]/.test(word);
}

// return true if word or char contains lowercase letter
function containsLowercase(word){
    return /[a-z]/.test(word);
}

// return true if word or char contains a number
function containsNumber(word){
    return /[0-9]/.test(word);
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

// checks if both passwords are the same
    if (input_PWD_Value !== input_PWD2_Value){
        console.log("Passwords are not the same");
        console.log("PWD1: " + input_PWD_Value);
        console.log("PWD2: " + input_PWD2_Value);
        return false;
    }

    
// checks if the input is empty, this is technically not needed. Because we can just use REQUIRED
    if (emptyString(input_PWD_Value)){
        console.log("Password is empty");
        return false;
    }

// although this is already checked through the form, with minlength="12"
    if (!checkLength(input_PWD_Value, min)){
        console.log("Length is incorrect: " + input_PWD_Value.length);
        return false;
    }else{
        // checks if the input under the recommended length
        if (!checkLength(input_PWD_Value, recommended)){
            console.log("Password is a bit short, recommended length: " + recommended);
        }
    }

// checks if there are lowercase letters
    if (!containsLowercase(input_PWD_Value)){
        console.log("Doesn't contain lowercase letters");
        return false;
    }

// checks if there are uppercase letters
    if (!containsUppercase(input_PWD_Value)){
        console.log("Doesn't contain uppercase letters");
        return false;
    }

// checks if there are numbers
    if (!containsNumber(input_PWD_Value)){
        console.log("Doesn't contain numbers");
        return false;
    }

// checks if there are special characters
    if (!containsSpecialChar(input_PWD_Value)){
        console.log("Doesn't contain special characters");
        return false;
    }

// checks if the password is a known word. this a bit weird because numbers are not in the dictionary
    if (dictionary.includes(input_PWD_Value.toLowerCase())){
        console.log("This password is just a normal word")
    }

    return true;
}

function validateName(){
    first_name = document.getElementById("fname").value;
    last_name = document.getElementById("lname").value;

// check if the input is not empty. Redunded because the form has REQUIRED
    if (emptyString(first_name)){
        console.log("empty first name");
        return false;
    }

    if (emptyString(last_name)){
        console.log("empty last name");
        return false;
    }

// this system is not bulletproof. If you enter a character that is not in the list, the input will get accepted.
    if (containsNumber(first_name)){
        console.log("first name contains number");
        return false;
    }

    if (containsNumber(last_name)){
        console.log("last name contains number");
        return false;
    }

    if (containsSpecialChar(first_name)){
        console.log("first name contains special character");
        return false;
    }

    if (containsSpecialChar(last_name)){
        console.log("last name contains special character");
        return false;
    }

    return true;
}

// function for checking if a country is choosen.
// this function is technically not really needed because we can just set the first option as default
function validateCountry(){
    input_country = document.getElementById("country").value;

    if (input_country == "default"){
        console.log("country not choosen");
        return false
    }

    return true;
}

// this check is a bit not needed, because in the form we use CHECKED, meaning always one is already checked
function validateGender(){
    input_male = document.getElementById("male").checked;
    input_female = document.getElementById("female").checked;
    input_other = document.getElementById("other").checked;
    
    return input_male || input_female || input_other;
}

// function for checking if a language is choosen.
// this function is technically not really needed because we can just set the first option as default
function validateLanguage(){
    input = document.getElementById("language").value;

    if (input == "default"){
        console.log("language not choosen");
        return false;
    }

    return true;
}

// function for loading the file content
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      result = xmlhttp.responseText;
    }
    return result;
}

