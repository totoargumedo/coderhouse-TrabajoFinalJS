//constructor de jugadores
class Player {
  constructor(player) {
    this.name = player.name;
    this.currentScore = player.currentScore;
    this.victories = player.victories;
  }
}

let players = [];
let thisPlayWinner = [];
let maxScore = 0;

// Crear los jugadores

let twoPlayer = document.getElementById("twoPlayer");
let threePlayer = document.getElementById("threePlayer");
let fourPlayer = document.getElementById("fourPlayer");

twoPlayer.addEventListener("click", addTwoPlayer);
threePlayer.addEventListener("click", addThreePlayer);
fourPlayer.addEventListener("click", addFourPlayer);

function addTwoPlayer() {
  let playerCreate = document.createElement("div");
  playerCreate.innerHTML = `<h3>Ingrese los Nombres de los Jugadores</h3>
    <input type="text" class="playerInput" placeholder="Jugador" id="1">
    <input type="text" class="playerInput" placeholder="Jugador" id="2">`;
  document.getElementById("playersInputs").appendChild(playerCreate);
  playersNumber = 2;
  $(`.playersNumber`).remove();
}

function addThreePlayer() {
  let playerCreate = document.createElement("div");
  playerCreate.innerHTML = `<h3>Ingrese los Nombres de los Jugadores</h3>
    <input type="text" class="playerInput" placeholder="Jugador" id="1">
    <input type="text" class="playerInput" placeholder="Jugador" id="2">
    <input type="text" class="playerInput" placeholder="Jugador" id="3">`;
  document.getElementById("playersInputs").appendChild(playerCreate);
  playersNumber = 3;
  $(`.playersNumber`).remove();
}

function addFourPlayer() {
  let playerCreate = document.createElement("div");
  playerCreate.innerHTML = `<h3>Ingrese los Nombres de los Jugadores</h3>
    <input type="text" class="playerInput" placeholder="Jugador" id="1">
    <input type="text" class="playerInput" placeholder="Jugador" id="2">
    <input type="text" class="playerInput" placeholder="Jugador" id="3">
    <input type="text" class="playerInput" placeholder="Jugador" id="4">`;
  document.getElementById("playersInputs").appendChild(playerCreate);
  playersNumber = 4;
  $(`.playersNumber`).remove();
}

//Crear rooster de jugadores

let playerRooster = document.getElementById("createPlayerRooster");
playerRooster.addEventListener("click", rooster);

function rooster() {
  if ($(`.playerInput`).length == 0) {
    alert("No deje nombres de usuario vacios");
  } else {
    for (i = 0; i < playersNumber; i++) {
      let player = new Player({
        name: document.getElementById(i + 1).value,
        currentScore: 0,
        victories: 0,
      });
      console.log(
        `Se creo el Jugador ${i + 1} con nombre ${
          player.name
        } y puntaje inicial de ${player.currentScore}`
      );
      let newPlayer = document.createElement("div");
      newPlayer.className = "player";
      newPlayer.innerHTML = `<h4 class="show" style="display:none"> PLAYER ${
        i + 1
      } => ${player.name}</h4>`;
      document.getElementById("playersCreated").appendChild(newPlayer);
      players.push(player);
    }
    $(`.playersCreation`)
      .empty()
      .append(
        `<img class="imgRelleno" src="./images/fierro.png" alt="Foto Fierro" />`
      );
    $(`.show`).fadeIn();
    let borrar = document.getElementById("createPlayerRooster");
  }
}

//Seleccion de dado de juegos por caras

// declarar array de dados
const dices = [
  { id: 4, nombre: "d4" },
  { id: 6, nombre: "d6" },
  { id: 8, nombre: "d8" },
  { id: 10, nombre: "d10" },
  { id: 12, nombre: "d12" },
  { id: 20, nombre: "d20" },
  { id: 100, nombre: "d100" },
];

// funcion para mostrar opciones de dados

let face = 0;

function showDices() {
  $(`.diceRoll`).remove();
  $(`.diceSection`).prepend(`<div class="col-9 dices">
                </div>`);
  for (const dice of dices) {
    $(`.dices`)
      .append(
        `
        <div class="diceShow" style="display: none">
        <img src="images/d${dice.id}.svg" alt="Dado ${dice.nombre}" class="dice" id="d${dice.id}">
        <h5>D${dice.id}</h5>
        </div>`
      )
      .on(`click`, `#d${dice.id}`, function () {
        face = dice.id;
        console.warn(`Se jugará con dados de ${face} caras`);
        $(`.diceShow`).remove();
        $(`.dices`).append(`
            <div class="diceShow" style="display: none">
            <img src="images/d${dice.id}.svg" alt="Dado ${dice.nombre}" class="dice">
            <h5>Selecciono d${dice.id}</h5>
            </div>`);
        $(`.diceShow`).slideDown();
        return face;
      });
    $(`.diceShow`).slideDown();
  }
}

$(() => {
  $(`#diceSelect`).click(showDices);
});

//Seleccion de rondas a jugar

let rounds = document.getElementById("roundsNumber");
rounds.addEventListener("click", roundsEvent);

function roundsEvent() {
  let rondas = document.getElementById("roundsInput").value;

  let borrar = document.getElementById("roundsNumber");
  document.getElementById("roundSelection").removeChild(borrar);

  console.warn(`Se jugaran ${rondas} rondas!!`);

  $(`#roundsInput, #roundsNumber`).remove();
  $(`#roundSelection`).append(`<h3 class="roundsNumber">${rondas}</h3>`);

  //Lanzar dados por cada jugador en la cantidad de rondas seleccionadas

  for (i = 0; i < rondas; i++) {
    $(`#roundScores`).append(
      `<h6 clase="roundinit">Inicio ronda ${i + 1}</h3>`
    );

    for (j = 0; j < players.length; j++) {
      let tirada = parseInt(Math.random() * face + 1);
      $(`#roundScores`).append(
        `<p>El jugador ${players[j].name} lanzo un ${tirada}</p>`
      );
      players[j].currentScore = players[j].currentScore + tirada;
    }
  }
  //Conteo total de puntos

  for (const player of players) {
    let playersScore = document.createElement("h4");
    playersScore.className = "player";
    playersScore.innerHTML = `El jugador ${player.name} termino con un puntaje de ${player.currentScore}`;
    document.getElementById("scores").appendChild(playersScore);
    console.warn(
      `El jugador ${player.name} termino con un puntaje de ${player.currentScore}`
    );

    if (player.currentScore > maxScore) {
      maxScore = player.currentScore;
    }
  }

  //Determinador de ganador/es

  //   let winnersData = JSON.parse(localStorage.getItem("winners")) || [];
  //   console.log(winners);

  for (const player of players) {
    if (maxScore === player.currentScore) {
      player.victories = player.victories + 1;
      $(`#winner`).append(`<h2>${player.name}</h2>
          <p>Victorias Totales ${player.victories}</p>`);
      thisPlayWinner.push(player);
    }
  }
}
function saveWinners() {
  // Obtener ganadores guardados en localStorage, caso contrario crear un array vacio en localStorage
  if (localStorage.getItem("winners") == null) {
    localStorage.setItem("winners", "[]");
  }
  let winnersOldData = JSON.parse(localStorage.getItem("winners"));
  for (const player of players) {
    if (maxScore === player.currentScore) {
      winnersOldData.push(player);
    }
  }
  localStorage.setItem("winners", JSON.stringify(winnersOldData));
}

$(`#saveHistory`).on("click", saveWinners);
//Mostrar Historial de ganadores

let history = document.getElementById("showHistory");
history.addEventListener("click", createHistory);

function createHistory() {
  if (localStorage.getItem("winners") == null) {
    localStorage.setItem("winners", "[]");
  }
  let historicWinners = JSON.parse(localStorage.getItem("winners"));
  for (const player of historicWinners) {
    $(`#winnerHistory`)
      .append(`<h4>${player.name} con ${player.victories} victorias</h4>
    `);
  }
}
// Borrar Historial de ganadores

let clearHistoryStorage = document.getElementById("clearHistory");
clearHistoryStorage.addEventListener("click", clearHistory);

function clearHistory() {
  localStorage.clear();
}
