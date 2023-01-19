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

// NodeList (Immutable!) of elements in the DOM that should keep track of their own stats: keypresses and characters typed
const statTrackingElements = document.querySelectorAll("form input:is([type='text'], [type='email'], [type='password']");

// Text, email and password fields should have their own records of the keypresses and the amount of characters they contain.
const charactersPerElement = {};
const keyPressesPerInput = {};


const statDisplayElements = []; // Array of the stat-displaying elements that are dynamically created, so that they all can easily be accessed later on

const displayElementSuffix = "__display-stats"; // Used as suffix to the ID of the HTML element that this displaying element is referring to. 

// Add all necessary eventlisteners and dynamically create new elements for the elements that are supposed to be kept track of
statTrackingElements.forEach(
    (element) => {
        // Initialize the object record for this element
        keyPressesPerInput[element.id] = 0;
        charactersPerElement[element.id] = element.value.length;

        // Add event listeners for keypresses (note that keypressed is deprecated and that's why keydown is used) and keychanged 
        element.addEventListener("change", () => { charactersPerElement[element.id] = element.value.length; });
        element.addEventListener("keydown", () => { keyPressesPerInput[element.id]++; });


        // Create new elements that are going to display the stats for this element
        const newElement = document.createElement("p");
        newElement.classList.add("stats");
        newElement.innerText = `${element.id}`;
        newElement.id = element.id + displayElementSuffix;
        element.parentElement.appendChild(newElement);
        statDisplayElements.push(newElement);
    }
);


// Hookup submit button to the functionality
document.querySelector("#btn-block :nth-child(3)").addEventListener('click', () => {
    updateInfo();
    revealStatsElements();
});

// Helper functions


/**
 * Reveals the HTML Elements that contain the behavioral tracking stats and which 
 * have been hidden by default
 */
function revealStatsElements() {
    statDisplayElements.forEach((element) => element.style.display = "block");
    statsElement.style.display = "block";
}

/**
 * Sets the innerHTML of the targeted elements on the page to what they should be at the time of the function call
 */
function updateInfo() {

    // Set the global stats
    clicksElement.innerHTML = totalMouseClicks;
    timeElement.innerHTML = calculateTimeSpent();
    keyElement.innerHTML = sumArray(Object.values(keyPressesPerInput));
    charsElement.innerHTML = sumArray(Object.values(charactersPerElement));


    // Set the stats for each input element 
    statDisplayElements.forEach((e) => {
        const parentElementID = e.id.split(displayElementSuffix)[0];
        e.innerText = `Keys pressed: ${keyPressesPerInput[parentElementID]} | Characters typed: ${charactersPerElement[parentElementID]}`;
    });
}


/**
 * Sums the values in the array and returns the result 
 * @param {[int]} array 
 * @returns {int} The sum of the array
 */
function sumArray(array) {
    sum = 0;
    array.forEach((e) => sum += e);
    return sum;
}


/** * 
 * @param {object} dictionary 
 * @returns A multiline string with format <key>: <value> per entry. Each entry is on a new line.
 */

function dictToString(dictionary) {
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
