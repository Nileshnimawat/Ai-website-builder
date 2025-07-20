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

type RequestBody = {
  prompt: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { prompt } = body;

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      system: CHAT_PROMPT,
      prompt: `Summarize the following article in 3-5 sentences: ${prompt}`,
    });

    return NextResponse.json({ success: true, output: result.text });
  } catch (error) {
    console.error("Error generating text:", error);

    let message = "Internal Server Error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}


