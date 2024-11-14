
//Cart Open Close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//Making Add cart
//Cart Working JS
if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ready); 
}else {
    ready();
}

//Making function
function ready(){
    //Remove Item from cart
    var removeCartButton = document.getElementsByClassName('cart-remove');
    for(var i = 0; i < removeCartButton.length;i++){
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quantity Change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //Add to c
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addToCartClicked);
    } 
}

//Remove Cart Item
function removeCartItem(event){ 
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();

}

//Quantity Changed
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

//Add Cart Function
function addToCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title').innerText;
    var price = shopProducts.getElementsByClassName('price').innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateCartTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i=0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title){
            alert('Item already in the cart!');
            return;
        }
    }

    var cartBoxContent = `
         <img class="cart-img" src="${productImg}" alt="" srcset="">
                        <div class="detail-box">
                             <div class="cart-product-title">${title}</div>
                             <div class="cart-price">${price}</div>
                             <input type="number"
                                    name=""
                                    id=""
                                    value="1"
                                    class="cart-quantity" 
                                />
                            </div>
                            < Remove product 
                            <i class='bx bxs-trash cart-remove'></i> 
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change',quantityChanged)
}




//updateCartTotal
function updateCartTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace('$',""));
        var quantity = quantityElement.value;
        total += price * quantity;

    }
    //If price contains some cents
    total = Math.round(total * 100) / 100;
    //Displaying total price in cart
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;

}
