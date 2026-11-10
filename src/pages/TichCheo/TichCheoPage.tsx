import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import cheoData from "../../data/cheo.json";
import { CheoDataset, TichCheo } from "../../types/cheo";
import ArchivalImage from "../../components/ArchivalImage";

const data = cheoData as CheoDataset;

export default function TichCheoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Tất cả");
  const [activeItem, setActiveItem] = useState<TichCheo | null>(null);

  const topics = useMemo(() => {
    const set = new Set(data.tichCheo.map((item) => item.chuDe));
    return ["Tất cả", ...Array.from(set)];
  }, []);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const found = data.tichCheo.find((t) => t.id === idParam);
      if (found) setActiveItem(found);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return data.tichCheo.filter((item) => {
      const matchTopic =
        selectedTopic === "Tất cả" || item.chuDe === selectedTopic;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.ten.toLowerCase().includes(q) ||
        item.tenGoiKhac.toLowerCase().includes(q) ||
        item.gioiThieu.toLowerCase().includes(q);
      return matchTopic && matchQuery;
    });
  }, [query, selectedTopic]);

  const relatedItems = useMemo(() => {
    if (!activeItem) return [];
    return data.tichCheo
      .filter((t) => t.id !== activeItem.id && t.chuDe === activeItem.chuDe)
      .slice(0, 3);
  }, [activeItem]);

  const handleOpen = (item: TichCheo) => {
    setActiveItem(item);
    setSearchParams({ id: item.id });
  };

  const handleClose = () => {
    setActiveItem(null);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold">
          Thư viện kịch bản cổ truyền
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Thư Viện Tích Chèo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
          Tổng hợp các tích Chèo cổ và dân gian tiêu biểu của vùng đồng bằng Bắc Bộ kèm tóm tắt cốt truyện, nhân vật và giá trị văn hóa.
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
            placeholder="Tìm theo tên tích Chèo..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedTopic === topic
                  ? "bg-[#9A2A1E] text-white"
                  : "bg-[#F2EDE4] text-stone-700 hover:bg-stone-200"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-stone-200 rounded-md">
          <p className="text-sm text-stone-600">
            Không tìm thấy tích Chèo nào phù hợp với bộ lọc hiện tại.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group cursor-pointer bg-white border border-stone-200 rounded-md overflow-hidden hover:border-[#9A2A1E]/60 transition-colors flex flex-col"
            >
              <ArchivalImage src={item.hinhAnh} alt={item.ten} />
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>{item.chuDe}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.trangThaiXacMinh}</span>
                </div>
                <h2 className="mt-2 font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#9A2A1E] transition-colors">
                  {item.ten}
                </h2>
                {item.tenGoiKhac && (
                  <p className="text-xs text-stone-500 mt-0.5">
                    Tên khác: {item.tenGoiKhac}
                  </p>
                )}
                <p className="mt-2.5 text-sm text-stone-600 line-clamp-3 flex-1">
                  {item.gioiThieu}
                </p>
                <button
                  type="button"
                  className="mt-4 text-left text-sm font-medium text-[#9A2A1E] hover:underline"
                >
                  Xem chi tiết
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <div
            className="bg-[#FBF9F5] border border-stone-200 rounded-md max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Đóng chi tiết"
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-[#9A2A1E] rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span>{activeItem.id.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.chuDe}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#9A2A1E]">
                {activeItem.trangThaiXacMinh}
              </span>
            </div>

            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {activeItem.ten}
            </h2>
            {activeItem.tenGoiKhac && (
              <p className="text-sm text-stone-500 mt-1">
                Tên gọi khác: {activeItem.tenGoiKhac}
              </p>
            )}

            <div className="mt-5">
              <ArchivalImage
                src={activeItem.hinhAnh}
                alt={activeItem.ten}
                aspectClass="aspect-[16/9] rounded-md"
              />
            </div>

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-stone-700">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Giới thiệu chung
                </h3>
                <p className="mt-1">{activeItem.gioiThieu}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Tóm tắt cốt truyện
                </h3>
                <p className="mt-1">{activeItem.tomTatCotTruyen}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Nguồn gốc &amp; Bối cảnh lịch sử
                </h3>
                <p className="mt-1">{activeItem.nguonGoc}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Các nhân vật chính
                </h3>
                <p className="mt-1">{activeItem.nhanVat.join(" · ")}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Giá trị văn hóa &amp; Ý nghĩa
                </h3>
                <p className="mt-1">{activeItem.giaTriVanHoa}</p>
              </div>

              <div className="pt-4 border-t border-stone-200 text-xs text-stone-500">
                <strong>Tài liệu tham khảo:</strong> {activeItem.taiLieuThamKhao}
              </div>

              {relatedItems.length > 0 && (
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-base font-bold text-[#3F2E21] mb-3">
                    Tích Chèo cùng chủ đề
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {relatedItems.map((rel) => (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => handleOpen(rel)}
                        className="text-left p-3 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E] transition-colors"
                      >
                        <div className="font-serif text-sm font-semibold text-[#1C1917]">
                          {rel.ten}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                          {rel.chuDe}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
