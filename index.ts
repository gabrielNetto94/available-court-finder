import { Api } from "./api";
import { BASE_URL, CITY, clubIds, SPORT, desiredTimes } from "./consts";
import { AvaiableClub, AvaiableCourt } from "./interface";

async function main() {
  const api = new Api(BASE_URL);
  const avaiableCLubs: AvaiableClub[] = [];
  const currentDay = new Date().toISOString().split("T")[0];

  const clubs = await api.getClubs(CITY.SANTA_MARIA);

  for (const id of clubIds) {
    let clubName = clubs.find((club) => club.id == id)?.name || "";

    const courts = await api.getCourts(currentDay, CITY.SANTA_MARIA, id);

    let availableCourts: AvaiableCourt[] = [];

    for (const court of courts.courts) {
      const isVolleyball = court.tags
        .map((tag) => {
          return tag.id;
        })
        .includes(SPORT.BEACH_VOLLEYBALL);

      if (!isVolleyball) {
        continue;
      }

      let avaiableHours: string[] = [];
      court.hours.forEach((item) => {
        if (desiredTimes.includes(item.hour) && item.available) {
          avaiableHours.push(item.hour.substring(0, 5));
        }
      });

      if (avaiableHours.length < 1) {
        continue;
      }
      availableCourts.push({
        name: court.name,
        avaiableHours,
      });
    }

    if (availableCourts.length < 1) {
      continue;
    }

    avaiableCLubs.push({
      name: clubName,
      courts: availableCourts,
    });
  }

  avaiableCLubs.forEach((club) => {
    console.log(club.name);
    club.courts.forEach((court) => {
      console.log(court.name);
      court.avaiableHours.forEach((item) => console.log(item));
    });
  });
}

main();
