const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard; //variable pour la selection des paires
let lockBoard = false;
let score = 0; //compteur pour le score

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

//mélange les cartes
function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex]; //change les cartes d'emplacement
    cards[randomIndex] = temporaryValue;
  }
}

//generation du packet de cartes
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

//retourner les cartes
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  //ajoute l'attribut flipped pour retourner les cartes
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++; //augmente le nombre de coup de 1 et donc le score de 1 après avoir retourné une paire de cartes
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch(); //check si les deux cartes selectionnaient matches
}

//fonction pour check les deux cartes
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards(); //ternaire
}

//les cartes sont bonnes donc ne sont plus clickables
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

//retourne les cartes
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 500);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

//reset le jeu pour recommencer
function restart() {
  resetBoard();
  shuffleCards();
  score = 0; //reset le score
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}

//fonction barre espace pour reset le jeu
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    //évenement lorsqu'on appui sur la barre espace
    restart();
  }
});