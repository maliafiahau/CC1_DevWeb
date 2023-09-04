"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

$numUsr.readOnly = true; // l'utilisateur ne peut pas entrer de valeur tant que le jeu n'a pas commencé
function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  console.log($maxUsr.value);
  $output.textContent = `Le but du jeu est de trouver le nombre secret, compris entre 1 et ${$maxUsr.value}. Bonne chance.`;
  $numUsr.readOnly = false; // possibilité d'écrire une fois le jeu lancé
  $guessBtn.disabled = false;
}

$startBtn.addEventListener("click", launchGame);

$guessBtn.addEventListener ("click", (_evt) => {
  const $valGame = parseInt($maxUsr.value); 
  const $valUser = parseInt($numUsr.value);

  if ($valUser > secretNumber) {
    $output.textContent = `${$valUser} est trop grand.`;
  }
  if ($valUser < secretNumber) {
    $output.textContent = `${$valUser} est trop petit.`;
  }
  if ($valUser === secretNumber) {
    $output.textContent = "Félicitations ! Vous avez trouvé le nombre secret !"
    $guessBtn.disabled = true;
    $numUsr.readOnly = true;
  }
  if ($valUser > $valGame || $valUser < 1 ) {
    $output.textContent = `Saisir un nombre compris entre 1 et ${$valGame}.`;
  } $numUsr.value = "";
})

$numUsr.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    const $nbUser = parseInt($numUsr.value);
    const $nbGame = parseInt($maxUsr.value);

    if ($nbUser === secretNumber) {
      $output.textContent = "Félicitations ! Vous avez trouvé le nombre secret !"
      $guessBtn.disabled = true;
      $numUsr.readOnly = true;
    }
    if ($nbUser > secretNumber) {
      $output.textContent = `${$nbUser} est trop grand.`;
    }
    if ($nbUser < secretNumber) {
      $output.textContent = `${$nbUser} est trop petit.`;
    }
    if ($nbUser > $nbGame || $nbUser < 1) {
      $output.textContent = `Saisir un nombre compris entre 1 et ${$nbGame}.`;
    } $numUsr.value = "";
  }
})

function addCow(evt) {
  let $image1 = document.createElement("img");
  let $image2 = document.createElement("img");
  $image1.setAttribute("src", "Cowicon.svg");
  $image2.setAttribute("src", "Cowicon.svg");
  $image2.setAttribute("class", "cow");

  const $x = evt.clientX - document.body.getBoundingClientRect().left;
  const $y = evt.clientY - document.body.getBoundingClientRect().top;
  $image2.style.left = `${$x}px`;
  $image2.style.top = `${$y}px`;
  $image2.style.transform = `rotate(${Math.random()}turn)`;
  window.scroll({ behavior: "instant"});

  document.body.appendChild($image1);
  document.body.appendChild($image2);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}

$cowBtn.addEventListener("click", toggleCow);