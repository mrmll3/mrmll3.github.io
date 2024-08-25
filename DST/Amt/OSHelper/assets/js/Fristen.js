'use strict'

import { initNav } from '../nav/navHelper.js';

// region: DOM elements
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

  // Calculate the new date
  let newDate = new Date(userDate);

  if (years != 0) { newDate = addYearsToDate(newDate, years) };
  if (months != 0) { newDate = addMonthToDate(newDate, months) };
  if (weeks != 0) { newDate = addWeeksToDate(newDate, weeks) };
  if (days != 0) { newDate = addDaysToDate(newDate, days) };

  dateOutput.innerHTML = newDate.toLocaleDateString();
}

// init with date from today
window.onload = (event) => {
  formDateDif.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    calculateNewDate();
  });

  dateInput.addEventListener("focus", (event) => {event.target.select();});
  yearsInput.addEventListener("focus", (event) => {event.target.select();});
  monthsInput.addEventListener("focus", (event) => {event.target.select();});
  weeksInput.addEventListener("focus", (event) => {event.target.select();});
  daysInput.addEventListener("focus", (event) => {event.target.select();});

  
  dateInput.value = new Date().toISOString().split("T")[0];
  dateInput.focus();
  initNav();
}

// region: date functions

function addYearsToDate(date, years) {
  let newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

function addMonthToDate(date, months) {
  // TODO: Implementierung von Kalendermonaten
  // 
  let newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

function addWeeksToDate(date, weeks) {
  let newDate = addDaysToDate(date, weeks * 7)
  return newDate;
}

function addDaysToDate(date, days) {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
