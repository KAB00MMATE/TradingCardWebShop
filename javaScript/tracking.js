// Global events
let timeStart = Date.now();
let totalMouseClicks = 0;

document.addEventListener("click", () => {
    console.log("click!");
    totalMouseClicks++;
});


// Text email and password fields should have their own records
let charactersPerElement = {};
let keyPressesPerInput = {};
document.querySelectorAll("form input:is([type='text'], [type='email'], [type='password'])").forEach(
    (element) => {
        keyPressesPerInput[element.id] = 0;
        charactersPerElement[element.id] = element.innerHTML.length;

        element.addEventListener("change", () => {charactersPerElement[element.id] = element.value.length;});
        element.addEventListener("keydown", () => {keyPressesPerInput[element.id]++;});
    }
);

// Hookup submit button to the functionality
let statsElement = document.querySelector("#tracking-stats");
document.querySelector("#btn-block :nth-child(3)").addEventListener('click', () => {
    updateInfo();
    statsElement.style.display  = "block";
});

let clicksElement = document.querySelector("#tracking-stats-clicks");
let timeElement = document.querySelector("#tracking-stats-time");
let keyElement = document.querySelector("#tracking-stats-key");
let charsElement = document.querySelector("#tracking-stats-chars-typed");

function updateInfo(){
    clicksElement.innerHTML = totalMouseClicks;
    timeElement.innerHTML = calculateTimeSpent();
    keyElement.innerHTML = dictToString(keyPressesPerInput);
    charsElement.innerHTML = dictToString(charactersPerElement);
}




// Helper functions

/** * 
 * @param {object} dictionary 
 * @returns A multiline string with format <key>: <value> per entry. Each entry is on a new line.
 */

function dictToString(dictionary){
    let resultString = "";
    for (const [key, value] of Object.entries(dictionary)) {
        resultString += `${key}: ${value}\n`;
    }

    return resultString;
}

/**
 * @returns The time spent on this page since the page has been loaded untill this function is called
 */

function calculateTimeSpent() {
    let timeEnd = Date.now();
    let delta = timeEnd - timeStart;
    return formatTime(delta);
}


/**
 * @param {int} milliseconds The amount of milliseconds to convert
 * @returns Returns the human friendly time format hh:mm:ss from a time specified in millisecond
 */
function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    let minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    let seconds = Math.floor(milliseconds / 1000);

    return `${numberToStringWithDigits(hours, 2)}:${numberToStringWithDigits(minutes, 2)}:${numberToStringWithDigits(seconds, 2)}`;
}

function numberToStringWithDigits(number, digits) {
    return number.toLocaleString('en-US', { minimumIntegerDigits: digits, useGrouping: false });
}
