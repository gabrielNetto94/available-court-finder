import axios from "axios";
import { Court, ScheduleDay } from "./interface";
import mock from "../mock.json";

export class Api {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async getCourts(date: string, city_id: number, club_id: number) {
    const scheduleDay: ScheduleDay = JSON.parse(JSON.stringify(mock));
    return scheduleDay;

    const url = this._baseUrl + "/schedule/available";
    const resp = await axios.post<ScheduleDay>(url, {
      date,
      city_id,
      club_id,
    });

    return resp.data;
  }

  async getClubs(city_id: number) {
    const url = this._baseUrl + "/club/available";

    const resp = await axios.post<Court[]>(url, {
      city_id,
    });

    return resp.data;
  }

  //@todo finalizar
  async login(city_id: number) {
    const url = this._baseUrl + "/auth/login";

    const resp = await axios.post<Court[]>(url, {
      login: "email@email",
      password: "password",
      device: "d520c7a8-421b-4563-b955-f5abc56b97ec",
    });

    return resp.data;
  }

  //@todo finalizar
  async scheduleCourt(date: string, city_id: number, club_id: number) {
    const url = this._baseUrl + "/schedule/confirm";
    const resp = await axios.post(url, {
      club_id: 554,
      restricted_hash: null,
      court_id: 1,
      coach_id: null,
      date: "2024-12-05",
      start_hour: "17:30:00",
      start_datetime: "2024-12-05 17:30:00",
      end_hour: "18:00:00",
      end_datetime: "2024-12-05 18:00:00",
      notes: "",
      sport: "beach_volleyball",
    });
  }
}
