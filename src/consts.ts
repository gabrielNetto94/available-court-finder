export const weekendTimes = [
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
];

export const weekdaysTimes = [
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
  "21:00:00",
  "21:30:00",
  "22:00:00",
];

export enum HOUR {
  ONE = 2,
  ONE_AND_HALF = 3,
  TWO = 3,
  TWO_AND_HALF = 4,
}
export enum WEEKDAYS {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const daysOfWeek: Record<WEEKDAYS, string[]> = {
  [WEEKDAYS.Sunday]: weekendTimes,
  [WEEKDAYS.Monday]: weekdaysTimes,
  [WEEKDAYS.Tuesday]: weekdaysTimes,
  [WEEKDAYS.Wednesday]: weekdaysTimes,
  [WEEKDAYS.Thursday]: weekdaysTimes,
  [WEEKDAYS.Friday]: weekdaysTimes,
  [WEEKDAYS.Saturday]: weekendTimes,
};

export const enum CLUBS {
  SUMMER_BEACH = 554,
  PIER_158 = 442,
}

export const CLUB_NAME_MAP: Record<number, string> = {
  [CLUBS.SUMMER_BEACH]: "Summer Beach",
  [CLUBS.PIER_158]: "Pier 158",
};

export const clubIds = [CLUBS.PIER_158, CLUBS.SUMMER_BEACH];

export const enum CITIES {
  SANTA_MARIA = 4215,
}

export const enum SPORTS {
  BEACH_VOLLEYBALL = "beach_volleyball",
}

export const BASE_URL = "https://api.gripo.com.br/app/v1";
