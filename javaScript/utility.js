
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
    let mainBody = document.getElementById("main-body");
    let iconHamburger = document.getElementById("icon--menu");

    if (nav.style.maxHeight == "60px") {
        iconHamburger.style.transform = "rotate(0)";
        mainBody.style.transition = "min-height 300ms 0s ease-in-out";
        collapseElement(nav);
        mainBody.style.minHeight = "calc(100vh - 114px)";
        mainBody.style.transition = "none";

    } else {
        iconHamburger.style.transform = "rotate(180deg)";
        mainBody.style.transition = "min-height 300ms 0s ease-in-out";
        expandElement(nav, 60);
        mainBody.style.minHeight = "calc(100vh - 174px)";
        mainBody.style.transition = "none";
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

document.getElementById("icon--menu").addEventListener("click", dropdownNav);
document.getElementById("nav--account").addEventListener("mouseenter", function () {
    expandElement(document.getElementById("account--sub-menu"), 300);
    document.getElementById("nav").style.overflow = 'visible';
});


document.getElementById("drop-down-container").addEventListener("mouseleave", 

function() {
    collapseElement(document.getElementById("account--sub-menu"));
    setTimeout(function() {document.getElementById("nav").style.overflow = 'hidden';}, 300);
    
});