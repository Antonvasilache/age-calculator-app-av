import { calculateAge, getLeapYears } from "./helpers.js";

const birthdayInput = document.querySelectorAll(".birthday-form-input");
const birthdayLabels = document.querySelectorAll(".birthday-form-label");
const birthdayForm = document.querySelector(".birthday-form");
const ageDisplayYears = document.querySelector(".age-years");
const ageDisplayMonths = document.querySelector(".age-months");
const ageDisplayDays = document.querySelector(".age-days");

//Generating the leap years array
const leapYears = getLeapYears();

birthdayForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //This will store the key-value pair of day, month, year and their values
  let inputValues = [];

  birthdayInput.forEach((input) => {
    //Handling the error scenario for empty input values
    if (input.value === "") {
      birthdayLabels.forEach((label) => {
        if (label.htmlFor === input.id) {
          label.classList.toggle("label-error");
          input.classList.toggle("input-error");

          const emptyForm = document.querySelector(`.${input.id}-form`);
          const formError = emptyForm.querySelector(".birthday-form-error");

          formError.classList.toggle("visible");
        }
      });
    }

    //Generating the input values array
    inputValues.push([input.value, input.id]);
  });

  //Converting each value to number type
  const birthYear = Number(inputValues[2][0]);
  const birthMonth = Number(inputValues[1][0]);
  const birthDay = Number(inputValues[0][0]);

  //Declaring flags for the validity of each value
  let invalidYear = false;
  let invalidMonth = false;
  let invalidDay = false;

  //Creating an array for the 30 day month values, accounting for both spellings
  const months30Days = ["4", "04", "6", "06", "9", "09", "11"];

  //Looping through the entered values to check for validity
  inputValues.forEach((input) => {
    const inputType = input[1];
    const inputDayMonthYear = Number(input[0]);
    const dateError = document.querySelector(
      `.birthday-form-error-${inputType}`
    );
    const inputError = document.getElementById(`${inputType}`);
    const isLeapYear = leapYears.includes(Number(inputValues[2][0]));
    const is30DayMonth = months30Days.includes(inputValues[1][0]);

    //Checking validity for the day input
    if (
      inputType === "day" &&
      (inputDayMonthYear < 1 ||
        inputDayMonthYear > 31 ||
        (is30DayMonth && inputDayMonthYear > 30) ||
        ((inputValues[1][0] === "2" || inputValues[1][0] === "02") &&
          isLeapYear &&
          inputDayMonthYear > 29) ||
        ((inputValues[1][0] === "2" || inputValues[1][0] === "02") &&
          !isLeapYear &&
          inputDayMonthYear > 28))
    ) {
      //If invalid, toggle the error styles and set the invalid flag to true
      birthdayLabels.forEach((label) => {
        if (label.htmlFor === inputType) {
          label.classList.toggle("label-error");
          inputError.classList.toggle("input-error");
          dateError.classList.toggle("visible");
          invalidDay = true;
        }
      });
    }

    //Checking validity for the month input
    if (
      inputType === "month" &&
      (inputDayMonthYear > 12 || inputDayMonthYear < 1)
    ) {
      //If invalid, toggle the error styles and set the invalid flag to true
      birthdayLabels.forEach((label) => {
        if (label.htmlFor === inputType) {
          label.classList.toggle("label-error");
          inputError.classList.toggle("input-error");
          dateError.classList.toggle("visible");
          invalidMonth = true;
        }
      });
    }

    //Checking validity for the month input
    if (
      inputType === "year" &&
      (inputDayMonthYear > new Date().getFullYear() || inputDayMonthYear < 1900)
    ) {
      //If invalid, toggle the error styles and set the invalid flag to true
      birthdayLabels.forEach((label) => {
        if (label.htmlFor === inputType) {
          label.classList.toggle("label-error");
          inputError.classList.toggle("input-error");
          dateError.classList.toggle("visible");
          invalidYear = true;
        }
      });
    }
  });

  //Generating the birth date as a Date object, offsetting month by 1, due to the 0 indexing
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const age = calculateAge(birthDate);

  //If all invalid flags are false, remove the error styles
  if (!invalidYear && !invalidMonth && !invalidDay) {
    birthdayInput.forEach((input) => {
      if (input.classList.contains("input-error")) {
        input.classList.remove("input-error");
      }

      const error = document.querySelector(`.birthday-form-error-${input.id}`);
      if (error.classList.contains("visible")) {
        error.classList.remove("visible");
      }
    });

    birthdayLabels.forEach((label) => {
      if (label.classList.contains("label-error")) {
        label.classList.remove("label-error");
      }
    });

    ageDisplayYears.style.letterSpacing = 0;
    ageDisplayMonths.style.letterSpacing = 0;
    ageDisplayDays.style.letterSpacing = 0;

    //Display the computed values
    ageDisplayYears.textContent = age.years;
    ageDisplayMonths.textContent = age.months;
    ageDisplayDays.textContent = age.days;
  }
});
