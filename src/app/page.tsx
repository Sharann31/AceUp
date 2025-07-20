"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (name && subject && difficulty) {
      router.push(`/result?name=${name}&subject=${subject}&difficulty=${difficulty}`);
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#CBF8B8]">
      <h1 className="text-4xl font-bold mb-6 text-[#74523B]">AceUp</h1>

      <div className="bg-[#74523B] text-[#CBF8B8] p-8 rounded-2xl shadow-md w-full max-w-md space-y-6 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-center">Let's Test Your Knowledge</h2>

        <div className="space-y-2">
          <label className="text-[#CBCDCC] font-medium">Your Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="border-2" placeholder="Enter Name" />
        </div>

        <div className="space-y-2">
          <label className="text-[#CBCDCC] font-medium">Subject</label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="border-2" placeholder="Enter Subject" />
        </div>

        <div className="space-y-2">
          <label className="text-[#CBCDCC] font-medium">Difficulty Level</label>
          <Input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border-2" placeholder="Easy / Medium / Hard" />
        </div>

        <Button onClick={handleSubmit} className="w-full bg-[#AF9D8E] hover:bg-[#BFB2A8]">Start Test</Button>
      </div>
    </main>
  );
}
