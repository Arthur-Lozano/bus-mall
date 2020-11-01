'use strict';



// Globals

var variety = [];
var maxClicks = 25;
var currentClicks = 0;
var hoobsContainer = document.getElementById('container');
var imageElementOne = document.getElementById('imageOne');
var imageElementTwo = document.getElementById('imageTwo');
var imageElementThree = document.getElementById('imageThree');
var hoobsList = document.getElementById('list');
var rendQue = [];




// Variables to store products


// An Image array that is a property of my constructor
function Mall(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  variety.push(this);
}

// functions
function giveThree() {
  return Math.floor(Math.random() * variety.length);
}

// Executable code

new Mall('bag');
new Mall('banana');
new Mall('bathroom');
new Mall('boots');
new Mall('breakfast');
new Mall('bubblegum');
new Mall('chair');
new Mall('cthulhu');
new Mall('dog-duck');
new Mall('dragon');
new Mall('pen');
new Mall('pet-sweep');
new Mall('scissors');
new Mall('shark');
new Mall('sweep');
new Mall('tauntaun');
new Mall('unicorn');
new Mall('usb');
new Mall('water-can');
new Mall('wine-glass');

//Function worked correctly - console.log(giveThree());
function populateRenderQue() {
  rendQue = [];

  while (rendQue.length < 3) {
    var imageIndex = giveThree();
    while (rendQue.includes(imageIndex)) {
      imageIndex = giveThree();
    }
    rendQue.push(imageIndex);
  }
}
console.log(rendQue);

function showMe() {
  populateRenderQue();
  var firstImage = rendQue[0];
  var secondImage = rendQue[1];
  var thirdImage = rendQue[2];

  console.log(firstImage);
  imageElementOne.src = variety[firstImage].src;
  imageElementOne.alt = variety[firstImage].name;
  variety[firstImage].views++;

  imageElementTwo.src = variety[secondImage].src;
  imageElementTwo.alt = variety[secondImage].name;
  variety[secondImage].views++;

  imageElementThree.src = variety[thirdImage].src;
  imageElementThree.alt = variety[thirdImage].name;
  variety[thirdImage].views++;
}

function renderResults() {
  for (var i = 0; i < variety.length; i++) {
    // create element
    var li = document.createElement('li');
    // give it content
    li.textContent = `${variety[i].name} had ${variety[i].votes} votes, and was seen ${variety[i].views} times.`;
    // append it to the dom
    hoobsList.appendChild(li);
  }
}

showMe();
//Event handler

function handleClick(event) {
  var clickedImage = event.target.alt;
  currentClicks++;

  for (var i = 0; i < variety.length; i++) {
    if (clickedImage === variety[i].name) {
      variety[i].votes++;
    }
  }
  showMe();

  if (currentClicks === maxClicks) {
    hoobsContainer.removeEventListener('click', handleClick);
    renderResults();
  }
}



hoobsContainer.addEventListener('click', handleClick);
