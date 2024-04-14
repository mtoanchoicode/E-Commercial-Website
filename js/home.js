//Menu Chosen
document.addEventListener("DOMContentLoaded", function() {
    const navHome = document.getElementById('nav-homeLink');
    const navRegis = document.getElementById('nav-registrationLink');
    const navOrder = document.getElementById('nav-orderLink');
    const navFeature = document.getElementById('nav-featureLink');
    navRegis.onmousemove = function(){
        navRegis.classList.add('nav-NavActive');
        navHome.classList.remove('nav-NavActive');
    }
    navRegis.onmouseout = function(){
        navRegis.classList.remove('nav-NavActive');
        navHome.classList.add('nav-NavActive');
    }
    navOrder.onmousemove = function(){
        navOrder.classList.add('nav-NavActive');
        navHome.classList.remove('nav-NavActive');
    }
    navOrder.onmouseout = function(){
        navOrder.classList.remove('nav-NavActive');
        navHome.classList.add('nav-NavActive');
    }
    navFeature.onmousemove = function(){
        navFeature.classList.add('nav-NavActive');
        navHome.classList.remove('nav-NavActive');
    }
    navFeature.onmouseout = function(){
        navFeature.classList.remove('nav-NavActive');
        navHome.classList.add('nav-NavActive');
    }
});
//Landing Page Slider
let landingPageList = document.querySelector('.home-LandingPageDiv .home-LandingPageList');
let landingPageItems = document.querySelectorAll('.home-LandingPageDiv .home-LandingPageList .home-LandingPage');
let landingPageDots = document.querySelectorAll('.home-LandingPageDiv .home-LandingPageDots li');
let landingPagePrev =document.getElementById('home-LandingPagePrev');
let landingPageNext = document.getElementById('home-LandingPageNext');

let landingPageActive = 0;
let landingPageLengthItem = landingPageItems.length - 1;

function updateOffset() {
    let checkLeft = landingPageItems[landingPageActive].offsetLeft;
    landingPageList.style.left = -checkLeft + 'px';
}

landingPageNext.onclick = function(){
    if(landingPageActive + 1 > landingPageLengthItem){
        landingPageActive = 0;
    }
    else{
        landingPageActive = landingPageActive + 1;
    }
    reloadLandingPageSlider();
}
landingPagePrev.onclick = function(){
    if(landingPageActive - 1 <0){
        landingPageActive = landingPageLengthItem;
    }
    else{
        landingPageActive = landingPageActive -1;
    }
    reloadLandingPageSlider();
}
let landingPageRefeshSlider = setInterval(()=>{landingPageNext.click()}, 9000);
function reloadLandingPageSlider(){
    updateOffset();

    let checkLeft = landingPageItems[landingPageActive].offsetLeft;
    landingPageList.style.left = -checkLeft + 'px';
    let landingLastActiveDot = document.querySelector('.home-LandingPageDiv .home-LandingPageDots li.home-LandingPageDotActive');
    landingLastActiveDot.classList.remove('home-LandingPageDotActive');
    landingPageDots[landingPageActive].classList.add('home-LandingPageDotActive');
    clearInterval(landingPageRefeshSlider);
    landingPageRefeshSlider = setInterval(()=>{landingPageNext.click()},9000);
}

landingPageDots.forEach((li, key)=>{
    li.addEventListener('click', function(){
        landingPageActive = key;
        reloadLandingPageSlider();
    })
})
window.addEventListener('resize', updateOffset);
//Change theme color
function landingPageResetButtons() {
    var buttons = document.querySelectorAll('.home-SwitchDiv');
    buttons.forEach(function(button) {
        button.classList.remove('home-buttonActive');
    });
}
var activeButton = localStorage.getItem('activeButton');
if(activeButton){
    document.querySelector(activeButton).classList.add("home-buttonActive");
}
else{
    document.querySelector('.home-SwitchVanilla').classList.add("home-buttonActive");
}
var activeTheme = localStorage.getItem('activeTheme');
if(activeTheme){
    document.body.classList.toggle(activeTheme);
    document.querySelector('.home-LandingPageIceCream').src = "images/home/home-" + activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1) + "IC.png";
}
document.querySelectorAll('.home-SwitchDiv').forEach(function(button) {
    button.onclick = function() {
        var themeClass = this.classList[0].slice(11);
        setActiveTheme('.' + this.classList[0], themeClass);
    };
});
//Card Swiper Signature Flavour
const initSlider = function(){
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slidebutton");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    slideButtons.forEach(div => {
        div.addEventListener("click", ()=>{
            const direction = div.id === "prev-slide" ? -1:1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior:"smooth"});
        });
    });
    const handleSlideButtons = function(){
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };
    imageList.addEventListener("scroll", ()=>{
        handleSlideButtons();
    });
}
window.addEventListener("load", initSlider);

//Count Down Sale Off
let launchDate= new Date("May 10, 2024 12:00:00").getTime();
let timer = setInterval(tick, 1000);
function tick(){
    let now= new Date().getTime();
    let t = launchDate - now;
    if(t>0){
        let days = Math.floor(t/(1000*60*60*24));
        if (days < 10){
            days = "0" + days;
        }
        let hours = Math.floor((t%(1000*60*60*24))/(1000*60*60));
        if (hours < 10){
            hours = "0" + hours;
        }
        let mins = Math.floor((t%(1000*60*60))/(1000*60));
        if (mins < 10){
            mins = "0" + mins;
        }
        let secs = Math.floor((t%(1000*60))/(1000));
        if (secs < 10){
            secs = "0" + secs;
        }
        let time = `${days} : ${hours} : ${mins} : ${secs}`;
        document.querySelector(".home-SaleOffCountDown").innerText = time;
    }
}
//Scroll to appear

    const unshows =document.querySelectorAll(".unshow");
    window.addEventListener('scroll', disunshow);


    function disunshow(){
        const triggerBottom = window.innerHeight / 5 *3.5;
        unshows.forEach((unshow)=>{
            const unshowTop = unshow.getBoundingClientRect().top;
            if(triggerBottom > unshowTop ){
                unshow.classList.add('show');
            }
            else{
                unshow.classList.remove('show');
            }
        })
    }