import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));

// Load cheo.json safely on the server
const cheoDataPath = path.resolve(process.cwd(), "src/data/cheo.json");
let cheoContext = "";
try {
  const raw = fs.readFileSync(cheoDataPath, "utf-8");
  const parsed = JSON.parse(raw);
  cheoContext = JSON.stringify({
    tichCheo: parsed.tichCheo.map((t: any) => ({
      ten: t.ten,
      tenGoiKhac: t.tenGoiKhac,
      chuDe: t.chuDe,
      gioiThieu: t.gioiThieu,
      tomTatCotTruyen: t.tomTatCotTruyen,
      nhanVat: t.nhanVat,
      taiLieuThamKhao: t.taiLieuThamKhao,
      trangThaiXacMinh: t.trangThaiXacMinh,
    })),
    vaiMau: parsed.vaiMau.map((v: any) => ({
      ten: v.ten,
      loaiVai: v.loaiVai,
      dacDiemNhanVat: v.dacDiemNhanVat,
      hoaTrangTrangPhuc: v.hoaTrangTrangPhuc,
      nguonThamKhao: v.nguonThamKhao,
    })),
    lanDieu: parsed.lanDieu.map((l: any) => ({
      ten: l.ten,
      nhomLanDieu: l.nhomLanDieu,
      dacDiemAmNhac: l.dacDiemAmNhac,
      noiDungCamXuc: l.noiDungCamXuc,
      hoanCanhSuDung: l.hoanCanhSuDung,
      nguonThamKhao: l.nguonThamKhao,
    })),
    chieuCheo: parsed.chieuCheo.map((c: any) => ({
      ten: c.ten,
      tinhThanh: c.tinhThanh,
      diaChi: c.diaChi,
      trangThaiHoatDong: c.trangThaiHoatDong,
      trangThaiXacMinh: c.trangThaiXacMinh,
    })),
    nguonTuLieu: parsed.nguonTuLieu.map((n: any) => ({
      ten: n.ten,
      tacGia: n.tacGia,
      duongDan: n.duongDan,
    })),
  });
} catch {
  cheoContext = "{}";
}

const SYSTEM_INSTRUCTION = `Bạn là trợ lý chuyên khảo về Nghệ thuật Chèo Sân Đình và Sân Khấu Dân Gian Bắc Bộ.
Bạn CHỈ trả lời các câu hỏi liên quan đến:
- Lịch sử nghệ thuật Chèo.
- Các tích Chèo cổ.
- Nhân vật và vai mẫu trong Chèo.
- Làn điệu Chèo.
- Nghệ nhân và nghệ sĩ Chèo.
- Chiếu Chèo và hoạt động biểu diễn.
- Giá trị văn hóa và bảo tồn nghệ thuật Chèo.

QUY TẮC BẮT BUỘC:
1. Ưu tiên sử dụng dữ liệu từ kho tư liệu sau đây (cheo.json): ${cheoContext}
2. Không tự bịa thông tin lịch sử.
3. Không tự tạo tên nghệ nhân, đoàn Chèo hoặc địa chỉ.
4. Không khẳng định thông tin chưa xác minh là sự thật; nếu dữ liệu ghi "Chưa xác minh", phải nói rõ là chưa xác minh.
5. Khi không có dữ liệu, phải thông báo rõ ràng là hiện chưa có tư liệu xác thực trong hệ thống.
6. Trả lời bằng tiếng Việt có dấu, bố cục rõ ràng, dễ hiểu.
7. Khi có nguồn tham khảo, hãy cung cấp tên tài liệu hoặc đường dẫn có trong dữ liệu. Không đưa ra nguồn tài liệu không tồn tại.
8. Nếu người dùng hỏi ngoài chủ đề Chèo, hãy lịch sự thông báo phạm vi hỗ trợ của ứng dụng chỉ tập trung vào nghệ thuật Chèo truyền thống Bắc Bộ.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Vui lòng nhập câu hỏi hợp lệ." });
    }

    if (message.length > 1500) {
      return res.status(400).json({ error: "Câu hỏi quá dài (tối đa 1500 ký tự)." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "Hệ thống AI chưa được cấu hình khóa API (GEMINI_API_KEY). Vui lòng kiểm tra biến môi trường phía máy chủ.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const contents = Array.isArray(history)
      ? [
          ...history.slice(-6).map((m: { role: string; text: string }) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
          { role: "user", parts: [{ text: message.trim() }] },
        ]
      : message.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text;
    if (!reply) {
      return res.status(502).json({ error: "Không nhận được phản hồi từ Gemini." });
    }

    return res.json({ reply });
  } catch (err: any) {
    const status = err?.status || 500;
    return res.status(status).json({
      error: "Đã xảy ra lỗi khi kết nối với dịch vụ AI. Vui lòng thử lại sau.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
