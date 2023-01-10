function dropdownNav() {
    let nav = document.getElementById("nav");
    let iconHamburger = document.getElementById("icon--hamburger");

    if (nav.style.maxHeight == "0px") {
        iconHamburger.style.transform = "rotate(90deg)";
        nav.style.maxHeight = "100px";

    } else {
        iconHamburger.style.transform = "rotate(0)";
        nav.style.maxHeight = "0px";
    }
}

function dropDownDiv(toDropDown, toHeight){
    if (toDropDown.style.maxHeight == "0px"){
        let calcHeight = toHeight + "px";
        toDropDown.style.maxHeight = calcHeight;
    }
    else {
        toDropDown.style.maxHeight = "0px";
    }
}

document.getElementById("icon--hamburger").addEventListener("click", dropdownNav);
document.getElementById("nav--account-caret").addEventListener("click", function () {
    dropDownDiv(document.getElementById("account--sub-menu"), 500);});