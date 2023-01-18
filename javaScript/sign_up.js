const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function validate(){
    console.log(validateUserID())
}

function validateUserID() {
    const min = 5;
    const max = 12;
    input_userID_Value = document.getElementById("userID").value;

// although this is already checked through the form, wiht min="5" and max="12"
    if(!checkLength(input_userID_Value, min, max)){
        return false;
    }
    
    if (!startsWithCapital(input_userID_Value)){
        return false;
    }

    if (!endsWithNumberOrSpecial(input_userID_Value)){
        return false;
    }

    return true;
}

// check if the length of the word is inbetween min and max, both are included
function checkLength(word, min, max){
    return word.length >= min && word.length <= max;
}

// check if the word starts with a capital letter
function startsWithCapital(word){
    let letter = word.charAt(0);
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