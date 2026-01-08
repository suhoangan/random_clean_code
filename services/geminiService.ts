import { GoogleGenAI } from "@google/genai";
import { CleanCodeExample } from "../types";

const apiKey = process.env.API_KEY || '';

// Safely initialize API client only if key exists, otherwise we handle the error at call time
const getAiClient = () => {
  if (!apiKey) {
    console.warn("API_KEY is not set in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const explainCodeDifference = async (example: CleanCodeExample): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY to use AI features.");
  }

  const prompt = `
    You are a Clean Code expert. 
    Analyze the following two code snippets.
    
    Context: ${example.title} (${example.category})
    Principle: ${example.principle}
    
    BAD EXAMPLE:
    ${example.bad.code}
    
    GOOD EXAMPLE:
    ${example.good.code}
    
    Explain concisely (in 2-3 short paragraphs) why the Good Example is better. 
    Focus on maintainability, readability, and potential bugs. 
    Do not repeat the code, just explain the reasoning.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No explanation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch explanation from Gemini.");
  }
};