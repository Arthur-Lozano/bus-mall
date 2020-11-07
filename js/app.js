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
var ctx = document.getElementById('myChart').getContext('2d');
var votesArr = [];
var viewsArr = [];
var namesArr = [];



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

// Executable code Instantiating new objects into the constructor function

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


function populateRenderQue() {
  //rendQue = [];
  // while (rendQue.length > 3) { //Update your algorithm so that new products are generated, confirm that these products are not duplicates from the immediate previous set.
  //   rendQue.shift();
  // }
  while (rendQue.length < 6) {
    var imageIndex = giveThree();
    while (rendQue.includes(imageIndex)) {
      imageIndex = giveThree();
    }
    rendQue.push(imageIndex);
  }
}

function showMe() {
  populateRenderQue();
  //var firstImage = rendQue[0];//put in for loop and use shift and assign to temp var 
  var firstImage = rendQue.shift();
  var secondImage = rendQue.shift();
  var thirdImage = rendQue.shift();//assign rendQue to array

  console.log('RendQue', rendQue);
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
    getChart();
  }
}

function getData() {
  for (var i = 0; i < variety.length; i++) {
    votesArr.push(variety[i].votes);
    viewsArr.push(variety[i].views);
    namesArr.push(variety[i].name);
  }
  console.log(votesArr);
}

function getChart() {
  getData();
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArr,
      datasets: [{
        label: '# of Views',
        data: viewsArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: votesArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],

      }
    }
  });
}

hoobsContainer.addEventListener('click', handleClick);
