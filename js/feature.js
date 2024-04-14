//Change theme color
var activeTheme = localStorage.getItem('activeTheme');
if(activeTheme){
    document.body.classList.toggle(activeTheme);
}
//Menu Chosen
document.addEventListener("DOMContentLoaded", function() {
    const navHome = document.getElementById('nav-homeLink');
    const navRegis = document.getElementById('nav-registrationLink');
    const navOrder = document.getElementById('nav-orderLink');
    const navFeature = document.getElementById('nav-featureLink');
    navRegis.onmousemove = function(){
        navRegis.classList.add('nav-NavActive');
        navFeature.classList.remove('nav-NavActive');
    }
    navRegis.onmouseout = function(){
        navRegis.classList.remove('nav-NavActive');
        navFeature.classList.add('nav-NavActive');
    }
    navOrder.onmousemove = function(){
        navOrder.classList.add('nav-NavActive');
        navFeature.classList.remove('nav-NavActive');
    }
    navOrder.onmouseout = function(){
        navOrder.classList.remove('nav-NavActive');
        navFeature.classList.add('nav-NavActive');
    }
    navHome.onmousemove = function(){
        navHome.classList.add('nav-NavActive');
        navFeature.classList.remove('nav-NavActive');
    }
    navHome.onmouseout = function(){
        navHome.classList.remove('nav-NavActive');
        navFeature.classList.add('nav-NavActive');
    }
});