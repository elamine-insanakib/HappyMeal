var agenda = 
  {
    lundi: {
      midi: "",
      soir: ""
    },
    mardi: {
      midi: "",
      soir: ""
    },
    mercredi: {
      midi: "",
      soir: ""
    },
    jeudi: {
      midi: "",
      soir: ""
    },
    vendredi: {
      midi: "",
      soir: ""
    },
    samedi: {
      midi: "",
      soir: ""
    },
    dimanche: {
      midi: "",
      soir: ""
    }
  }

const json = fetch('data.json')
  .then(response => response.json())
  .then(data => {
      return data;
  })
  .catch(error => console.error('Erreur:', error));


const favoris = JSON.parse(localStorage.getItem('favoris')) || [];

if (localStorage.getItem('agenda')) {
  agenda = JSON.parse(localStorage.getItem('agenda'));
}


const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

function getDayAndIndex(date) {
    const dayIndex = date.getDay();
    const dayName = days[dayIndex];
    return { dayName, dayIndex };
}

function setTodayDay() {
    const today = new Date();
    const { dayName } = getDayAndIndex(today);
    document.getElementById('day').textContent = dayName;
}

function getDayCurrentDay() {
  return current_day = document.getElementById('day').textContent;
}

function leftButton () {
  const current_day = getDayCurrentDay();
  const index = days.indexOf(current_day);
  const previous_day = days[index - 1];
  document.getElementById('day').textContent = previous_day;
  if (index === 0) {
    document.getElementById('day').textContent = days[6];
  }
}

function rightButton() {
  const current_day = getDayCurrentDay();
  const index = days.indexOf(current_day);
  const next_day = days[index + 1];
  document.getElementById('day').textContent = next_day;
  if (index === 6) {
    document.getElementById('day').textContent = days[0];
  }
}

function deleteOption() {
  const options = document.getElementsByClassName('opt');
  while (options.length > 0) {
    options[0].remove();
  }
  const day_select = document.getElementById('day-select');
  const night_select = document.getElementById('night-select');
  day_select.selectedIndex = 0;
  night_select.selectedIndex = 0;

  const day_remove = document.getElementById('day-remove');
  const night_remove = document.getElementById('night-remove');
  day_remove.classList.add('hidden');
  night_remove.classList.add('hidden');
}

async function getOption() {
  const data = await json;
  favoris.forEach(favori => {
    const day_option = document.createElement('option');
    const night_option = document.createElement('option');
    day_option.setAttribute('class', 'opt');
    night_option.setAttribute('class', 'opt');
    var name = data.recettes[favori].nom;
    day_option.textContent = name;
    night_option.textContent = name;
    day_option.value = favori;
    night_option.value = favori;
    document.getElementById('day-select').appendChild(day_option);
    document.getElementById('night-select').appendChild(night_option);
  });
}

function saveAgenda(schedule, value) {
  const current_day = getDayCurrentDay();
  agenda[current_day][schedule] = value
  localStorage.setItem('agenda', JSON.stringify(agenda));
}

async function displayAgenda() {
  const data = await json
  const current_day = getDayCurrentDay();
  console.log('current_day', current_day);
  const midi = agenda[current_day].midi;
  const soir = agenda[current_day].soir;
  // je veux que l'option avec la valeur midi soit selectionnée
  const day_select = document.getElementById('day-select');
  const night_select = document.getElementById('night-select');
  day_select.value = midi;
  night_select.value = soir;
  const day_remove = document.getElementById('day-remove');
  const night_remove = document.getElementById('night-remove');
  if (midi) {
    day_remove.classList.remove('hidden');
  }
  if (soir) {
    night_remove.classList.remove('hidden');
  }
  if (!midi) {
    day_select.selectedIndex = 0;
  }
  if (!soir) {
    night_select.selectedIndex = 0;
  }
}



document.getElementById('l-button').addEventListener('click', () => {
  deleteOption();
  leftButton();
  getOption();
  displayAgenda();
});

document.getElementById('r-button').addEventListener('click', () => {
  deleteOption();
  rightButton();
  getOption();
  displayAgenda();
});

document.getElementById('day-select').addEventListener('change', (event) => {
  saveAgenda('midi', event.target.value)
  displayAgenda();
});

document.getElementById('night-select').addEventListener('change', (event) => {
  saveAgenda('soir', event.target.value)
  displayAgenda();
});

document.getElementById('day-remove').addEventListener('click', () => {
  saveAgenda('midi', '');
  deleteOption();
  getOption();
  displayAgenda();
});

document.getElementById('night-remove').addEventListener('click', () => {
  saveAgenda('soir', '');
  deleteOption();
  getOption();
  displayAgenda();
});

setTodayDay();
getOption();
displayAgenda();






  