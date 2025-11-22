export interface HeartRateData {
  time: string;
  bpm: number;
}

export interface Medication {
  id: string;
  name: string;
  time: 'morning' | 'noon' | 'night';
  taken: boolean;
  missed: boolean;
  dosage: string;
}

export interface UserProfile {
  name: string;
  age: number;
  avatar: string;
}

export const mockActivityData = {
  steps: 3200,
  goal: 5000,
  calories: 180,
  distance: 2.1,
};

export const mockHeartRateData: HeartRateData[] = [
  { time: '00:00', bpm: 68 },
  { time: '02:00', bpm: 65 },
  { time: '04:00', bpm: 62 },
  { time: '06:00', bpm: 70 },
  { time: '08:00', bpm: 75 },
  { time: '10:00', bpm: 78 },
  { time: '12:00', bpm: 82 },
  { time: '14:00', bpm: 80 },
  { time: '16:00', bpm: 76 },
  { time: '18:00', bpm: 72 },
  { time: '20:00', bpm: 70 },
  { time: '22:00', bpm: 68 },
];

export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Blood Pressure',
    time: 'morning',
    taken: true,
    missed: false,
    dosage: '10mg',
  },
  {
    id: '2',
    name: 'Vitamin D',
    time: 'morning',
    taken: true,
    missed: false,
    dosage: '1000 IU',
  },
  {
    id: '3',
    name: 'Pain Relief',
    time: 'noon',
    taken: false,
    missed: true,
    dosage: '500mg',
  },
  {
    id: '4',
    name: 'Heart Medication',
    time: 'night',
    taken: false,
    missed: false,
    dosage: '5mg',
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Dr. Sarah Chen',
  age: 42,
  avatar: '👩‍⚕️',
};

export interface WeeklyStepsData {
  day: string;
  steps: number;
  date: string;
}

export const mockWeeklySteps: WeeklyStepsData[] = [
  { day: 'Mon', steps: 4200, date: '2024-01-15' },
  { day: 'Tue', steps: 5800, date: '2024-01-16' },
  { day: 'Wed', steps: 3500, date: '2024-01-17' },
  { day: 'Thu', steps: 6200, date: '2024-01-18' },
  { day: 'Fri', steps: 4800, date: '2024-01-19' },
  { day: 'Sat', steps: 3200, date: '2024-01-20' },
  { day: 'Sun', steps: 2900, date: '2024-01-21' },
];

export interface MovementLog {
  id: string;
  time: string;
  activity: string;
  duration: string;
  calories: number;
}

export const mockMovementLog: MovementLog[] = [
  { id: '1', time: '08:30 AM', activity: 'Morning Walk', duration: '25 min', calories: 120 },
  { id: '2', time: '12:15 PM', activity: 'Light Stretching', duration: '10 min', calories: 35 },
  { id: '3', time: '04:45 PM', activity: 'Garden Work', duration: '30 min', calories: 150 },
  { id: '4', time: '07:00 PM', activity: 'Evening Stroll', duration: '15 min', calories: 80 },
];

export interface HydrationLog {
  id: string;
  time: string;
  amount: number;
}

export const mockHydrationLog: HydrationLog[] = [
  { id: '1', time: '07:00 AM', amount: 1 },
  { id: '2', time: '09:30 AM', amount: 1 },
  { id: '3', time: '12:00 PM', amount: 1 },
  { id: '4', time: '02:45 PM', amount: 1 },
  { id: '5', time: '05:20 PM', amount: 1 },
  { id: '6', time: '08:00 PM', amount: 1 },
];

export interface MedicationAdherence {
  date: string;
  taken: number;
  total: number;
  missed: string[];
}

export const mockMedicationAdherence: MedicationAdherence[] = [
  { date: '2024-01-15', taken: 4, total: 4, missed: [] },
  { date: '2024-01-16', taken: 4, total: 4, missed: [] },
  { date: '2024-01-17', taken: 3, total: 4, missed: ['Pain Relief'] },
  { date: '2024-01-18', taken: 4, total: 4, missed: [] },
  { date: '2024-01-19', taken: 4, total: 4, missed: [] },
  { date: '2024-01-20', taken: 2, total: 4, missed: ['Pain Relief', 'Heart Medication'] },
  { date: '2024-01-21', taken: 4, total: 4, missed: [] },
];

