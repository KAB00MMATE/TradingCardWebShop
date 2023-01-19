// Global events
const timeStart = Date.now();
let totalMouseClicks = 0;

document.addEventListener("click", () => {
    totalMouseClicks++;
});


// Define elements on the page that are used in functions.
const statsElement = document.querySelector("#tracking-stats");
const clicksElement = document.querySelector("#tracking-stats-clicks");
const timeElement = document.querySelector("#tracking-stats-time");
const keyElement = document.querySelector("#tracking-stats-key");
const charsElement = document.querySelector("#tracking-stats-chars-typed");



// Text email and password fields should have their own records of the keypresses and the amount of characters they contain.
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
document.querySelector("#btn-block :nth-child(3)").addEventListener('click', () => {
    updateInfo();
    statsElement.style.display  = "block"; // Display the by-default-hidden div
});





// Helper functions

/**
 * Sets the innerHTML of the targeted elements on the page to what they should be at the time of the function call
 */
function updateInfo(){
    clicksElement.innerHTML = totalMouseClicks;
    timeElement.innerHTML = calculateTimeSpent();
    keyElement.innerHTML = dictToString(keyPressesPerInput);
    charsElement.innerHTML = dictToString(charactersPerElement);
}

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

/**
 * 
 * @param {int} number 
 * @param {int} digits 
 * @returns The number as a string, having <digits> amount of digits. Example: number = 2, digits = 3 results in '002'
 */
function numberToStringWithDigits(number, digits) {
    return number.toLocaleString('en-US', { minimumIntegerDigits: digits, useGrouping: false });
}
