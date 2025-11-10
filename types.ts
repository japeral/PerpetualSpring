export interface Destination {
  city: string;
  country: string;
  description: string;
  weather: string;
  flightCost: 'Low' | 'Medium' | 'High' | 'Varies';
  visaInfo: string;
}

export interface WorldPathStep {
  month: string;
  location: string;
  reasoning: string;
  latitude: number;
  longitude: number;
}
