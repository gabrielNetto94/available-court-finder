import { getAvailableCourts } from "../index";
import { ScheduleDay } from "./interface";

describe("getAvailableCourts", () => {
  it("should return empty array for empty courts list", () => {
    const courts: ScheduleDay = {
      courts: [],
      date: "",
    };
    expect(getAvailableCourts(courts)).toEqual([]);
  });

  it("should return empty array for no volleyball courts", () => {
    const courts: ScheduleDay = {
      courts: [
        {
          name: "Tennis Court",
          tags: [
            {
              id: "tennis",
            },
          ],
          hours: [],
          id: 0,
          type: "",
        },
      ],
      date: "",
    };
    expect(getAvailableCourts(courts)).toEqual([]);
  });
});
