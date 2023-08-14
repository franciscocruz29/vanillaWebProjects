// Get references to HTML elements
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

// Get all parts of the hangman figure
const figureParts = document.querySelectorAll('.figure-part');

// List of words to choose from
const words = ['application', 'programming', 'interface', 'wizard'];

// Select a random word from the list
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Flag to control game playability
let playable = true;

// Arrays to store correct and wrong letters
const correctLetters = [];
const wrongLetters = [];

// Display the word with correct guessed letters
function displayWord() {
  // Create an HTML representation of the word, showing guessed letters
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  // Get the inner text of the displayed word (without spaces or line breaks)
  const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

  // Check if the displayed word matches the selected word
  if (innerWord === selectedWord) {
    // Player wins
    finalMessage.innerText = 'Congratulations! You won! 😃';
    finalMessageRevealWord.innerText = '';
    popup.style.display = 'flex';

    // Disable further gameplay
    playable = false;
  }
}

// Update the display of wrong letters and hangman figure
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts of the hangman figure based on wrong guesses
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if the player has lost (all hangman parts shown)
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = 'flex';

    // Disable further gameplay
    playable = false;
  }
}

// Display a notification for a short time
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000); // Notification disappears after 2 seconds
}

// Listen for key presses for letter guesses
window.addEventListener('keydown', e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) { // Check if the key pressed is a letter
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        // Correct guess
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification(); // Show notification for duplicate correct letter
        }
      } else {
        // Wrong guess
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification(); // Show notification for duplicate wrong letter
        }
      }
    }
  }
});

// Restart the game and play again
playAgainBtn.addEventListener('click', () => {
  playable = true;

  // Empty arrays for correct and wrong letters
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Choose a new random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Reset the display
  displayWord();
  updateWrongLettersEl();

  // Hide the end game popup
  popup.style.display = 'none';
});

// Display the initial word
displayWord();
