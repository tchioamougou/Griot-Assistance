import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_FIREBASE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const modelJson = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

export { model, modelJson }