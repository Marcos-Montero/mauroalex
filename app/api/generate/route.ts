import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { prisma } from "@/lib/prisma";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
//export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      }
    );
  }

  let { prompt } = await req.json();
  const selectedPrompt = await prisma.userPrompts.findFirst({
    where: {
      selected: true,
    },
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          "Continúa el texto existente basado en el contexto del texto anterior." +
          "Dale más prioridad a los caracteres posteriores que a los primeros." +
          "Limita tu respuesta a máximo 200 caracteres, pero asegúrate de construir oraciones completas." +
          selectedPrompt?.prompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
