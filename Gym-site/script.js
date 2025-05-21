const lightbox = document.createElement ('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll ('.img');
images.forEach (image => {
    image.addEventListener('click', e => {
        lightbox.classList.add ('activ');
        const img = document.createElement('img') ;
        img.src = image.src;
        while(lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img) ; 
    })
})

lightbox.addEventListener('click', e =>{
    if(e.target !== e.currentTarget) return
    lightbox.classList.remove('activ');
})

//  script for hamburger

const togglebutton = document.getElementsByClassName('toggle-btn') [0];
const links = document.getElementsByClassName('links') [0];
const span =document.getElementsByClassName('red-text')[0];
const togglebar = document.getElementsByClassName('bar');

togglebutton.addEventListener('click', () => {
    links.classList.toggle('activ-ham');
    for(i=0;i<=3;i++){
        if(links.className=="links activ-ham")
        togglebar[i].style.background="black";
        else
        togglebar[i].style.background="white";
       
    }
    if(links.className=="links activ-ham"){

        togglebar[0].style.transform="rotateZ(-405deg) translate(-5px, 4px)"
        togglebar[1].style.opacity="0";
        togglebar[2].style.transform="rotateZ(405deg) translate(-7px, -6px)"
    }
    else{
        togglebar[0].style.transform="none"
        togglebar[1].style.opacity="100%";
        togglebar[2].style.transform="none"
    }
      
       

})

// clasa
togglebutton.addEventListener('click', () =>{
    span.classList.remove('red-text');
})
