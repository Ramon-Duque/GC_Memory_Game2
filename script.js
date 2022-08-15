// Function to start timer
let counter = 0;
function myCounter() {
  document.getElementById("timer").innerHTML = ++counter;
}


// randomizer array for cards, with img sources for whatever pics we want to use

const cardArray = [
 {
  name: 'arcdetriophme',
  img: 'images/arcdetriomphe.jpeg',
 },
 {
  name: 'colosseum',
  img: 'images/colosseum.jpeg',
 },
 {
  name: 'giza',
  img: 'images/giza.jpeg',
 },
 {
  name: 'rushmore',
  img: 'images/rushmore.jpeg',
 },
 {
  name: 'statueofliberty',
  img: 'images/statue_of_liberty.jpeg',
 },
  {
  name: 'tajmahal',
  img: 'images/tajmahal.jpeg',
  }
]
let memoryGameGrid = cardArray.concat(cardArray)
memoryGameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const memoryGame = document.getElementById('card-container');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
memoryGame.appendChild(grid);

memoryGameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});