


//Button Menu
let navmenuButton = document.querySelector('.nav-menuButton');
let navNavigationBar = document.querySelector('.nav-NavigationBar');
navmenuButton.onclick = function() {
    navNavigationBar.classList.toggle('nav-menuOpen');
}
/*Store theme */
function setActiveTheme(themeSelector, themeClass){
    document.body.className = '';
    document.body.classList.toggle(themeClass);
    document.querySelector('.home-LandingPageIceCream').src = "images/home/home-" + themeClass.charAt(0).toUpperCase() + themeClass.slice(1) + "IC.png";
    landingPageResetButtons();
    document.querySelector(themeSelector).classList.add("home-buttonActive");
    localStorage.setItem('activeButton', themeSelector);
    localStorage.setItem('activeTheme', themeClass);
}
/*Store the data when reloading */
//Add to cart
let cartIcon = document.querySelector('#nav-CartIcon');
let cart = document.querySelector('.nav-Cart');
let closeCart = document.querySelector('#nav-CartClose');

cartIcon.onclick = function(){
    cart.classList.add('nav-CartActive');
};

closeCart.onclick = function(){
    cart.classList.remove('nav-CartActive');
};

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready(){
    //Remove Items from cart
    var removeCartButton = document.getElementsByClassName('nav-CartRemove');
    for (var i = 0; i < removeCartButton.length; i++){
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem);
    }
    //Quanity Changes
    var quanityInputs = document.getElementsByClassName('nav-CartQuanity');
    for (var i = 0; i < quanityInputs.length; i++){
        var input = quanityInputs[i];
        input.addEventListener("change", quanityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName('home-IceCreamBoxButtonJS');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
}
function removeCartItem (event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quanityChanged(event){
    var input = event.target;
    if(isNaN(input.value)||input.value<=0){
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProduct = button.closest('.home-IceCreamBoxJS'); // Find the common parent
    var title = shopProduct.querySelector('.home-IceCreamBoxTitleJS').innerText;
    var price = shopProduct.querySelector('.home-IceCreamBoxPriceJS').innerText;
    var image = shopProduct.querySelector('.home-IceCreamBoxImageJS').src;
    addProductToCart(title, price, image , 1);
    updatetotal();
}

function addProductToCart(title, price, image, quanity){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('nav-CartBox');
    var cartItems = document.getElementsByClassName('nav-CartContent')[0];
    var cartItemsName = cartItems.getElementsByClassName('nav-CartProductTitle');
    for (var i = 0; i < cartItemsName.length; i++){
        if(cartItemsName[i].innerText === title){
            alert("Item already added");
            return;
        }
    }
    var cartBoxContent = `
<img class="nav-CartIMG" src="${image}" alt="${title}">
                <div class="nav-CartDetailBox">
                    <div class="nav-CartProductTitle">${title}</div>
                    <div class="nav-CartProductPrice">${price}</div>
                    <label for="${image}" class="visually-hidden">Quanity</label>
                    <input type="number" value="${quanity}" class="nav-CartQuanity" id="${image}">
                </div>
                <!--Remove Cart-->
                <ion-icon name="trash-outline" class="nav-CartRemove"></ion-icon> `;
    cartShopBox.innerHTML =cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('nav-CartRemove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('nav-CartQuanity')[0].addEventListener('change', quanityChanged);
}

window.addEventListener('load', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
        cartItems.forEach(item => addProductToCart(item.title, item.price, item.image, item.quanity));
        updatetotal();
    }
});

function saveCartData() {
    const cartBoxes = document.querySelectorAll('.nav-CartBox');
    const cartItems = [];
    cartBoxes.forEach(box => {
        const title = box.querySelector('.nav-CartProductTitle').innerText;
        const price = box.querySelector('.nav-CartProductPrice').innerText;
        const image = box.querySelector('.nav-CartIMG').src;
        const quanity = box.querySelector('.nav-CartQuanity').value;
        cartItems.push({ title, price, image, quanity});
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
function updatetotal(){
    var cartContent = document.getElementsByClassName('nav-CartContent')[0];
    var cartBoxes = cartContent.getElementsByClassName('nav-CartBox');
    var total = 0;
    var allQuanity = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('nav-CartProductPrice')[0];
        var quanityElement = cartBox.getElementsByClassName('nav-CartQuanity')[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quanity = quanityElement.value;
        total = total + (price *quanity);
        var quanity = parseInt(quanity);
        allQuanity = allQuanity + quanity;
    }
        document.getElementsByClassName('nav-CartTotalPrice')[0].innerText='$'+ total;
        document.getElementsByClassName('nav-CartQuanityProduct')[0].innerText = allQuanity;
        localStorage.setItem('allQuanity',allQuanity)
        localStorage.setItem('total', total)
        saveCartData();
}
/*Store name of customer*/
var currentCustomerName = localStorage.getItem('nameOfCustomer');

window.onload = setCustomerName();
function setCustomerName(){
    
        localStorage.setItem ('currentCustomerName', currentCustomerName);
    
    let customerNameSet = localStorage.getItem('currentCustomerName');
    let spanName = document.querySelector('.nav-WelcomeName');
    spanName.innerHTML = customerNameSet + "!";
}

