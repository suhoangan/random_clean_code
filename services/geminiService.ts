import { GoogleGenAI } from "@google/genai";
import { CleanCodeExample } from "../types";

export const explainCodeDifference = async (example: CleanCodeExample): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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