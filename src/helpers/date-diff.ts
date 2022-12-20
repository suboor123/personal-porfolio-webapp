type DiffFilter = {
  onlyYear?: boolean;
  onlyMonth?: boolean;
  includeAll?: boolean;
  includeMonthAndYear?: boolean
};

export const dateDiff = (start: Date, to: Date, filters?: DiffFilter) => {
  var z = new Date((start as any) - (to as any));
  var epoch = new Date("1970-01-01 00:00:00-0600");
  var diff_years = z.getFullYear() - epoch.getFullYear();
  var diff_month = z.getMonth() - epoch.getMonth();
  var diff_days = z.getDate() - epoch.getDate();
  var diff_hours = z.getHours() - epoch.getHours();
  var diff_minutes = z.getMinutes() - epoch.getMinutes();

  if(filters && filters.onlyYear) {
    return `${Math.abs(diff_years)}`;
  }

  if (filters && filters.includeMonthAndYear) {
    return `${appendTwoDigits(diff_years)} years ${appendTwoDigits(
        diff_month
      )} months`;
  }

  if (filters && filters.includeAll) {
    return `${appendTwoDigits(diff_years)} years ${appendTwoDigits(
      diff_month
    )} months ${appendTwoDigits(diff_days)} days ${appendTwoDigits(
      diff_hours
    )} hours ${appendTwoDigits(diff_minutes)} minutes`;
  }

  return `${appendTwoDigits(diff_years)} years ${appendTwoDigits(
    diff_month
  )} months and ${appendTwoDigits(diff_days)} days`;
};

export const appendTwoDigits = (number: number) => {
  if (number < 0) {
    number = Math.abs(number);
  }
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};
