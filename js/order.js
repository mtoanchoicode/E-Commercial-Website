//Menu Chosen
document.addEventListener("DOMContentLoaded", function() {
    const navHome = document.getElementById('nav-homeLink');
    const navRegis = document.getElementById('nav-registrationLink');
    const navOrder = document.getElementById('nav-orderLink');
    const navFeature = document.getElementById('nav-featureLink');
    navRegis.onmousemove = function(){
        navRegis.classList.add('nav-NavActive');
        navOrder.classList.remove('nav-NavActive');
    }
    navRegis.onmouseout = function(){
        navRegis.classList.remove('nav-NavActive');
        navOrder.classList.add('nav-NavActive');
    }
    navHome.onmousemove = function(){
        navHome.classList.add('nav-NavActive');
        navOrder.classList.remove('nav-NavActive');
    }
    navHome.onmouseout = function(){
        navHome.classList.remove('nav-NavActive');
        navOrder.classList.add('nav-NavActive');
    }
    navFeature.onmousemove = function(){
        navFeature.classList.add('nav-NavActive');
        navOrder.classList.remove('nav-NavActive');
    }
    navFeature.onmouseout = function(){
        navFeature.classList.remove('nav-NavActive');
        navOrder.classList.add('nav-NavActive');
    }
});
//Change theme color
var activeTheme = localStorage.getItem('activeTheme');
if(activeTheme){
    document.body.classList.toggle(activeTheme);
}
//Change border color when focus
const inputFields = document.querySelectorAll('.order-formContainer input, .order-formContainer select');
const radioinputDPFields = document.querySelectorAll('.order-DeliveryOrPickUpBox input');
let deliveryOption = document.getElementById('order-delivery');
let pickUpOption = document.getElementById('order-pickUp');

radioinputDPFields.forEach(input=>{
    input.addEventListener('change', () => {
        const currentParent = input.closest('.order-DeliveryOrPickUpBox');

        document.querySelectorAll('.order-DeliveryOrPickUpBox').forEach(parent => {
            if (parent !== currentParent) {
                parent.classList.remove('colorChange');
            }
        });

        if (currentParent) {
            currentParent.classList.add('colorChange');
        }
    });
})
const radioinputMFields = document.querySelectorAll('.order-OnlineOrCODBox input');

radioinputMFields.forEach(input=>{
    input.addEventListener('change', () => {
        const currentParent = input.closest('.order-OnlineOrCODBox');

        document.querySelectorAll('.order-OnlineOrCODBox').forEach(parent => {
            if (parent !== currentParent) {
                parent.classList.remove('colorChange');
            }
        });

        if (currentParent) {
            currentParent.classList.add('colorChange');
        }
    });
})

inputFields.forEach(input => {
    input.addEventListener('focus', () => {
        const parent = input.closest('.order-OnlineOrCODBox, .order-TextField, .order-SelectField');
        if (parent) {
            parent.style.borderColor = 'var(--main-color-pink)';
        }
    });
});

inputFields.forEach(input => {
    input.addEventListener('blur', () => {
        const parent = input.closest('.order-DeliveryOrPickUpBox, .order-OnlineOrCODBox, .order-TextField, .order-SelectField');
        if (parent) {
            parent.style.borderColor = '';
        }
    });
});
//Show unshow Pickup Delivery
let allValueOfDelivery = document.getElementsByClassName("order-AllDeliveryInput");
let deliveryButton = document.getElementById("order-delivery");
let pickUpButton = document.getElementById("order-pickUp");
let deliveryForm = document.querySelector(".order-DeliveryAddressDiv");
let pickUpForm = document.querySelector(".order-PickUpAddressDiv");
let valueOfPickUpPlace = document.getElementById("order-PickupAddress");

deliveryButton.onclick = function(){
        deliveryForm.classList.add('order-DePiShow');
        pickUpForm.classList.remove('order-DePiShow');
        valueOfPickUpPlace.value = "None";
        shippingPrice.innerText = "$2";
        updatePrice();
};

pickUpButton.onclick = function(){
        deliveryForm.classList.remove('order-DePiShow');
        pickUpForm.classList.add('order-DePiShow');
        for (let i=0; i< allValueOfDelivery.length; i++){
            allValueOfDelivery[i].value = "";
        }
        shippingPrice.innerText = "$0";
        updatePrice();
};
//show unshow online payment
let CODButton = document.getElementById('order-CODForm');
let OPButton = document.getElementById('order-OnlineForm');
let OPForm = document.querySelector(".order-OnlinePaymentDiv");
let allOnlinePaymentInput = document.getElementsByClassName("order-AllOnlinePaymentInput");
let paymentCardRadios = document.querySelectorAll('input[name="PaymentCard"]');


OPButton.onclick = function(){
    if(OPButton.checked){
        OPForm.classList.add('order-DePiShow');
    }
    if(CODButton.checked){
        OPForm.classList.remove('order-DePiShow');
        for (let j=0; j< allOnlinePaymentInput.length; j++){
            allOnlinePaymentInput[j].value = "";
        }
    }

};
CODButton.onclick = function(){
    if(OPButton.checked){
        OPForm.classList.add('order-DePiShow');
    }
    if(CODButton.checked){
        OPForm.classList.remove('order-DePiShow');
        for (let j=0; j< allOnlinePaymentInput.length; j++){
            allOnlinePaymentInput[j].value = "";
        }
        paymentCardRadios.forEach(radio => {
            radio.checked = false;
        });
    }
};
//Same delivery address
function sameAddress(){
    var deliveryAddress = document.getElementById('order-DeliveryAddress');
    var deliveryDistrict = document.getElementById('order-DeliveryDistrict');
    var deliveryCity = document.getElementById('order-DeliveryCity');
    var deliveryPostcode = document.getElementById('order-DeliveryPostcode');

    var BillingAddress = document.getElementById('order-BillingAddress');
    var BillingDistrict = document.getElementById('order-DeliveryBillingDistrict');
    var BillingCity = document.getElementById('order-DeliveryBillingCity');
    var BillingPostcode = document.getElementById('order-DeliveryBillingPostcode');

    var errMsgParagraph;
    var placeToShowError = document.querySelector('.ordder-ShowingErrorDiv');
    clearErrorMSG2();
    if(deliveryAddress.value.trim() === "" || deliveryDistrict.value.trim() ===""
    ||deliveryCity.value.trim() === "" || deliveryPostcode.value.trim() === ""){
        errMsgParagraph= document.createElement('p');
        errMsgParagraph.classList.add('regis-errorMessage2');
        errMsgParagraph.innerHTML = "Please enter the delivery address first";
        placeToShowError.append(errMsgParagraph);
    }
    else{
        BillingAddress.value = deliveryAddress.value;
        BillingDistrict.value = deliveryDistrict.value;
        BillingCity.value = deliveryCity.value;
        BillingPostcode.value = deliveryPostcode.value;
    }
}
function clearAddress(){


    var BillingAddress = document.getElementById('order-BillingAddress');
    var BillingDistrict = document.getElementById('order-DeliveryBillingDistrict');
    var BillingCity = document.getElementById('order-DeliveryBillingCity');
    var BillingPostcode = document.getElementById('order-DeliveryBillingPostcode');

    BillingAddress.value = "";
    BillingDistrict.value = "";
    BillingCity.value = "";
    BillingPostcode.value = "";
}

let sameAddressBtn = document.getElementById('order-BillingAddressFeature');
sameAddressBtn.addEventListener('change', function() {
    if (this.checked) {

        sameAddress();
    }
    if (!this.checked) {
        clearAddress();
        clearErrorMSG2();
    }
})
//Validate Information
function clearErrorMSG(){
    var existingErrorMsg = document.querySelectorAll('.regis-errorMessage');
    if (existingErrorMsg.length>0) {
        for (i=0; i< existingErrorMsg.length; i++){
            existingErrorMsg[i].remove();
        }
    }
}
function clearErrorMSG2(){
    var existingErrorMsg = document.querySelectorAll('.regis-errorMessage2');
    if (existingErrorMsg.length>0) {
        for (i=0; i< existingErrorMsg.length; i++){
            existingErrorMsg[i].remove();
        }
    }
}
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
function validateNumber(NumberString){
    const pattern = /^[0-9]+$/;
    return pattern.test(NumberString);
}
document.addEventListener("DOMContentLoaded", function() {
    const orderForm = document.querySelector('.order-formContainer');
    var errMsgParagraph=[];
    var validateInputField = document.getElementsByClassName('order-TextField');
    var validateInputSelectField = document.getElementsByClassName('order-SelectField');
    var CheckNumber = 0;

    orderForm.addEventListener('submit', function(event) {
        clearErrorMSG();
        let fieldEmptyCheck = false;
        if(deliveryButton.checked){
            const inputsDeliveryToCheck = document.querySelectorAll('.order-AllDeliveryInput');
            const inputPostcodeToCheck = document.querySelectorAll('.order-DeliveryPostcodeCheck');
            for (i=0; i< inputsDeliveryToCheck.length; i++){
                if (inputsDeliveryToCheck[i].value.trim() === '') {
                    fieldEmptyCheck = true;
                    errMsgParagraph[i]= document.createElement('p');
                    errMsgParagraph[i].classList.add('regis-errorMessage');
                    errMsgParagraph[i].innerHTML = "Missing information";
                    validateInputField[i].append(errMsgParagraph[i]);
                }
            }
            for (i=0; i< inputPostcodeToCheck.length; i++){
                if (inputPostcodeToCheck[i].value !== ''){
                    if (!validateNumber(inputPostcodeToCheck[i].value)){
                        fieldEmptyCheck = true;
                        errMsgParagraph[3+i*4]= document.createElement('p');
                        errMsgParagraph[3+i*4].classList.add('regis-errorMessage');
                        errMsgParagraph[3+i*4].innerHTML = "Invalid Postcode";
                        validateInputField[3+i*4].append(errMsgParagraph[3+i*4]);
                    }
                    else{
                        if(inputPostcodeToCheck[i].value.length !== 4){
                            fieldEmptyCheck = true;
                            errMsgParagraph[3+i*4]= document.createElement('p');
                            errMsgParagraph[3+i*4].classList.add('regis-errorMessage');
                            errMsgParagraph[3+i*4].innerHTML = "Postcode must have 4 digit";
                            validateInputField[3+i*4].append(errMsgParagraph[3+i*4]);
                        }
                    }
                }
            }
        }
        if (pickUpButton.checked){
            const inputPickUpPlaceToCheck = document.getElementById("order-PickupAddress");
            if (inputPickUpPlaceToCheck.value === "None"){
                fieldEmptyCheck = true;
                errMsgParagraph[8]= document.createElement('p');
                errMsgParagraph[8].classList.add('regis-errorMessage');
                errMsgParagraph[8].innerHTML = "Please choose a pick up location";
                validateInputSelectField[0].append(errMsgParagraph[8]);
            }
        }
        const inputContactInfoToCheck = document.querySelectorAll(".order-AllContactInfoToCheck");
        for (i=0; i< inputContactInfoToCheck.length; i++){
            if (inputContactInfoToCheck[i].value.trim() === '') {
                fieldEmptyCheck = true;
                errMsgParagraph[9+i]= document.createElement('p');
                errMsgParagraph[9+i].classList.add('regis-errorMessage');
                errMsgParagraph[9+i].innerHTML = "Missing information";
                validateInputField[8+i].append(errMsgParagraph[9+i]);
            }
        }
        const inputEmailToCheck = document.getElementById("order-Mail");
        if(inputEmailToCheck.value !== ""){
            if(!validateEmail(inputEmailToCheck.value)){
                fieldEmptyCheck = true;
                errMsgParagraph[11]= document.createElement('p');
                errMsgParagraph[11].classList.add('regis-errorMessage');
                errMsgParagraph[11].innerHTML = "Invalid Email";
                validateInputField[10].append(errMsgParagraph[11]);
            }
        }
        const inputPhoneNumToCheck = document.getElementById("order-Phone");
        if(inputPhoneNumToCheck.value !== ""){
            if(!validateNumber(inputPhoneNumToCheck.value)){
                fieldEmptyCheck = true;
                errMsgParagraph[12]= document.createElement('p');
                errMsgParagraph[12].classList.add('regis-errorMessage');
                errMsgParagraph[12].innerHTML = "Invalid Phone Number";
                validateInputField[11].append(errMsgParagraph[12]);
            }
        }
        const inputOlinePaymentToCheck = document.querySelectorAll(".order-AllOnlinePaymentInput");
        if(OPButton.checked){
            
            for (i=0; i< inputOlinePaymentToCheck.length; i++){
                if (inputOlinePaymentToCheck[i].value.trim() === '') {
                    fieldEmptyCheck = true;
                    errMsgParagraph[13+i]= document.createElement('p');
                    errMsgParagraph[13+i].classList.add('regis-errorMessage');
                    errMsgParagraph[13+i].innerHTML = "Missing information";
                    validateInputField[12+i].append(errMsgParagraph[13+i]);
                }
            }
            for (k=1; k< inputOlinePaymentToCheck.length; k++){
                if (inputOlinePaymentToCheck[k].value.trim() !== ''){
                    if (!validateNumber(inputOlinePaymentToCheck[k].value.trim())) {
                        fieldEmptyCheck = true;
                        errMsgParagraph[13+k]= document.createElement('p');
                        errMsgParagraph[13+k].classList.add('regis-errorMessage');
                        errMsgParagraph[13+k].innerHTML = "Invalid Information";
                        validateInputField[12+k].append(errMsgParagraph[13+k]);
                    }
                }
            }
            if (inputOlinePaymentToCheck[3].value.trim() !== ''){
                if (validateNumber(inputOlinePaymentToCheck[3].value.trim())) {
                    if (inputOlinePaymentToCheck[3].value.length != 2 || inputOlinePaymentToCheck[3].value > 12) {
                        fieldEmptyCheck = true;
                        errMsgParagraph[13+3]= document.createElement('p');
                        errMsgParagraph[13+3].classList.add('regis-errorMessage');
                        errMsgParagraph[13+3].innerHTML = "Invalid Month";
                        validateInputField[12+3].append(errMsgParagraph[13+3]);
                    }
                }
            }
            if (inputOlinePaymentToCheck[4].value.trim() !== ''){
                if (validateNumber(inputOlinePaymentToCheck[4].value.trim())) {
                    if (inputOlinePaymentToCheck[4].value.length != 4) {
                        fieldEmptyCheck = true;
                        errMsgParagraph[13+4]= document.createElement('p');
                        errMsgParagraph[13+4].classList.add('regis-errorMessage');
                        errMsgParagraph[13+4].innerHTML = "Invalid Year";
                        validateInputField[12+4].append(errMsgParagraph[13+4]);
                    }
                }
            }
            for (j = 0; j < paymentCardRadios.length; j++){
                if (paymentCardRadios[j].checked){
                    if(paymentCardRadios[j].value === "Visa" || paymentCardRadios[j].value === "Master Card"){
                        if (inputOlinePaymentToCheck[1].value !== ""){
                            if (validateNumber(inputOlinePaymentToCheck[1].value.trim())){
                                if(inputOlinePaymentToCheck[1].value.length != 16){
                                    fieldEmptyCheck = true;
                                    errMsgParagraph[14]= document.createElement('p');
                                    errMsgParagraph[14].classList.add('regis-errorMessage');
                                    errMsgParagraph[14].innerHTML = "Invalid Card Number";
                                    validateInputField[13].append(errMsgParagraph[14]);
                                }
                            }
                        }
                    }
                    if(paymentCardRadios[j].value === "American Express"){
                        if (inputOlinePaymentToCheck[1].value !== ""){
                            if (validateNumber(inputOlinePaymentToCheck[1].value.trim())){
                                if(inputOlinePaymentToCheck[1].value.length != 15){
                                    fieldEmptyCheck = true;
                                    errMsgParagraph[14]= document.createElement('p');
                                    errMsgParagraph[14].classList.add('regis-errorMessage');
                                    errMsgParagraph[14].innerHTML = "Invalid Card Number";
                                    validateInputField[13].append(errMsgParagraph[14]);
                                }
                            }

                        }
                    }
                }
                else{
                    CheckNumber += 1;
                }
            }
            if (CheckNumber === 3) {
                var validateInputCardChoose = document.querySelector('.order-ErrorInChoosingCard');
                fieldEmptyCheck = true;
                errMsgParagraph[15]= document.createElement('p');
                errMsgParagraph[15].classList.add('regis-errorMessage');
                errMsgParagraph[15].innerHTML = "Please choose a type of credit card";
                validateInputCardChoose.append(errMsgParagraph[15]);
            }
        }
        if(fieldEmptyCheck) {
            event.preventDefault(); // Prevent form submission
        }
        else{
            orderButtonClicked();
        }
    });
});
function orderButtonClicked(){
    var cartContent = document.getElementsByClassName("nav-CartContent")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    updatePrice();
    warningOrder();
}
//Move and calculate total
function updatePrice(){
    var orderPrice = document.getElementsByClassName('order-priceNumber')[0];
    var orderQuanity = document.getElementsByClassName('order-quanityNumber')[0];
    var orderTotal = document.getElementsByClassName('order-totalNumber')[0];
    var cartPrice = localStorage.getItem('total');
    var cartQuanity = localStorage.getItem('allQuanity');
    var shipping = document.getElementsByClassName('order-shippingNumber')[0].innerText;
    let costWithoutDollar = parseInt(shipping.replace(/\D/g, ''));
    var totalPrice = costWithoutDollar + parseInt(cartPrice);

    orderTotal.innerText = '$'+totalPrice;
    orderPrice.innerText = '$' + cartPrice;
    orderQuanity.innerText = cartQuanity;
}
window.onload = updatePrice();
//Get out do not buy
function warningOrder(){
    var cartPrice = localStorage.getItem('total');
    var warningWindow = document.getElementsByClassName('order-WarningDiv')[0];
    if (cartPrice == 0){
        warningWindow.style.display= "flex";
    }
    else{
        warningWindow.style.display= "none";
    }
}
window.onload = warningOrder();
//Shipping
var shippingPrice = document.getElementsByClassName('order-shippingNumber')[0];
window.addEventListener('load', () => {
    if(deliveryButton.checked){
        shippingPrice.innerText = "$2";
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    
    if (cartItems) {
        cartItems.forEach(item => addToProductToOrder(item.title, item.price, item.image, item.quanity));
    }
    updatePrice();
});

//Cart
function addToProductToOrder(title, price, image, quanity){
    var orderCartBox = document.createElement('div');
    orderCartBox.classList.add('order-Cartbox');
    var orderItems = document.getElementsByClassName('order-ShoppingCartDiv')[0];

    var orderCartBoxContent = `<img class="nav-CartIMG" src="${image}" alt="order ${title}">
    <div class="order-CartDetailBox">
        <div class="order-CartProductTitle">${title}</div>
        <p>x ${quanity}</p>
    </div>
    <div class="order-CartProductPrice">${price}</div>
    `;
    orderCartBox.innerHTML = orderCartBoxContent;
    orderItems.append(orderCartBox);
}


//Responsive order
const showShoppingCart = document.querySelector(".order-showShoppingCart");
const shoppingCartDiv = document.querySelector(".order-ShoppingCartDiv");
const showWordSpan = document.querySelector(".order-showWord");
const changeIcon = document.querySelector(".order-IconResponsive");

showShoppingCart.addEventListener("click", toggleShoppingCart)
function toggleShoppingCart(){
    if (shoppingCartDiv.style.display === "none") {
        shoppingCartDiv.style.display = "block";
        showWordSpan.textContent = "Hide";
        changeIcon.name = "chevron-up-outline";
    } else {
        shoppingCartDiv.style.display = "none";
        showWordSpan.textContent = "Show";
        changeIcon.name = "chevron-down-outline";
    }
}

if (window.innerWidth >= 1000) {
    shoppingCartDiv.style.display = "block";
}


window.addEventListener("resize", function() {
    if (window.innerWidth >= 1000) {
        shoppingCartDiv.style.display = "block";
    } else {
        shoppingCartDiv.style.display = "none";
    }
});