


import { createGoogleGenerativeAI } from '@ai-sdk/google';

// const google = createGoogleGenerativeAI({
//   // custom settings
//   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
// });


// export default google;












import { GoogleGenAI } from "@google/genai";


const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default genAI;