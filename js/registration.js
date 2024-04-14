//Menu Chosen
document.addEventListener("DOMContentLoaded", function() {
    const navHome = document.getElementById('nav-homeLink');
    const navRegis = document.getElementById('nav-registrationLink');
    const navOrder = document.getElementById('nav-orderLink');
    const navFeature = document.getElementById('nav-featureLink');
    navHome.onmousemove = function(){
        navHome.classList.add('nav-NavActive');
        navRegis.classList.remove('nav-NavActive');
    }
    navHome.onmouseout = function(){
        navHome.classList.remove('nav-NavActive');
        navRegis.classList.add('nav-NavActive');
    }
    navOrder.onmousemove = function(){
        navOrder.classList.add('nav-NavActive');
        navRegis.classList.remove('nav-NavActive');
    }
    navOrder.onmouseout = function(){
        navOrder.classList.remove('nav-NavActive');
        navRegis.classList.add('nav-NavActive');
    }
    navFeature.onmousemove = function(){
        navFeature.classList.add('nav-NavActive');
        navRegis.classList.remove('nav-NavActive');
    }
    navFeature.onmouseout = function(){
        navFeature.classList.remove('nav-NavActive');
        navRegis.classList.add('nav-NavActive');
    }
});
//Change theme color
var activeTheme = localStorage.getItem('activeTheme');
if(activeTheme){
    document.body.classList.toggle(activeTheme);
}
//Sign up
let signUpContent = document.querySelector(".regis-formContainer"),
    stageButton1b = document.querySelector(".regis-stageButton1b"),
    stageButton2a = document.querySelector(".regis-stageButton2a"),
    stageButton2b = document.querySelector(".regis-stageButton2b"),
    stageButton3a = document.querySelector(".regis-stageButton3a"),
    stageButton3b = document.querySelector(".regis-stageButton3b"),
    stageButton4a = document.querySelector(".regis-stageButton4a"),
    stageButton4b = document.querySelector(".regis-stageButton4b"),
    signUpContent1 = document.querySelector(".regis-stage1Content"),
    signUpContent2 = document.querySelector(".regis-stage2Content"),
    signUpContent3 = document.querySelector(".regis-stage3Content"),
    signUpContent4 = document.querySelector(".regis-stage4Content");
signUpContent2.style.display = "none";
signUpContent3.style.display = "none";
signUpContent4.style.display = "none";

let signUpCheck = false;
function clearErrorMSG(){
    var existingErrorMsg = document.querySelectorAll('.regis-errorMessage');
    if (existingErrorMsg.length>0) {
        for (i=0; i< existingErrorMsg.length; i++){
            existingErrorMsg[i].remove();
        }
    }
}
function validateDateOfBirth(dateString) {
    let dob = new Date(dateString);
    let currentDate = new Date();
    let ageInMilliseconds = currentDate - dob;
    let ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    if (ageInYears >= 10 && ageInYears <= 110) {
        return true;
    } else {
        return false;
    }
}
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
function stage1Validate(){
    clearErrorMSG();
    let errMsg = [];
    var firstname = document.getElementById("regis-fname").value;
    var lastname = document.getElementById("regis-lname").value.trim();
    var dateOfBirth = document.getElementById('regis-dob').value.trim();
    if (firstname === ""){
        errMsg[0]="First name must be filled";
    }
    if(lastname === ""){
        errMsg[1]="Last name must be filled";
    }
    if (dateOfBirth === ""){
        errMsg[2] = "Date of birth must be filled";
    }
    else if (dateOfBirth !== ""){
        if(!validateDateOfBirth(dateOfBirth)){
            errMsg[2] = "Invalid date of birth";
        }
    }
    if(errMsg !== ""){
        signUpCheck=true;
    }
    return errMsg;
}

function stage2Validate(){
    clearErrorMSG();
    let errMsg = [];
    var username = document.getElementById("regis-username").value.trim();
    var email = document.getElementById("regis-mail").value.trim();
    var password1 = document.getElementById('regis-password').value.trim();
    var password2 = document.getElementById('regis-confirmPassword').value.trim();
    if (username === ""){
        errMsg[0]="Missing username";
    }
    else if(username !== ""){
        pattern = /^[^\s]+$/
        if (!pattern.test(username)){
            errMsg[0]="Username must not contain white space";
        }
    }
    if(email === ""){
        errMsg[1]="Email must be filled";
    }
    else if(email !== ""){
        if (!validateEmail(email)){
            errMsg[1]="Invalid email";
        }
    }
    if (password1 === ""){
        errMsg[2] = "Missing password";
    }
    else if(password1 !== ""){
        if (password1.length < 9){
            errMsg[2]="Password must be at least 9 characters";
        }
    }
    if (password2 === ""){
        errMsg[3] = "Please retype your password";
    }
    else if(password2 !== ""){
        if (password1 !== password2){
            errMsg[3] = "Password do not match";
        }
    }
    if(errMsg !== ""){
        signUpCheck=true;
    }
    return errMsg;
}
function stage3Validate(){
    clearErrorMSG();
    let errMsg = "";
    var favouriteICs = document.querySelectorAll(".regis-FavouriteIC");
    var checked = false;
    favouriteICs.forEach(function(checkbox) {
        if (checkbox.checked) {
            checked = true;
        }
    });
    if (!checked) {
        errMsg += "Please choose your favourite flavour";
    }
    if(errMsg !== ""){
        signUpCheck = true;
    }
    return errMsg;
}
stageButton1b.onclick=
function stage1To2(){
    let errMsg = stage1Validate();
    var inputField = document.getElementsByClassName("regis-textField");
    
    if(errMsg.length > 0){
        var errMsgParagraph = [];
        for (i = 0; i < errMsg.length; i++){
            if(typeof errMsg[i] !== "undefined" && errMsg[i] !== ""){
                errMsgParagraph[i] = document.createElement('p');
                errMsgParagraph[i].classList.add('regis-errorMessage');
                errMsgParagraph[i].innerHTML = errMsg[i];
                inputField[i].append(errMsgParagraph[i]);
            }
        }
    }
    else {
        signUpContent1.style.display = "none";
        signUpContent2.style.display = "block";
        signUpContent3.style.display = "none";
        signUpContent4.style.display = "none";
        document.querySelector(".regis-stageNo1").innerText= "✓";
        document.querySelector(".regis-stageNo1").style.background= "var(--main-color-pink)";
        document.querySelector(".regis-stageNo1").style.color= "var(--background-color)";
    }
};

function setWelcomeName(){
    let customerName = localStorage.getItem('nameOfCustomer');
    let spanName = document.querySelector('.nav-WelcomeName');
    spanName.innerHTML = customerName;
}

stageButton2a.onclick = function stage2To1(){
    signUpContent1.style.display = "block";
    signUpContent2.style.display = "none";
    signUpContent3.style.display = "none";
    signUpContent4.style.display = "none";
    document.querySelector(".regis-stageNo1").innerText= "1";
    document.querySelector(".regis-stageNo1").style.background= "var(--sub-color-yellow-2)";
    document.querySelector(".regis-stageNo1").style.color= "var(--text-color)";
};
stageButton2b.onclick = function stage2To3(){
        let errMsg = stage2Validate();
        var inputField = document.getElementsByClassName("regis-textField2");
 
        if(errMsg.length > 0){
                var errMsgParagraph = [];
                for (i = 0; i < errMsg.length; i++){
                    if(typeof errMsg[i] !== "undefined" && errMsg[i] !== ""){
                    errMsgParagraph[i] = document.createElement('p');
                     errMsgParagraph[i].classList.add('regis-errorMessage');
                     errMsgParagraph[i].innerHTML = errMsg[i];
                     inputField[i].append(errMsgParagraph[i]);
                }
            }
        }
        else{
            signUpContent1.style.display = "none";
            signUpContent2.style.display = "none";
            signUpContent3.style.display = "block";
            signUpContent4.style.display = "none";
            document.querySelector(".regis-stageNo2").innerText= "✓";
            document.querySelector(".regis-stageNo2").style.background= "var(--main-color-pink)";
            document.querySelector(".regis-stageNo2").style.color= "var(--background-color)";
        }
};
stageButton3a.onclick = function stage3To2(){
    signUpContent1.style.display = "none";
    signUpContent2.style.display = "block";
    signUpContent3.style.display = "none";
    signUpContent4.style.display = "none";
    document.querySelector(".regis-stageNo2").innerText= "2";
    document.querySelector(".regis-stageNo2").style.background= "var(--sub-color-yellow-2)";
    document.querySelector(".regis-stageNo2").style.color= "var(--text-color)";
};
stageButton3b.onclick = function stage3To4(){
    let errMsg = stage3Validate();
    var inputField = document.querySelector(".regis-textField3");
    
    if(errMsg !==""){
        var errMsgParagraph;
            if(typeof errMsg !== "undefined" && errMsg !== ""){
                errMsgParagraph = document.createElement('p');
                errMsgParagraph.classList.add('regis-errorMessage');
                errMsgParagraph.innerHTML = errMsg;
                inputField.append(errMsgParagraph);
            }
    }
    else {
        signUpContent1.style.display = "none";
        signUpContent2.style.display = "none";
        signUpContent3.style.display = "none";
        signUpContent4.style.display = "block";
        document.querySelector(".regis-stageNo3").innerText= "✓";
        document.querySelector(".regis-stageNo3").style.background= "var(--main-color-pink)";
        document.querySelector(".regis-stageNo3").style.color= "var(--background-color)";
    }
};
stageButton4a.onclick = function stage4To3(){
    signUpContent1.style.display = "none";
    signUpContent2.style.display = "none";
    signUpContent3.style.display = "block";
    signUpContent4.style.display = "none";
    document.querySelector(".regis-stageNo3").innerText= "3";
    document.querySelector(".regis-stageNo3").style.background= "var(--sub-color-yellow-2)";
    document.querySelector(".regis-stageNo3").style.color= "var(--text-color)";
};
stageButton4b.onclick = function(){
    let nameOfCutomer = document.getElementById("regis-fname").value;
    localStorage.setItem('nameOfCustomer', nameOfCutomer);
    setWelcomeName();
}
/*Hide Show password */
let eyeIcon = [];
let password = [];
eyeIcon[0] =document.querySelector('.regis-passwordHideEye');
password[0] = document.getElementById('regis-password');
eyeIcon[1] =document.querySelector('.regis-passwordHideEye2');
password[1] = document.getElementById('regis-confirmPassword');

eyeIcon[0].onclick = function(){
    if(password[0].type =="password"){
        password[0].type = "text";
        eyeIcon[0].name = "eye-outline";
    }
    else{
        password[0].type = "password";
        eyeIcon[0].name = "eye-off-outline";
    }
};
eyeIcon[1].onclick = function(){
    if(password[1].type =="password"){
        password[1].type = "text";
        eyeIcon[1].name = "eye-outline";
    }
    else{
        password[1].type = "password";
        eyeIcon[1].name = "eye-off-outline";
    }
};
