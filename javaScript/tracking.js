// Global events
let timeStart = Date.now();
let totalMouseClicks = 0;

document.addEventListener("click", () => {
    console.log("click!");
    totalMouseClicks++;
});
document.addEventListener("keydown", () => {
    console.log("key!");
    totalKeyPresses++;
});


// Text email and password fields should have their own records
let mouseClicksPerInput = {};
let keyPressesPerInput = {};
document.querySelectorAll("form input:is([type='text'], [type='email'], [type='password'])").forEach(
    (element) => {
        mouseClicksPerInput[element.id] = 0;
        keyPressesPerInput[element.id] = 0;

        element.addEventListener("click", () => {mouseClicksPerInput[element.id]++;});
        element.addEventListener("keydown", () => {keyPressesPerInput[element.id]++;});
    }
);

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
