import OpenAI from "openai";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const { content, message, history } = await req.json();

  const systemPrompt = `You are an AI assistant helping a user edit their landing page.

Current landing page JSON:
${JSON.stringify(content, null, 2)}

When the user requests a change:
1. Apply the modification to the content
2. Return a JSON object with exactly two keys:
   - "content": the complete updated landing page (same structure, all fields preserved)
   - "reply": a short friendly message in French explaining what you changed

Rules:
- Never change the JSON structure — only values
- benefits and testimonials must stay as arrays of plain strings
- pricing must stay as { price, guarantee }
- Keep the same language/tone as the original unless asked to change it`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      ...history.map((m: { role: string; text: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ],
  });

  const result = JSON.parse(completion.choices[0].message.content || "{}");

  return Response.json({
    content: result.content ?? content,
    reply: result.reply ?? "Modification appliquée !",
  });
}
