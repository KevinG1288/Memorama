const emojis = ["🍎", "🍌", "🍓", "🍇", "🍎", "🍌", "🍓", "🍇"];
let shuffled = emojis.sort(() => 0.5 - Math.random());
let firstCard = null;
let lockBoard = false;
let matches = 0;

const board = document.getElementById("game-board");
const statusText = document.getElementById("status");

// Crear cartas
shuffled.forEach((emoji, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.innerText = "❓";

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.innerText = card.dataset.emoji;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    checkMatch(card);
  }
}

function checkMatch(secondCard) {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matches++;
    firstCard = null;

    if (matches === emojis.length / 2) {
      statusText.innerText = "¡Ganaste 🎉!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.innerText = "❓";
      firstCard.classList.remove("flipped");
      secondCard.innerText = "❓";
      secondCard.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
    }, 1000);
  }
}
