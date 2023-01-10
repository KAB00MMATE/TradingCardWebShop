
/* Sets the max-height of the element to 0px*/
function collapseElement(toCollapse) {
    toCollapse.style.maxHeight = "0px";
}

/* Expands the max-heigt of the element to the specified amt of pixels*/
function expandElement(toExpand, maxHeight) {
    toExpand.style.maxHeight = maxHeight + "px";
}

function dropdownNav() {
    let nav = document.getElementById("nav");
    let iconHamburger = document.getElementById("icon--hamburger");

    if (nav.style.maxHeight == "0px") {
        iconHamburger.style.transform = "rotate(90deg)";
        expandElement(nav, 100);

    } else {
        iconHamburger.style.transform = "rotate(0)";
        collapseElement(nav);
    }
}

function toggleDiv(toToggle, maxHeight) {
    if (toToggle.style.maxHeight == "0px") {
        expandElement(toToggle, maxHeight);
    }
    else {
        collapseElement(toToggle);
    }
}



document.getElementById("icon--hamburger").addEventListener("click", dropdownNav);
document.getElementById("nav--account-caret").addEventListener("mouseenter", function () {
    expandElement(document.getElementById("account--sub-menu"), 500);
});
document.getElementById("account--sub-menu").addEventListener("mouseleave", function () { collapseElement(document.getElementById("account--sub-menu")); });