export const desiredTimes = [
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
