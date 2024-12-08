export interface AvailableCourt {
  courtName: string;
  availableHours: AvailableHour[];
}

export interface AvailableHour {
  startTime: string;
  endTime: string;
}

export interface ScheduleDay {
  date: string;

  courts: Court[];
}

export interface Court {
  id: number;
  name: string;
  hours: Hour[];

  type: string;

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

  sports: Sport[];
}

export interface Sport {
  key: string;
  label: string;
}

export interface Tag {
  id: string;
}

export interface availableCourt {
  name: string;
  availableHours: string[];
}
export interface availableClub {
  name: string;
  date: string;
  courts: availableCourt[];
}
