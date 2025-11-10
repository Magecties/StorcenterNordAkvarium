"use strict";


// henter id fra canvas og tollbar er lines og clear knap 

const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');


// sætter den til at tegne i 2d
const ctx = canvas.getContext('2d');

//henter template lag ind 
const templateCanvas = document.getElementById('template-layer');
const templateCtx = templateCanvas.getContext('2d');

// loader et template til ens baggrund sådan at folk kan tegne på fisken
const background = new Image();
background.src = 'img/fisketemplate.png'; 



// regner størrelser ud
let canvasRect = canvas.getBoundingClientRect();
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


//sætter canvas størrelser til at være det samme
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

templateCanvas.width = canvas.width;
templateCanvas.height = canvas.height;

// Redraw the fish to fill the template layer
background.onload = function () {
  templateCtx.drawImage(background, 0, 0, templateCanvas.width, templateCanvas.height);
};




// sætter defaults for at tegne
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
ctx.strokeStyle = '#000000';


// clear canvas så der ikke er noget hvis man trykker på clear knappen
toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       templateCtx.drawImage(background, 0, 0, templateCanvas.width, templateCanvas.height); // sætter template ind bagved igen når man ressetter den her kan egentlig bare fjernes
    }
});


// template clear
toolbar.addEventListener('click', e => {
    if (e.target.id === 'cleartemplate') {
        templateCtx.clearRect(0, 0, templateCanvas.width, templateCanvas.height);
    }
});


// ændrer strokebredde og farve inde i tooltips 
toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
      lineWidth = parseInt(e.target.value);
    }
});


// farvevalg eventlistener kigger på alle knapper med klassen color og sætter strokestyle til at være den farve som man klikker på
document.querySelectorAll('.color').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    ctx.strokeStyle = btn.dataset.color;
  });
});


// størrelsesknapper eventlistener her og kigger på alle knapper med klassen size og parser linjebredden så det er en int og sætter linjebredde
//til at være den størrelse som man har valgt
document.querySelectorAll('.size').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    lineWidth = parseInt(btn.dataset.size);
  });
});

// Billede template selector
document.querySelectorAll('.FiskeTemplate').forEach(img => {
  img.addEventListener('click', () => {
 document.querySelectorAll('.FiskTemplate').forEach(img => img.classList.remove('selected'));
    img.classList.add('selected');
    
    background.src = img.dataset.src;
  });
});



// starter ispainting hvis man trykker mus nede
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    canvasRect = canvas.getBoundingClientRect(); // den her er vigtig for at finde ud af hvor canvas ligger i forhold til skærmen
    startX = e.clientX;
    startY = e.clientY;
});


// stopper ispainting hvis man giver slip på mus
canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});



// begynder at tegne med den definerede linjebredde osv
// bliver kaldt når at man flytter mysen og is painting er true som den kun er når musen er holdt nede
const draw = (e) => {
    if(!isPainting) {
        return;
    }
    console.log(e)

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';



    
    ctx.lineTo(e.clientX - canvasRect.left, e.clientY - canvasRect.top);
    ctx.stroke();
}


// eventlistener der aktiverer draw function når du bevæger mus
canvas.addEventListener('mousemove', draw);


//alt med localstorage kommer her 
const saveButton = document.getElementById('SaveFish');

saveButton.addEventListener('click', () => {
  // converter det til url så man kan
  const drawingData = canvas.toDataURL('image/png');

  // gem til localstorage
  localStorage.setItem('savedDrawingOnly', drawingData);
  console.log("Fisk er gemt")


  //sender videre til næste side med det samme man trykker gem
  window.location.href = 'akvarium.html';
  });



  //kode til akvariumside


  window.addEventListener('DOMContentLoaded', () => {
  const imgElement = document.getElementById('fishDrawing');
  const savedDrawing = localStorage.getItem('savedDrawingOnly');

  if (savedDrawing) {
    imgElement.src = savedDrawing;
  } else {
    imgElement.alt = 'No saved drawing found 😢';
  }
});