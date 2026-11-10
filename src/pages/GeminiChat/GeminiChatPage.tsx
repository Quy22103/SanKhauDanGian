import { useState, FormEvent } from "react";
import { Send, Trash2, Loader2, AlertCircle } from "lucide-react";
import { ChatMessage, sendChatMessage } from "../../services/geminiService";

const SUGGESTED_QUESTIONS = [
  "Tích Chèo Quan Âm Thị Kính có ý nghĩa văn hóa gì?",
  "Sự khác biệt giữa vai Đào chín và Đào lệch trong Chèo là gì?",
  "Làn điệu Đường trường phải chiều thường dùng trong hoàn cảnh nào?",
  "Hiện có những nhà hát Chèo lớn nào đang hoạt động tại Hà Nội và Thái Bình?",
];

export default function GeminiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (textToSend?: string) => {
    const content = (textToSend ?? input).trim();
    if (!content || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: content,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));
      const replyText = await sendChatMessage(content, historyPayload);

      const aiMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: "model",
        text: replyText,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setError(
        err?.message || "Không thể kết nối tới trợ lý AI. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold">
            Tra cứu tri thức sân khấu dân gian
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Hỏi Đáp Nghệ Thuật Chèo
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Đặt câu hỏi về tích Chèo, vai mẫu, làn điệu, lịch sử và các chiếu Chèo Bắc Bộ.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 bg-white border border-stone-300 rounded-md hover:text-[#9A2A1E] hover:border-[#9A2A1E] transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa lịch sử</span>
          </button>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-stone-200 rounded-md flex flex-col min-h-[460px]">
        <div className="flex-1 p-5 space-y-5 overflow-y-auto max-h-[540px]">
          {messages.length === 0 ? (
            <div className="py-8">
              <p className="text-sm text-stone-600 mb-4">
                Bạn có thể bắt đầu bằng một trong các câu hỏi gợi ý dưới đây:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-left p-3.5 text-sm text-stone-700 bg-[#FBF9F5] border border-stone-200 rounded-md hover:border-[#9A2A1E] hover:text-[#9A2A1E] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-md px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#9A2A1E] text-white"
                      : "bg-[#F2EDE4]/80 text-[#1C1917] border border-stone-200"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] text-stone-400 mt-1">
                  {msg.role === "user" ? "Bạn" : "Trợ lý Chèo"} · {msg.timestamp}
                </span>
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Loader2 className="w-4 h-4 animate-spin text-[#9A2A1E]" />
              <span>Đang tra cứu tư liệu và soạn câu trả lời...</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-md flex items-start gap-2.5 text-sm text-red-800">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-stone-200 p-4 bg-[#FBF9F5] flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi về nghệ thuật Chèo Bắc Bộ..."
            disabled={loading}
            className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#9A2A1E] rounded-md hover:bg-[#7D2117] transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </form>
      </div>
    </div>
  );
}
