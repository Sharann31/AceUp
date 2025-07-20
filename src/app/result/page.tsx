"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const subject = searchParams.get("subject");
  const difficulty = searchParams.get("difficulty");

  const [mcq, setMcq] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const fetchMCQ = async () => {
    setMessage("Loading question...");
    setMcq(null);
    const res = await fetch("/api/get-mcq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, difficulty }),
    });
    const data = await res.json();
    setMcq(data);
    setCorrectAnswer(data.correctAnswer);
    setMessage("");
  };

  useEffect(() => { fetchMCQ(); }, []);

  const checkAnswer = (option: string) => {
    if (option === correctAnswer) {
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Wrong! Correct Answer: ${correctAnswer}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#CBF8B8]">
      <h1 className="text-4xl font-bold mb-6 text-[#74523B]">AceUp MCQs</h1>
      <div className="bg-[#74523B] text-[#CBF8B8] p-8 rounded-2xl shadow-md w-full max-w-md space-y-4">
        {mcq && (
          <>
            <h2 className="text-xl font-semibold">{mcq.question}</h2>
            <div className="space-y-2">
              {["A", "B", "C", "D"].map((opt) => (
                <Button key={opt} variant="outline" onClick={() => checkAnswer(opt)} className="w-full text-black bg-white hover:bg-blue-100">
                  {opt}: {mcq.options[opt]}
                </Button>
              ))}
            </div>
            <p className="mt-4 text-center">{message}</p>
            <Button onClick={fetchMCQ} className="w-full mt-4 bg-[#AF9D8E] hover:bg-[#BFB2A8]">Next Question</Button>
          </>
        )}
        {!mcq && <p className="text-center">{message}</p>}
      </div>
    </main>
  );
}
