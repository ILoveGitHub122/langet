// Profilsidan
const form = document.querySelector('#profile-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name-input').value;
  const age = document.querySelector('#age-input').value;
  const gender = document.querySelector('#gender-select').value;
  const discord = document.querySelector('#discord-input').value;

  // Spara användarprofil i local storage
  localStorage.setItem('userProfile', JSON.stringify({
    name: name,
    age: age,
    gender: gender,
    discord: discord
  }));

  // Länka till Swipe-sidan
  window.location.href = 'swipe.html';
});

// Swipe-sidan
const cardsContainer = document.querySelector('#cards-container');
const swipeButtons = document.querySelectorAll('.swipe-button');

// Skapa en array med användarprofiler från en API
const users = [];

function createCard(user) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${user.avatar}" alt="Profile picture">
    <h2>${user.name}, ${user.age}</h2>
    <p>${user.bio}</p>
    <button class="swipe-button swipe-left">Swipe left</button>
    <button class="swipe-button swipe-right">Swipe right</button>
  `;
  cardsContainer.appendChild(card);
}

function displayCards() {
  users.forEach(user => createCard(user));
}

displayCards();

swipeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (e.target.classList.contains('swipe-left')) {
      // Swipe left - ta bort kortet
      cardsContainer.removeChild(card);
    } else if (e.target.classList.contains('swipe-right')) {
      // Swipe right - spara matchen i local storage och ta bort kortet
      const user = users.find(user => user.name === card.querySelector('h2').textContent.split(',')[0]);
      localStorage.setItem('matchedUser', JSON.stringify(user));
      cardsContainer.removeChild(card);
    }
  });
});
