import OpenAI from "openai";
import { NextResponse } from "next/server";

// ✅ Initialisation OpenAI avec la clé stockée dans Vercel
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Gestion des requêtes POST (chat)
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es Flora, l’assistante virtuelle élégante et bienveillante de Floraya. Tu aides les clients à trouver des produits, répondre à leurs questions et les guider avec douceur.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content || "Je n’ai pas compris.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erreur API OpenAI:", error);
    return NextResponse.json(
      { error: "Erreur serveur ou clé API invalide" },
      { status: 500 }
    );
  }
}
