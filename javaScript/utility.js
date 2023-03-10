
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
        
        collapseElement(nav);
    } else {
        iconHamburger.style.transform = "rotate(180deg)";
        expandElement(nav, 60);
    }

    // The header is 84px height
    // nav is switching from 0 to 60 px
    // footer is 30px normally but this can change if the windows get very small



    
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

// fixes a bug that if the footer got bigger in heigth you would get a scrollbar when it was not needed.
// works on resizing the window and zooming in and out :)
window.addEventListener("resize", function(){
    let total = document.getElementById("main-footer").offsetHeight + document.getElementById("header-and-nav").offsetHeight;
    document.getElementById("main-body").style.minHeight = "calc(100vh - " + total + "px)";
})

document.getElementById("drop-down-container").addEventListener("mouseleave", 

function() {
    collapseElement(document.getElementById("account--sub-menu"));
    setTimeout(function() {document.getElementById("nav").style.overflow = 'hidden';}, 300);
    
});

function addOne(id){
    return ++document.getElementById(id).value;
}

function removeOne(id){
    let current = document.getElementById(id)
    if (current.value > current.min) {
        return --current.value;
    }   
    return current.value; 
}