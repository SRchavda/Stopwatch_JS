"use strict";

var startButton = document.getElementById("start-btn");
var stopButton = document.getElementById("stop-btn");
var resetButton = document.getElementById("reset-btn");

var hourNode = document.getElementById("time-hour");
var minNode = document.getElementById("time-min");
var secNode = document.getElementById("time-sec");
var miliSecNode = document.getElementById("time-milisec");

let intervalId;
let isRunning = false;
let elapsedMiliSeconds = 0;
let elapsedSeconds = 0;
let elapsedMinutes = 0;
let elapsedHours = 0;

const startWatch = () => {
  clearInterval(intervalId);
  if (isRunning) {
    //pause the watch if running
    startButton.innerText = "Resume";
  } else {
    //start the new watch if not already running
    intervalId = setInterval(function () {
      elapsedMiliSeconds = elapsedMiliSeconds + 1;
      updateHtml(elapsedMiliSeconds);
    }, 10);
    startButton.innerText = "Pause";
    stopButton.classList.remove("d-none");
    resetButton.classList.remove("d-none");
  }
  isRunning = !isRunning; //invert the status each time
};

const stopWatch = () => {
  if (!intervalId) return; //if already stopped then return
  resetTimer(); //else just reset time
};

const resetWatch = () => {
  resetTimer(); //reset time
  updateHtml(elapsedSeconds); //update web page with reseted time

  //hide stop & reset button
  stopButton.classList.add("d-none");
  resetButton.classList.add("d-none");
};

const resetTimer = () => {
  clearInterval(intervalId);
  elapsedMiliSeconds = 0;
  elapsedSeconds = 0;
  elapsedMinutes = 0;
  elapsedHours = 0;
  startButton.innerText = "Start";
  isRunning = false;
};

const updateHtml = (currentMiliSec) => {
  //calculate timer
  if (currentMiliSec == 100) {
    elapsedSeconds++;
    elapsedMiliSeconds = 0;
  }
  if (elapsedSeconds == 60) {
    elapsedMinutes++;
    elapsedSeconds = 0;
  }
  if (elapsedMinutes == 60) {
    elapsedHours++;
    elapsedMinutes = 0;
  }

  //add padding to time and update web page
  miliSecNode.innerText = addPad(elapsedMiliSeconds);
  secNode.innerHTML = addPad(elapsedSeconds);
  minNode.innerHTML = addPad(elapsedMinutes);
  hourNode.innerHTML = addPad(elapsedHours);
};

//to append padding to number
const addPad = (count) => {
  return count <= 9 ? `0${count}` : count;
};
