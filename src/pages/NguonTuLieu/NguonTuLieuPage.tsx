import { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";
import cheoData from "../../data/cheo.json";
import { CheoDataset } from "../../types/cheo";

const data = cheoData as CheoDataset;

export default function NguonTuLieuPage() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Tất cả");

  const docTypes = useMemo(() => {
    const set = new Set(data.nguonTuLieu.map((item) => item.loaiTaiLieu));
    return ["Tất cả", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return data.nguonTuLieu.filter((item) => {
      const matchType =
        selectedType === "Tất cả" || item.loaiTaiLieu === selectedType;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.ten.toLowerCase().includes(q) ||
        item.tacGia.toLowerCase().includes(q) ||
        item.moTa.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [query, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold">
          Thư mục &amp; Tham khảo
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Nguồn Tư Liệu Tham Khảo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
          Danh mục sách chuyên khảo, công trình nghiên cứu và cổng thông tin chính thức của các nhà hát, cơ quan quản lý văn hóa được sử dụng trong ứng dụng.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên tài liệu, tác giả..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {docTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedType === type
                  ? "bg-[#9A2A1E] text-white"
                  : "bg-[#F2EDE4] text-stone-700 hover:bg-stone-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-stone-200 rounded-md">
          <p className="text-sm text-stone-600">
            Không tìm thấy nguồn tư liệu nào phù hợp.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-stone-200 rounded-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="text-xs text-stone-500 flex flex-wrap items-center gap-2">
                  <span>{item.id.toUpperCase()}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#3F2E21]">
                    {item.loaiTaiLieu}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Năm: {item.namXuatBan}</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                  {item.ten}
                </h2>
                <p className="text-xs text-stone-600">
                  <strong>Tác giả / Đơn vị:</strong> {item.tacGia}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed max-w-3xl">
                  {item.moTa}
                </p>
              </div>

              {item.duongDan && (
                <a
                  href={item.duongDan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#9A2A1E] border border-[#9A2A1E]/40 rounded-md hover:bg-[#9A2A1E] hover:text-white transition-colors whitespace-nowrap self-start sm:self-center shrink-0"
                >
                  <span>Xem nguồn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
