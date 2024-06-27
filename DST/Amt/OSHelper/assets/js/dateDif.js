'use strict'

import { toggleNav, initNav } from './navHelper.js';


// Define constants for DOM elements
const formDateDif = document.getElementById("formDateDif");
const dateInput = document.querySelector("#date");
const yearsInput = document.querySelector("#years");
const monthsInput = document.querySelector("#months");
const weeksInput = document.querySelector("#weeks");
const daysInput = document.querySelector("#days");
const calculateButton = document.getElementById("calculate-button");
const dateOutput = document.getElementById("result");

// Define function to calculate date that is a certain number of years, months, weeks, and days away from input date
function calculateNewDate() {
  // Get the user's input date
  const userDate = new Date(dateInput.value);

  // Get the number of years, months, weeks, and days from the input fields
  const years = parseInt(yearsInput.value);
  const months = parseInt(monthsInput.value);
  const weeks = parseInt(weeksInput.value);
  const days = parseInt(daysInput.value);

  // Calculate the total number of days from the input values
  const totalDays = days + weeks * 7 + months * 30 + years * 365;

  // Calculate the new date
  const newDate = new Date(userDate.getTime() + totalDays * 24 * 60 * 60 * 1000);

  // Update the input field with the new date
  // dateInput.value = newDate.toISOString().substring(0, 10);
  dateOutput.innerHTML = newDate;
}

// Add event listener to the calculate button
// calculateButton.addEventListener("click", calculateNewDate);

// init with date from today
window.onload = (event) => {
  formDateDif.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    calculateNewDate();
    initNav();

  });
  console.log("reload");
  dateInput.value = new Date().toISOString().split("T")[0];
  dateInput.focus();
}