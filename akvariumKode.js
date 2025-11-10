


  //kode til akvariumside

const sefiskknap = document.getElementById('sefisk');

  document.addEventListener('DOMContentLoaded', () => {
  const imgElement = document.getElementById('fishDrawing');
  const savedDrawing = localStorage.getItem('savedDrawingOnly');

  if (savedDrawing) {
    imgElement.src = savedDrawing;
  } else {
    imgElement.alt = 'No saved drawing found 😢';
  }
});



//tilbage til mainsiden
const tilbagebtn = document.getElementById('tilbagemain');

tilbagebtn.addEventListener('click', () => {
window.location.href = 'index.html';

})
