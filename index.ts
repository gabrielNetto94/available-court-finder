import { Api } from "./api";

async function main() {
  const api = new Api();

  const date = "2024-12-04";
  const city_id = 4215;
  const club_id = 442;

  const court = await api.getCourts(date, city_id, club_id);

  court.courts.forEach((court) => {
    const beachVollybal = "beach_volleyball";
    const isVolleyball = court.tags
      .map((tag) => {
        return tag.id;
      })
      .includes(beachVollybal);

    if (isVolleyball) {
      console.log(`${court.name} - ${court.type}`);
    }
  });
}
main();
