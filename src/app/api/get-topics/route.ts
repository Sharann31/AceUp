import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, subject, difficulty } = await request.json();

  const prompt = `
  List 10 important ${difficulty} level topics from ${subject} for student ${name}.
  Respond ONLY in JSON:
  { "topics": ["topic1", "topic2", ..., "topic10"] }
  `;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gryphe/mythomax-l2-13b",
      temperature: 1.1,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const result = await response.json();
  const aiText = result.choices?.[0]?.message?.content;

  let topics;
  try {
    topics = JSON.parse(aiText);
  } catch {
    topics = { topics: [] };
  }

  return NextResponse.json({ topics: topics.topics });
}
