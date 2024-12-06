import { Api } from "./api";

const desiredTimes = [
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

const clubIds = [442, 554];
const BASE_URL = "https://api.gripo.com.br/app/v1";

async function main() {
  const api = new Api(BASE_URL);

  const date = "2024-12-05";
  const city_id = 4215;

  const beachVollybal = "beach_volleyball";

  const clubs = await api.getClubs(city_id);

  for (const id of clubIds) {
    let clubName;
    for (const club of clubs) {
      if (club.id === id) {
        clubName = club.name;
      }
    }

    const courts = await api.getCourts(date, city_id, id);

    console.log(clubName);

    for (const court of courts.courts) {
      const isVolleyball = court.tags
        .map((tag) => {
          return tag.id;
        })
        .includes(beachVollybal);

      if (!isVolleyball) {
        continue;
      }

      console.log(court.name);

      for (const hour of court.hours) {
        if (desiredTimes.includes(hour.hour) && hour.available) {
          console.log(hour.hour.substring(0, 5));
        }
      }
    }

    console.log("\n");
  }
}

main();
