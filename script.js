// Function to start timer
let counter = 0;
function myCounter() {
  document.getElementById("timer").innerHTML = ++counter;
}

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
// Create and randomize cards in grid
let memoryGameGrid = cardArray.concat(cardArray)
memoryGameGrid.sort(() => 0.5 - Math.random());

// stores our guesses
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
  
//  adds front and back divs
  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

// matching elements function
const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};
// Reset our guess count and selections back to original value
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
// only selects divs inside our grid
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
    // first guess
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
      // second guess
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
    //  if guesses are not empty and first = second it runs the match funtion
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});

