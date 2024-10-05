"use strict";

var startButton = document.getElementById("start-btn");
var stopButton = document.getElementById("stop-btn");
var resetButton = document.getElementById("reset-btn");

var hourNode = document.getElementById("time-hour");
var minNode = document.getElementById("time-min");
var secNode = document.getElementById("time-sec");

let intervalId;
let isRunning = false;
let elapsedSeconds = 0;
let elapsedMinutes = 0;
let elapsedHours = 0;

const startWatch = () => {
  clearInterval(intervalId);
  if (isRunning) {
    //pause the timer
    startButton.innerText = "Resume";
  } else {
    //start the timer
    intervalId = setInterval(function () {
      elapsedSeconds++;
      updateHtml(elapsedSeconds);
    }, 1000);
    startButton.innerText = "Pause";
  }
  isRunning = !isRunning;
};

const stopWatch = () => {
  if (!intervalId) return;
  console.log(
    `Last Counted Time was - ${elapsedHours} : ${elapsedMinutes} : ${elapsedSeconds}`
  );
  clearInterval(intervalId);
  elapsedSeconds = 0;
  elapsedMinutes = 0;
  elapsedHours = 0;
  startButton.innerText = "Start";
  isRunning = false;
};

const resetWatch = () => {
  clearInterval(intervalId);
  elapsedSeconds = 0;
  elapsedMinutes = 0;
  elapsedHours = 0;
  updateHtml(elapsedSeconds);
  startButton.innerText = "Start";
  isRunning = false;
};

const updateHtml = (currentSeconds) => {
  if (currentSeconds == 60) {
    elapsedMinutes++;
    elapsedSeconds = 0;
  }
  if (elapsedMinutes == 60) {
    elapsedHours++;
    elapsedMinutes = 0;
  }

  secNode.innerHTML = addPad(elapsedSeconds);
  minNode.innerHTML = addPad(elapsedMinutes);
  hourNode.innerHTML = addPad(elapsedHours);
};

const addPad = (count) => {
  return count <= 9 ? `0${count}` : count;
};
