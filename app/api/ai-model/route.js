import { NextResponse } from "next/server";

export async function POST(req) {
  const { jobPosition, jobDescription, type, duration } = await req.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobPosition, jobDescription, type, duration }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate AI response');
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
