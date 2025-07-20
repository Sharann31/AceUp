import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, subject, difficulty } = await request.json();

  const prompt = `
You are an expert quiz generator. Generate 1 ${difficulty} level multiple-choice question for ${subject} for student ${name}.
Respond ONLY with JSON (no explanations), in this format:
{
  "question": "",
  "options": {
    "A": "",
    "B": "",
    "C": "",
    "D": ""
  },
  "correctAnswer": ""
}
Use reference ID: ${Math.floor(Math.random() * 10000)} to ensure uniqueness.
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    let aiText = data.choices?.[0]?.message?.content || data.choices?.[0]?.content || "";

    console.log("AI Raw Text:", aiText);

    // ✅ Extract valid JSON only
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in AI response");

    const mcq = JSON.parse(jsonMatch[0]);

    return NextResponse.json(mcq);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "MCQ generation failed" }, { status: 500 });
  }
}
