import { GoogleGenAI, Type } from "@google/genai";
import type { Destination, WorldPathStep } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const destinationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      city: { type: Type.STRING },
      country: { type: Type.STRING },
      description: {
        type: Type.STRING,
        description: "A brief, compelling description for a slow-traveling nomad.",
      },
      weather: {
        type: Type.STRING,
        description: "Expected temperature range, e.g., '18-26°C'.",
      },
      flightCost: {
        type: Type.STRING,
        enum: ["Low", "Medium", "High", "Varies"],
        description: "Estimated flight cost from the user's location.",
      },
      visaInfo: {
        type: Type.STRING,
        description: "Brief summary of visa requirements for the given passport, e.g., '90 days visa-free'.",
      },
    },
    required: ["city", "country", "description", "weather", "flightCost", "visaInfo"],
  },
};

const worldPathSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      month: {
        type: Type.STRING,
        description: "Month of the year, e.g., 'January'.",
      },
      location: {
        type: Type.STRING,
        description: "City/Region and Country, e.g., 'Medellín, Colombia'.",
      },
      reasoning: {
        type: Type.STRING,
        description: "Why this location is ideal during this month for chasing spring weather.",
      },
      latitude: {
        type: Type.NUMBER,
        description: "The approximate latitude of the location.",
      },
      longitude: {
        type: Type.NUMBER,
        description: "The approximate longitude of the location.",
      },
    },
    required: ["month", "location", "reasoning", "latitude", "longitude"],
  },
};

export const suggestDestinations = async (passport: string, location: string): Promise<Destination[]> => {
  const prompt = `
    You are an expert travel advisor for digital nomads who prefer slow travel (spending weeks or months in one place).
    A user with a ${passport} passport is currently located in ${location}.
    
    Suggest 3 unique travel destinations that meet the following criteria:
    1.  **Perpetual Spring Weather**: The destination should have temperatures ideally between 18°C and 28°C in the next 2-3 months.
    2.  **Slow Travel Friendly**: Good for a stay of several weeks or months (e.g., affordable, good infrastructure, interesting culture).
    3.  **Visa Requirements**: Consider standard tourist visa and digital nomad visa options for a ${passport} passport holder. The destination should be suitable for a stay of at least one month, ideally longer, without complex visa runs. Mention the typical visa duration (e.g., '90 days visa-free', '30 days on arrival').
    4.  **Flight Cost**: Estimate the general cost of flights from their current region.
    
    Provide your answer in a structured JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: destinationSchema,
    },
  });

  try {
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as Destination[];
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    console.error("Raw response text:", response.text);
    throw new Error("Could not parse destination suggestions from the AI.");
  }
};

export const generateWorldPath = async (): Promise<WorldPathStep[]> => {
    const prompt = `
      Create a 12-month, around-the-world itinerary for a slow-traveling nomad.
      The primary goal is to "chase the spring," meaning the traveler should always be in a location with ideal spring-like temperatures, never exceeding 28°C and preferably above 15°C.

      The path should:
      - Be divided into 12 logical steps, with one destination for each month.
      - Follow a logical geographical progression to minimize backtracking and excessively long flights.
      - Start in January.
      - Briefly explain why each location is a great choice for that time of year, focusing on the weather and suitability for slow travel.
      - For each destination, provide its approximate latitude and longitude.

      Provide your answer in a structured JSON format.
    `;
  
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: worldPathSchema,
      },
    });
  
    try {
      const jsonText = response.text.trim();
      const result = JSON.parse(jsonText);
      return result as WorldPathStep[];
    } catch (e) {
      console.error("Failed to parse Gemini response for world path:", e);
      console.error("Raw response text:", response.text);
      throw new Error("Could not parse the world path from the AI.");
    }
  };