import { useState } from "react";
import { getFaqAnswer } from "@/lib/faq";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FaqPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm the BookEnds assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const answer = getFaqAnswer(input);
    const botMsg: Message = { role: "assistant", content: answer };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hello! I'm the BookEnds assistant. How can I help you today?",
      },
    ]);
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-secondary">
        💬 Ask Us
      </h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Got questions? Our assistant knows all about BookEnds...
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Common Questions */}
        <div className="rounded-xl border-2 border-border bg-card p-5">
          <h3 className="mb-3 font-heading text-base font-semibold text-secondary">
            Common Questions
          </h3>
          <p className="mb-2 text-xs text-muted-foreground">Customers often ask:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li
              className="cursor-pointer rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-primary"
              onClick={() => setInput("Where is your location?")}
            >
              📍 Where is your location?
            </li>
            <li
              className="cursor-pointer rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-primary"
              onClick={() => setInput("Can I sell books?")}
            >
              📚 Can I sell books?
            </li>
            <li
              className="cursor-pointer rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-primary"
              onClick={() => setInput("Do you offer free delivery?")}
            >
              🚚 Do you offer free delivery?
            </li>
            <li
              className="cursor-pointer rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-primary"
              onClick={() => setInput("What are your operating hours?")}
            >
              🕐 What are your hours?
            </li>
          </ul>
        </div>

        {/* Chat */}
        <div className="md:col-span-2">
          <div className="rounded-xl border-2 border-border bg-card">
            <div className="border-b border-border px-5 py-3">
              <h3 className="font-heading text-base font-semibold text-secondary">
                Chat with BookEnds
              </h3>
            </div>

            {/* Messages */}
            <div className="h-80 space-y-3 overflow-y-auto p-5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "ml-auto rounded-br-sm bg-primary text-primary-foreground"
                      : "mr-auto rounded-bl-sm border-2 border-border bg-accent text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-border p-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="border-border"
              />
              <button
                onClick={handleSend}
                className="shrink-0 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send
              </button>
            </div>

            {/* Clear */}
            <div className="border-t border-border px-4 py-2">
              <button
                onClick={handleClear}
                className="text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                🗑️ Clear chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
