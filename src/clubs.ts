import { Api } from "./api";
import {
  BASE_URL,
  clubIds,
  CITIES,
  CLUB_NAME_MAP,
  SPORTS,
  daysOfWeek,
  WEEKDAYS,
  HOUR,
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
    const isVolleyball = court.tags
      .map((tag) => {
        return tag.id;
      })
      .includes(SPORTS.BEACH_VOLLEYBALL);

    if (!isVolleyball) {
      continue;
    }

    let availableHours: string[] = [];

    // for (const [index, currentHour] of court.hours.entries()) {
    //   if (desiredTimes.includes(currentHour.hour) && currentHour.available) {

    //     const desiredIndex = desiredTimes.findIndex(
    //       (time) => currentHour.hour === time
    //     );

    //     const nextTime = desiredTimes[desiredIndex + 1];
    //     const nextHour = court.hours[index + 1];

    //     // console.log("current hour", currentHour.hour);
    //     // console.log("next hour", nextHour.hour);
    //     // console.log(nextHour.hour == nextTime);

    //     if (nextHour.hour == nextTime && nextHour.available) {
    //       const start = currentHour.start_hour.substring(0, 5);

    //       // const end = item.end_hour.substring(0, 5);
    //       // const nextStart = nextHour.start_hour.substring(0, 5);

    //       const nextEnd = nextHour.end_hour.substring(0, 5);

    //       const concat = start + " - " + nextEnd;

    //       console.log(concat);
    //       availableHours.push(concat);
    //       // availableHours.push(nextStart + " - " + nextEnd);
    //     }
    //   }
    // }

    for (let i = 0; i < court.hours.length; i++) {
      // e a hora start que eu quero? ex: 14:00
      if (
        desiredTimes.includes(court.hours[i].hour) &&
        court.hours[i].available
      ) {
        const pesos = Array.from({ length: HOUR.ONE }).map((_, index) => {
          return index;
        });

        const itsAllAvailable = pesos.every(
          (peso) => court.hours.at(i + peso)?.available
        );

        if (itsAllAvailable) {
          const start = court.hours[i].start_hour.substring(0, 5);
          const end = court.hours[i + pesos.length - 1].end_hour.substring(
            0,
            5
          );
          availableHours.push(start + " - " + end);
        }
      } else continue;
    }

    // court.hours.forEach((item) => {
    //   if (desiredTimes.includes(item.hour) && item.available) {
    //     const index = desiredTimes.findIndex((time) => {
    //       return item.hour === time;
    //     });

    //     // const nextTime = desiredTimes[index + 1];

    //     const start = item.start_hour.substring(0, 5);
    //     const end = item.end_hour.substring(0, 5);

    //     availableHours.push(start + " - " + end);
    //   }
    // });

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
