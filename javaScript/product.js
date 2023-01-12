
document.getElementById("product-amount-selector").onchange = function () {
    capInputAtMin(1);
    let amount = document.getElementById("product-amount-selector").value;
    let productPrice = document.getElementById("product--unit-price").innerText;
    let newPrice = amount * parseFloat(productPrice);
    console.log(newPrice);
    document.getElementById("product--total-price").innerText = newPrice;
}

function capInputAtMin(minValue) {
    let selector = document.getElementById("product-amount-selector");
    if (parseInt(selector.value) < minValue) {
        selector.value = minValue.toString();
    }

}

document.querySelector("#icon--add-to-cart").addEventListener("click", addToCart);

function addToCart() {
    let amount = document.getElementById("product-amount-selector").value;
    alert(`You have put ${amount} items in your shopping cart!`);
}