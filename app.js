//get element by ID which is game
// const gameContainer = document.getElementById("#game"); //uncaught type error: Cannot read properties of null (reading 'append') at createDivsForColors (app.js: 59:19) at app.js:70:1

const gameContainer = document.getElementById("game");
//two cards to have variables
let card1 = null; //placeholder for card1 to be declared later in code
let card2 = null; //placeholder for card2 to be declared later in code
//variable to represent a card being flipped
let cardFlipped = 0;
let noClicking = false;

//creating colors so an order list [array] can be applied
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
]; //

//creating a function to shuffle the arrays
//return same array when suffled which helps if the person gets wrong
// algorithm called Fisher Yates which is a finite sequrence

function shuffle(array) {
  let counter = array.length; //count the index of the array

  //while loop - while there are elements in the array then perform this function
  while (counter > 0) {
    //pick a random index number
    let index = Math.floor(Math.random() * counter);

    //decrease counter by 1
    counter--;

    //add swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

//function to loop over the array of colors
//it creates a new div and gives it a class with the value of the color
//it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    //create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return; // return if false

  if (e.target.classList.contains("flipped")) return; //
  //   console.log("You just clicked", e.target);

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0]; //css syntax to pass color corresponding thru index placement when clicked starting at 0

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;

    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardFlipped === COLORS.length) alert("game over!");
}

//when the DOM loads
createDivsForColors(shuffledColors); //visual cards on page
