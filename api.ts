import axios from "axios";
import { ScheduleDay } from "./interface";
import mock from "./mock.json";

const url = "https://api.gripo.com.br/app/v1/schedule/available";
export class Api {
  async getCourts(date: string, city_id: number, club_id: number) {
    const scheduleDay: ScheduleDay = JSON.parse(JSON.stringify(mock));
    return scheduleDay;

    const resp = await axios.post<ScheduleDay>(url, {
      date,
      city_id,
      club_id,
    });

    return resp.data;
  }
}
