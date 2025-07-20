import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { CODE_GEN_PROMPT } from "@/lib/prompt";

type RequestBody = {
  prompt: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { prompt } = body;

    const result = await generateObject({
      model: google('gemini-2.5-flash'),
      output: 'no-schema',
      system: CODE_GEN_PROMPT,
      prompt: `${prompt}`,
    });

    console.log(result.object);

    return NextResponse.json({
      success: true,
      output: result.object,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);

    let message = "Something went wrong";

    // Type guard for Error
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, message, error: message },
      { status: 500 }
    );
  }
}
