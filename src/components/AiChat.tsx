import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are PhishGuard AI, an expert cybersecurity assistant specializing in phishing detection, URL analysis, and browser security. You help users understand phishing threats, how to stay safe online, and how PhishGuard protects them. Be concise, technical when needed, and always security-focused.`;

// Gemini API key from environment
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";

async function fetchAIResponse(messages: Message[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    // Fallback demo responses when no API key is configured
    const lastMsg = messages[messages.length - 1].content.toLowerCase();
    if (lastMsg.includes("phish")) {
      return "Phishing attacks trick users into revealing credentials by mimicking trusted sites. PhishGuard intercepts these by analyzing URL patterns, visual similarity to known portals, and redirect chains — all on-device in under 128ms.";
    }
    if (lastMsg.includes("how") && lastMsg.includes("work")) {
      return "PhishGuard hooks into your browser's network layer. Every link you click is routed through our local inspection engine before a network request is made. Neural models running on-device check for credential-harvesting patterns and visual spoofing.";
    }
    if (lastMsg.includes("safe") || lastMsg.includes("secure")) {
      return "PhishGuard uses zero-data-collection architecture — your browsing history never leaves your device. All threat intelligence is downloaded to the edge and processed locally.";
    }
    return "I'm PhishGuard AI. I can help you understand phishing threats, URL safety, and how PhishGuard protects your browser. What would you like to know?\n\n*(Note: Add your Gemini API key via VITE_GEMINI_API_KEY in .env for full AI responses.)*";
  }

  // Build Gemini contents array (user/model turns only)
  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
      }),
    }
  );

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received."
  );
}
export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I'm PhishGuard AI — your cybersecurity assistant. Ask me anything about phishing threats, URL safety, or how PhishGuard protects you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await fetchAIResponse(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠ Error: ${msg}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col rounded-xl bg-zinc-900 ring-1 ring-zinc-800 shadow-2xl shadow-black/60 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-label="PhishGuard AI Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 rounded-t-xl bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-md bg-brand/10 ring-1 ring-brand/30 flex items-center justify-center">
              <svg
                className="size-3.5 text-brand"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-mono font-medium text-zinc-100 leading-none">
                PhishGuard AI
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="size-7 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            aria-label="Close chat"
          >
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-[380px] min-h-[200px] scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`size-6 rounded-md shrink-0 flex items-center justify-center ring-1 mt-0.5 ${
                  msg.role === "assistant"
                    ? "bg-brand/10 ring-brand/30"
                    : "bg-zinc-800 ring-zinc-700"
                }`}
              >
                {msg.role === "assistant" ? (
                  <svg
                    className="size-3 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="size-3 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "assistant"
                    ? "bg-zinc-800/60 text-zinc-200 ring-1 ring-zinc-700/50"
                    : "bg-brand/15 text-zinc-100 ring-1 ring-brand/25"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2.5 flex-row">
              <div className="size-6 rounded-md shrink-0 flex items-center justify-center ring-1 mt-0.5 bg-brand/10 ring-brand/30">
                <svg
                  className="size-3 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
              </div>
              <div className="bg-zinc-800/60 ring-1 ring-zinc-700/50 rounded-lg px-3 py-2.5 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0ms]" />
                <span className="size-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:150ms]" />
                <span className="size-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-zinc-800 rounded-b-xl">
          <div className="flex items-center gap-2 bg-zinc-800/50 ring-1 ring-zinc-700/50 rounded-lg px-3 py-2 focus-within:ring-brand/40 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about phishing threats..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 outline-none disabled:opacity-50 font-sans"
              aria-label="Chat message input"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="size-7 rounded-md bg-brand/20 ring-1 ring-brand/30 flex items-center justify-center text-brand hover:bg-brand/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              <svg
                className="size-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
          <p className="text-[10px] font-mono text-zinc-600 mt-2 text-center">
            PhishGuard AI · Cybersecurity Assistant
          </p>
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 size-14 rounded-full flex items-center justify-center shadow-lg shadow-black/50 ring-1 transition-all duration-300 ${
          open
            ? "bg-zinc-800 ring-zinc-700 text-zinc-300 hover:bg-zinc-700"
            : "bg-brand ring-brand/50 text-zinc-950 hover:brightness-110"
        }`}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
      >
        {open ? (
          <svg
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
