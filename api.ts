import axios from "axios";
import { ScheduleDay } from "./interface";

const url = "https://api.gripo.com.br/app/v1/schedule/available";
export class Api {
  async getCourts(date: string, city_id: number, club_id: number) {
    const resp = await axios.post<ScheduleDay>(url, {
      date,
      city_id,
      club_id,
    });

    return resp.data;
  }
}
