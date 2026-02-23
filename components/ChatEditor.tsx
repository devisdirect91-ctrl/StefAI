"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

type Props = {
  content: unknown;
  onContentChange: (newContent: unknown) => void;
};

const SUGGESTIONS = [
  "Rends le titre plus accrocheur",
  "Ajoute un bénéfice sur la rapidité",
  "Change le ton pour être plus dynamique",
  "Baisse le prix de 20%",
];

export default function ChatEditor({ content, onContentChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Bonjour ! Dis-moi ce que tu veux modifier sur ta landing page. L'aperçu se mettra à jour en temps réel.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef(content);
  contentRef.current = content;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string = input) => {
    text = text.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: contentRef.current,
          message: text,
          history: messages,
        }),
      });

      const data = await res.json();

      if (data.content) {
        onContentChange(data.content);
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: data.reply ?? "Modification appliquée !",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", text: "Une erreur est survenue. Réessaie." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-b-2xl flex flex-col h-[640px]">

      {/* Header */}
      <div className="px-4 py-3.5 border-b border-zinc-800 shrink-0">
        <h3 className="font-medium text-zinc-100 text-sm">Edit with AI</h3>
        <p className="text-zinc-500 text-xs mt-0.5">Preview updates automatically</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-zinc-800 text-zinc-200 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 px-4 py-3.5 rounded-2xl rounded-bl-none">
              <span className="flex gap-1 items-center">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3 flex flex-col gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-left text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700/80 px-3 py-2 rounded-xl transition-colors truncate"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-zinc-800 shrink-0">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Change le titre, ajoute un bénéfice..."
            disabled={loading}
            className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-indigo-500 rounded-xl px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-3.5 rounded-xl transition-colors shrink-0"
            aria-label="Send"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
