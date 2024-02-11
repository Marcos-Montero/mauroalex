"use client";
import { useState } from "react";

import { Link2Icon } from "lucide-react";
import Link from "next/link";

export const YTtool = () => {
  const [url, setUrl] = useState<string>("");
  const [transcriptLoading, setTranscriptLoading] = useState<boolean>(false);
  const getVideoTranscript = async () => {
    setTranscriptLoading(true);
    if (!url || url === "") {
      return;
    }
    const transcript = await fetch("/api/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await transcript.json();
    const res = await fetch("/api/gen-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: JSON.stringify(data) }),
    });
    const article = await res.json();
    localStorage.setItem("novel__content", article);
    setTranscriptLoading(false);
  };
  const handleVideoUrlChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUrl(e.target.value);
  };
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Link
        href="https://www.youtube.com/results?search_query=mauro+alex"
        target="_blank"
        rel="noopener nofollow"
        className="bg-red-700 text-white font-bold rounded-full px-4 flex gap-2 items-center"
      >
        YT
        <Link2Icon className="h-4 w-4" />
      </Link>
      <input
        className="w-full rounded-full p-2 text-black"
        type="text"
        placeholder="video url..."
        value={url}
        onChange={handleVideoUrlChange}
      />
      <button
        className="p-2 outline outline-white rounded-full"
        onClick={getVideoTranscript}
        disabled={transcriptLoading}
      >
        {transcriptLoading ? "...loading" : "create article"}
      </button>
    </div>
  );
};
