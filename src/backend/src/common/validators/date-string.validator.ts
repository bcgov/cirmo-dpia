import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';

// Custom Date String Validator for the format - YYYY/MM/DD
// Reason for custom - @ISO8601/@DateString - validates for hyphen(-) separated dates; which may include Time as well. This would have required additional Transformation
@ValidatorConstraint({ name: 'dateString', async: false })
export class DateStringValidator implements ValidatorConstraintInterface {
  validate(dateString: string) {
    if (!dateString) return false;

    // First check for the pattern
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) return false;

    // Parse the date parts to integers
    const parts = dateString.split('/');
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  defaultMessage({ property }) {
    // here you can provide default error message if validation failed
    return `${property} must be a valid date in YYYY/MM/DD format `;
  }
}
