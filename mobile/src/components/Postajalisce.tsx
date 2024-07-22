export interface Bike {
  _id: string;
  serijska_stevilka: string;
}

export interface Postajalisce {
  _id: string;
  ime: string;
  latitude: number;
  longitude: number;
  kolesaArray: Bike[];
}