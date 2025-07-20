import { CODE_GEN_PROMPT } from '@/lib/prompt';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await generateObject({
      model: google('gemini-2.5-flash') as any,
      output: 'no-schema',
      system: CODE_GEN_PROMPT,
      prompt: `${prompt}`
    });

    console.log(result.object);

    return NextResponse.json({
      success: true,
      output: result.object,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
