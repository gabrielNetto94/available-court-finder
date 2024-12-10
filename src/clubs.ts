import { Api } from "./api";
import {
  BASE_URL,
  clubIds,
  CITIES,
  CLUB_NAME_MAP,
  SPORTS,
  daysOfWeek,
  WEEKDAYS,
  gameTime,
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

    const { dayOfWeek } = getDesiredTimesByDate(courts.date);

    availableClubs.push({
      name: getClubName(id) + " - " + dayOfWeek,
      date,
      courts: availableCourts,
    });
  }
  return availableClubs;
}

function getClubName(clubId: number): string {
  return CLUB_NAME_MAP[clubId];
}

export function getAvailableCourts(scheduleDay: ScheduleDay): availableCourt[] {
  let availableCourts: availableCourt[] = [];

  const { desiredTimes } = getDesiredTimesByDate(scheduleDay.date);

  for (const court of scheduleDay.courts) {
    if (!court.tags.some((tag) => tag.id === SPORTS.BEACH_VOLLEYBALL)) continue;

    let availableHours: string[] = [];
    for (let i = 0; i < court.hours.length; i++) {
      const currentHour = court.hours[i];

      // Check if the current hour matches the desired times and is available
      if (desiredTimes.includes(currentHour.hour) && currentHour.available) {
        const isAllTimesAvailable = gameTime.every((offset) => {
          const nextHour = court.hours.at(i + offset);
          return nextHour?.available && desiredTimes.includes(nextHour.hour);
        });

        if (isAllTimesAvailable) {
          const start = formatHour(currentHour.start_hour);
          const end = formatHour(court.hours[i + gameTime.length - 1].end_hour);

          availableHours.push(`${start} - ${end}`);
        }
      }
    }

    if (availableHours.length < gameTime.length) continue;

    availableCourts.push({
      name: court.name,
      availableHours,
    });
  }

  return availableCourts.length < 1 ? [] : availableCourts;
}
function formatHour(hour: string) {
  return hour.substring(0, 5);
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

function getDesiredTimesByDate(dateString: string): {
  desiredTimes: string[];
  dayOfWeek: string;
} {
  const date = new Date(dateString.replace("-", "/"));

  const dayOfWeek = date.getDay() as WEEKDAYS;

  return {
    desiredTimes: daysOfWeek[dayOfWeek],
    dayOfWeek: WEEKDAYS[dayOfWeek],
  };
}
