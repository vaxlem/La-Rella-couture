const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentE1 = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionE1 = document.getElementById("question");
const answerE1 = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

//keep track of current card

let currentActiveCard = 0;

//DOM cards will be in an array
const cardsE1 = [];

//get card data before storage

const cardsData = getCardsData();

//function to create all cards

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//function to create a single card
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `<div class="inner-card">
            <div class="inner-card-front">
            <p>
            ${data.question}
            </p>
            </div>
            <div class="inner-card-back">
            <p>
            ${data.answer}
            </p>
            </div>
    </div>`;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //add to DOM cards

  cardsE1.push(card);

  cardsContainer.appendChild(card);
  updateCurrentText();
}

//count the cards
function updateCurrentText() {
  currentE1.innerText = `${currentActiveCard + 1}/${cardsE1.length}`;
}
//fetching cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

//add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// function setCardsData(cards) {
//   localStorage.setItem("cards", JSON.stringify(cards));
//   window.location.reload();
// }

createCards();

//event listeners

// next button
nextBtn.addEventListener("click", () => {
  cardsE1[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsE1.length - 1) {
    currentActiveCard = cardsE1.length - 1;
  }

  cardsE1[currentActiveCard].className = "card active";
  updateCurrentText();
});

// nextBtn.addEventListener("click", () => {
//   cardsE1[currentActiveCard].className = "card left";

//   currentActiveCard = currentActiveCard + 1;

//   if (currentActiveCard > cardsE1.length - 1) {
//     currentActiveCard = cardsE1.length - 1;
//   }

//   cardsE1[currentActiveCard].className = "card active";
//   updateCurrentText();
// });

//previous button
prevBtn.addEventListener("click", () => {
  cardsE1[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsE1[currentActiveCard].className = "card active";
  updateCurrentText();
});

//show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
//hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

//add to card button
addCardBtn.addEventListener("click", () => {
  const question = questionE1.value;
  const answer = answerE1.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionE1.value = "";
    answerE1.value = "";

    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//clear card button

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
