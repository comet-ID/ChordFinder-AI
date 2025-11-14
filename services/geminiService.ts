
import { GoogleGenAI, Type } from "@google/genai";
import type { SongData } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const songSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The official title of the song."
    },
    artist: {
      type: Type.STRING,
      description: "The name of the artist or band."
    },
    content: {
      type: Type.ARRAY,
      description: "An array of song lines, each containing chords and lyrics.",
      items: {
        type: Type.OBJECT,
        properties: {
          chords: {
            type: Type.STRING,
            description: "A string of chords for the lyric line below. Can be empty. Chords should be space-separated and aligned with the lyrics."
          },
          lyrics: {
            type: Type.STRING,
            description: "A string containing the lyrics for one line of the song."
          },
        },
        required: ["chords", "lyrics"],
      },
    },
  },
  required: ["title", "artist", "content"],
};


export async function findSongChords(query: string): Promise<SongData | null> {
  try {
    const prompt = `
      You are an expert musician and guitarist. Your task is to provide the guitar chords for a given song.
      Please find the chords for the song: "${query}".
      
      Format the output strictly as a JSON object that matches the provided schema.
      - Ensure chords are placed on their own line, directly above the corresponding lyrics.
      - If a line has no chords, the 'chords' property should be an empty string.
      - Pay close attention to chord placement to ensure they align with the words in the lyrics.
      - Include common sections like [Intro], [Verse], [Chorus], [Bridge], [Outro] in the lyrics lines for context.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: songSchema,
      },
    });
    
    const jsonString = response.text.trim();
    const songData: SongData = JSON.parse(jsonString);
    
    return songData;

  } catch (error) {
    console.error("Error fetching song chords from Gemini API:", error);
    return null;
  }
}
