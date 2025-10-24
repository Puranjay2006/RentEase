
import { GoogleGenAI, Type } from "@google/genai";
import { Tenant, AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    score: {
      type: Type.INTEGER,
      description: "A trust score from 0 to 100, where 100 is the highest trust.",
    },
    reasoning: {
      type: Type.STRING,
      description: "A concise, bullet-pointed summary explaining the score, covering positive and negative factors.",
    },
  },
  required: ["score", "reasoning"],
};

function formatTenantDataForPrompt(tenant: Tenant): string {
  return `
    - Name: ${tenant.name}
    - Age: ${tenant.age}
    - Monthly Income: $${tenant.monthlyIncome}
    - Credit Score: ${tenant.creditScore}
    - Employment History: ${tenant.employmentHistory}
    - Rental History: ${tenant.rentalHistory}
    - References: ${tenant.references}
  `;
}

export const analyzeTenantData = async (tenant: Tenant): Promise<AnalysisResult> => {
  const tenantDataString = formatTenantDataForPrompt(tenant);

  const prompt = `
    You are an AI assistant for a property management company specializing in tenant verification.
    Analyze the following tenant application details and provide a trust score from 0 to 100.
    A score of 100 indicates a perfect, low-risk tenant.
    Base your score on income stability (ideally >3x rent, assume rent is $1500/month), credit history (740+ is excellent), employment consistency, and rental background (no evictions, history of on-time payments).
    Also, provide a brief, easy-to-read reasoning for your score.

    Tenant Details:
    ${tenantDataString}

    Return your analysis in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation
    if (typeof result.score !== 'number' || typeof result.reasoning !== 'string') {
        throw new Error("Invalid JSON structure received from API.");
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
