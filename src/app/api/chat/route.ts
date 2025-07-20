// app/api/chat/route.ts

// import { google } from "@ai-sdk/google";
// import { NextRequest } from "next/server";
// import { streamText, UIMessage } from "ai";

// export const runtime = "edge";
// export const maxDuration = 30;

// export async function POST(req: NextRequest) {
//   const { messages }: { messages: UIMessage[] } = await req.json();


//   const result = streamText({
//     model: google("gemini-2.5-flash") as any,
//     messages,

//     onError({ error }) {
//       console.error(error); // your error logging logic here
//     },
//   });

//   return result.toDataStreamResponse();
// }

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { CHAT_PROMPT } from "@/lib/prompt";

export async function POST(req: NextRequest) {
  try {
    const { prompt }: any = await req.json(); 

    const result = await generateText({
      model: google("gemini-2.5-flash") as any,
      system: CHAT_PROMPT,
      prompt: `Summarize the following article in 3-5 sentences: ${prompt}`,
    });

    return NextResponse.json({ success: true, output: result.text });
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}




