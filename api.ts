import axios from "axios";
import { Court, ScheduleDay } from "./interface";
import mock from "./mock.json";

const BASE_URL = "https://api.gripo.com.br/app/v1";
export class Api {
  async getCourts(date: string, city_id: number, club_id: number) {
    // const scheduleDay: ScheduleDay = JSON.parse(JSON.stringify(mock));
    // return scheduleDay;

    const url = BASE_URL + "/schedule/available";
    const resp = await axios.post<ScheduleDay>(url, {
      date,
      city_id,
      club_id,
    });

    return resp.data;
  }

  async getClubs(city_id: number) {
    const url = BASE_URL + "/club/available";

    const resp = await axios.post<Court[]>(url, {
      city_id,
    });

    return resp.data;
  }
}
