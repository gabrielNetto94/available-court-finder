import { Api } from "./api";
import {
  BASE_URL,
  clubIds,
  CITIES,
  CLUB_NAME_MAP,
  SPORTS,
  desiredTimes,
} from "./consts";
import { availableClub, availableCourt, ScheduleDay } from "./interface";

export async function getAvailableClubs(date: string) {
  const api = new Api(BASE_URL);

  const availableClubs: availableClub[] = [];
  for (const id of clubIds) {
    const courts = await api.getCourts(date, CITIES.SANTA_MARIA, id);

    const availableCourts = getAvailableCourts(courts);

    if (availableCourts.length == 0) {
      continue;
    }

    availableClubs.push({
      name: getClubName(id),
      date,
      courts: availableCourts,
    });
  }
  return availableClubs;
}

function getClubName(clubId: number): string {
  return CLUB_NAME_MAP[clubId];
}

export function getAvailableCourts(courts: ScheduleDay): availableCourt[] {
  let availableCourts: availableCourt[] = [];

  for (const court of courts.courts) {
    const isVolleyball = court.tags
      .map((tag) => {
        return tag.id;
      })
      .includes(SPORTS.BEACH_VOLLEYBALL);

    if (!isVolleyball) {
      continue;
    }

    let availableHours: string[] = [];
    court.hours.forEach((item) => {
      if (desiredTimes.includes(item.hour) && item.available) {
        const start = item.start_hour.substring(0, 5);
        const end = item.end_hour.substring(0, 5);

        availableHours.push(start + " - " + end);
      }
    });

    if (availableHours.length < 2) {
      continue;
    }
    availableCourts.push({
      name: court.name,
      availableHours,
    });
  }

  return availableCourts.length < 1 ? [] : availableCourts;
}

export function printAvailableClubs(availableCLubs: availableClub[]) {
  availableCLubs.forEach((club) => {
    console.log(club.name + " - " + club.date);
    club.courts.forEach((court) => {
      console.log(court.name);
      court.availableHours.forEach((item) => console.log(item));
    });
  });
}
