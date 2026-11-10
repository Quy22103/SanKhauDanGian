import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import cheoData from "../../data/cheo.json";
import { CheoDataset, LanDieu } from "../../types/cheo";
import ArchivalImage from "../../components/ArchivalImage";

const data = cheoData as CheoDataset;

export default function LanDieuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Tất cả");
  const [activeItem, setActiveItem] = useState<LanDieu | null>(null);

  const groups = useMemo(() => {
    const set = new Set(data.lanDieu.map((item) => item.nhomLanDieu));
    return ["Tất cả", ...Array.from(set)];
  }, []);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const found = data.lanDieu.find((l) => l.id === idParam);
      if (found) setActiveItem(found);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return data.lanDieu.filter((item) => {
      const matchGroup =
        selectedGroup === "Tất cả" || item.nhomLanDieu === selectedGroup;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.ten.toLowerCase().includes(q) ||
        item.tenGoiKhac.toLowerCase().includes(q) ||
        item.dacDiemAmNhac.toLowerCase().includes(q);
      return matchGroup && matchQuery;
    });
  }, [query, selectedGroup]);

  const handleOpen = (item: LanDieu) => {
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
          Âm nhạc &amp; Thanh nhạc cổ truyền
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Chú Giải Làn Điệu Chèo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
          Giải thích đặc điểm âm nhạc, nhịp điệu, cảm xúc và hoàn cảnh sử dụng của các làn điệu Chèo truyền thống Bắc Bộ.
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
            placeholder="Tìm theo tên làn điệu..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {groups.map((grp) => (
            <button
              key={grp}
              type="button"
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedGroup === grp
                  ? "bg-[#9A2A1E] text-white"
                  : "bg-[#F2EDE4] text-stone-700 hover:bg-stone-200"
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-stone-200 rounded-md">
          <p className="text-sm text-stone-600">
            Không tìm thấy làn điệu nào phù hợp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group cursor-pointer bg-white border border-stone-200 rounded-md p-5 hover:border-[#9A2A1E]/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>{item.nhomLanDieu}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.trangThaiXacMinh}</span>
                </div>
                <h2 className="mt-2 font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#9A2A1E] transition-colors">
                  {item.ten}
                </h2>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                  {item.dacDiemAmNhac}
                </p>
                <p className="mt-2 text-xs italic text-stone-500">
                  “{item.viDuTrichDoan}”
                </p>
              </div>
              <button
                type="button"
                className="mt-4 text-left text-sm font-medium text-[#9A2A1E] hover:underline"
              >
                Xem chú giải chi tiết
              </button>
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
              <span>{activeItem.nhomLanDieu}</span>
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

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-700">
              <div className="p-4 bg-[#F2EDE4]/70 border border-stone-200 rounded-md">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                  Ví dụ trích đoạn
                </p>
                <p className="mt-1 font-serif italic text-base text-[#1C1917]">
                  “{activeItem.viDuTrichDoan}”
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                    Đặc điểm âm nhạc
                  </h3>
                  <p className="mt-1">{activeItem.dacDiemAmNhac}</p>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                    Nhịp điệu &amp; Cách thể hiện
                  </h3>
                  <p className="mt-1">
                    {activeItem.nhipDieu}. {activeItem.cachTheHien}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Nội dung &amp; Cảm xúc
                </h3>
                <p className="mt-1">{activeItem.noiDungCamXuc}</p>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Hoàn cảnh sử dụng &amp; Ý nghĩa văn hóa
                </h3>
                <p className="mt-1">
                  {activeItem.hoanCanhSuDung} {activeItem.yNghiaVanHoa}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Nghệ nhân / Nghệ sĩ biểu diễn
                </h3>
                <p className="mt-1">{activeItem.ngheNhanBieuDien}</p>
              </div>

              <div className="pt-4 border-t border-stone-200 text-xs text-stone-500">
                <strong>Nguồn tham khảo:</strong> {activeItem.nguonThamKhao}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
