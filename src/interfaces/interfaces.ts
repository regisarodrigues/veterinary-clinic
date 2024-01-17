export interface IAlert {
  type: string;
  message: string;
}

export interface IPatient {
  id: string | null;
  animal_name: string;
  tutor_name: string;
  email: string;
  date: string;
  symptoms: string;
}
