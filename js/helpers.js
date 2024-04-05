export function getLeapYears(endYear = new Date().getFullYear()) {
  const leapYears = [];

  //Creating an array with all the leap years, starting with 1900
  for (let year = 1900; year <= endYear; year++) {
    if (year % 4 === 0) leapYears.push(year);
  }

  return leapYears;
}
export function calculateAge(dateOfBirth) {
  // Check if valid date object is provided
  if (!dateOfBirth instanceof Date) return null;

  // Get the current date
  const today = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = today.getTime() - dateOfBirth.getTime();

  // Convert the milliseconds to years, months, days
  const ageDate = new Date(diffInMs);

  // Get the full year (ignoring the exact year difference)
  const ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);

  // Calculate months. This might be inaccurate for birthdays after Feb 28th due to leap years.
  const ageMonths = ageDate.getUTCMonth();

  // Calculate days - offset by 2, based on comparison with other age calculators
  const ageDays = ageDate.getUTCDate() - 2;

  return { years: ageYears, months: ageMonths, days: ageDays };
}
