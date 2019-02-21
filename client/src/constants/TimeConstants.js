export const TIME_WEEK = "Week";
export const TIME_MONTH = "Month";
export const TIME_3_MONTHS = "3 Months";
export const TIME_6_MONTHS = "6 Months";
export const TIME_LAST_VISIT = "Last Visit";

let date = new Date();
date.setDate(date.getDate() - 7);
export const TIME_WEEK_VALUE = date.getTime();

date.setDate(date.getDate() - 30);
export const TIME_MONTH_VALUE = date.getTime();

date.setDate(date.getDate() - 90);
export const TIME_3_MONTHS_VALUE = date.getTime();

date.setDate(date.getDate() - 180);
export const TIME_6_MONTHS_VALUE = date.getTime();

export const TIME_LAST_VISIT_VALUE = 0;

