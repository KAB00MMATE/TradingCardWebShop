function dropdownNav() {
    
    if (document.getElementById("nav").style.display == "none"){
        document.getElementById("dropdownlogo").style.transform = 'rotate(180deg)';
        
        document.getElementById("nav").style.display = "block";
    }else{
        document.getElementById("dropdownlogo").style.transform = 'rotate(0)';
        document.getElementById("nav").style.display = "none";
    }
    
    
}