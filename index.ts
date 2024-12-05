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

async function main() {
  const api = new Api();

  const date = "2024-12-05";
  const city_id = 4215;
  const club_id = 442;
  const beachVollybal = "beach_volleyball";

  const courts = await api.getCourts(date, city_id, club_id);

  for (const court of courts.courts) {
    const isVolleyball = court.tags
      .map((tag) => {
        return tag.id;
      })
      .includes(beachVollybal);

    if (!isVolleyball) {
      continue;
    }

    console.log(`${court.name} - ${court.type}`);

    for (const hour of court.hours) {
      if (desiredTimes.includes(hour.hour) && hour.available) {
        console.log(hour.hour);
      }
    }
  }
}

main();
