"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function McqPage() {
  const [question, setQuestion] = useState("What does HTML stand for?");
  const [options, setOptions] = useState(["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"]);
  const [answer, setAnswer] = useState("HyperText Markup Language");
  const [selected, setSelected] = useState("");

  const handleAnswer = (opt: string) => setSelected(opt);

  const handleNext = () => {
    window.location.href = "/result";
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#E8E3DC] p-6">
      <h1 className="text-4xl font-bold mb-8 text-[#5A3E2B]">MCQ Time 📝</h1>

      <div className="bg-[#74523B] text-[#E8E3DC] p-8 rounded-2xl shadow-lg max-w-2xl w-full space-y-6">
        <p className="text-xl font-medium">{question}</p>

        <div className="flex flex-col gap-4">
          {options.map((opt) => (
            <Button
              key={opt}
              variant={selected === opt ? "secondary" : "default"}
              onClick={() => handleAnswer(opt)}
              className={`text-left ${selected === opt ? "bg-[#AF9D8E]" : "bg-[#E8E3DC] text-[#74523B]"} border-2 border-[#AF9D8E] hover:scale-105 transition-all duration-200`}
            >
              {opt}
            </Button>
          ))}
        </div>

        {selected && (
          <div className="p-4 text-lg text-center font-semibold">
            {selected === answer ? "✅ Correct!" : `❌ Incorrect! Correct Answer: ${answer}`}
          </div>
        )}

        <Button
          onClick={handleNext}
          className="w-full bg-[#AF9D8E] hover:bg-[#BFB2A8] text-white text-lg font-semibold rounded-xl py-3 mt-4"
        >
          Next Concept
        </Button>
      </div>
    </main>
  );
}
