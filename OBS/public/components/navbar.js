var boo = true;
function navbarChange(){
    var x = document.getElementById("ul");
    var y = document.getElementsByClassName("menu-icon");
    if(boo==true){
        x.className = "nav-menu active";
    }else{
        x.className = "nav-menu";
    }
    boo = !boo;
    let links = document.getElementsByTagName('link');
            for (let i = 0; i < links.length; i++) {
                if (links[i].getAttribute('rel') == 'stylesheet') {
                    let href = links[i].getAttribute('href').split('?')[0];
                    let newHref = href + '?version=' + new Date().getMilliseconds();
                    links[i].setAttribute('href', newHref);
                }
            }
}

function scrollToSection(sectionId) {
    var section = document.querySelector(sectionId);
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  }

function openForm(){
    document.getElementById("signupOverlay").style.display="block";
    document.getElementById("wrap-new").style.display="none";
    document.getElementById("wrap").style.display="block";
}

function closeForm(){
    document.getElementById("signupOverlay").style.display="none";
}

function openLogin(){
    document.getElementById("wrap").style.display="none";
    document.getElementById("wrap-new").style.display="block";
}