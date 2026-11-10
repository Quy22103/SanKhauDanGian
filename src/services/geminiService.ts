export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export async function sendChatMessage(
  message: string,
  history: { role: "user" | "model"; text: string }[]
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Không thể kết nối tới máy chủ AI.");
  }

  return data.reply;
}
