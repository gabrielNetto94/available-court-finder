export interface AvailableCourt {
  courtName: string;
  avaiableHours: AvailableHour[];
}

export interface AvailableHour {
  startTime: string;
  endTime: string;
}

export interface ScheduleDay {
  date: string;
  schedule_notes: string;
  limit_date_schedule: null | string;
  courts: Court[];
}

export interface Court {
  id: number;
  name: string;
  hours: Hour[];
  bg_color: string;
  type: string;
  place: string;
  tags: Tag[];
}

export interface Hour {
  date: string;
  hour: string;
  start_hour: string;
  end_hour: string;
  interval: number;
  available: boolean;
  unavailable: boolean;
  available_to_schedule: boolean;
  available_to_lesson: boolean;
  type: string;
  hidden: boolean;
  coach_restrict: boolean;
  schedule_grid_id: number;
  court: string;
  court_id: number;
  schedule: {};
  client: null;
  plans: [];
  members_schedule: boolean;
  price: number;
  show_client_name: number;
  payment_enabled: boolean;
  notes: string;
  unavailable_details: {
    notes: string;
  };
  hash: string;
  sport: string;
  sports: Sport[];
}

export interface Sport {
  key: string;
  label: string;
}

export interface Tag {
  id: string;
  name: string;
}
