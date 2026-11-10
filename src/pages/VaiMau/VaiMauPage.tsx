import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import cheoData from "../../data/cheo.json";
import { CheoDataset, VaiMau } from "../../types/cheo";
import ArchivalImage from "../../components/ArchivalImage";

const data = cheoData as CheoDataset;

export default function VaiMauPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState("Tất cả");
  const [activeItem, setActiveItem] = useState<VaiMau | null>(null);

  const roleTypes = useMemo(() => {
    const set = new Set(data.vaiMau.map((item) => item.loaiVai));
    return ["Tất cả", ...Array.from(set)];
  }, []);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const found = data.vaiMau.find((v) => v.id === idParam);
      if (found) setActiveItem(found);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return data.vaiMau.filter((item) => {
      const matchType =
        selectedRoleType === "Tất cả" || item.loaiVai === selectedRoleType;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.ten.toLowerCase().includes(q) ||
        item.dacDiemNhanVat.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [query, selectedRoleType]);

  const linkedTichCheo = useMemo(() => {
    if (!activeItem) return [];
    return data.tichCheo.filter((t) =>
      activeItem.tichCheoLienQuan.includes(t.id)
    );
  }, [activeItem]);

  const handleOpen = (item: VaiMau) => {
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
        <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold">
          Hệ thống nhân vật sân khấu
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Thư Viện Vai Mẫu Chèo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
          Nghệ thuật Chèo quy chuẩn hóa các tuyến nhân vật thành những vai mẫu đặc trưng về tính cách, hóa trang, phục trang và phong cách diễn xuất.
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
            placeholder="Tìm theo tên vai mẫu..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {roleTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedRoleType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedRoleType === type
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
            Không tìm thấy vai mẫu nào phù hợp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group cursor-pointer bg-white border border-stone-200 rounded-md overflow-hidden hover:border-[#9A2A1E]/60 transition-colors flex flex-col"
            >
              <ArchivalImage src={item.hinhAnh} alt={item.ten} />
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>{item.loaiVai}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.trangThaiXacMinh}</span>
                </div>
                <h2 className="mt-2 font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#9A2A1E] transition-colors">
                  {item.ten}
                </h2>
                <p className="mt-2 text-sm text-stone-600 line-clamp-3 flex-1">
                  {item.dacDiemNhanVat}
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
              <span>{activeItem.loaiVai}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#9A2A1E]">
                {activeItem.trangThaiXacMinh}
              </span>
            </div>

            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {activeItem.ten}
            </h2>

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
                  Đặc điểm nhân vật
                </h3>
                <p className="mt-1">{activeItem.dacDiemNhanVat}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Đặc điểm tính cách
                </h3>
                <p className="mt-1">{activeItem.tinhCach}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Hóa trang &amp; Trang phục
                </h3>
                <p className="mt-1">{activeItem.hoaTrangTrangPhuc}</p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                  Phong cách diễn xuất
                </h3>
                <p className="mt-1">{activeItem.phongCachDienXuat}</p>
              </div>

              {linkedTichCheo.length > 0 && (
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-base font-bold text-[#3F2E21] mb-3">
                    Tích Chèo có xuất hiện vai mẫu này
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {linkedTichCheo.map((tich) => (
                      <Link
                        key={tich.id}
                        to={`/tich-cheo?id=${tich.id}`}
                        className="px-3 py-1.5 bg-white border border-stone-200 rounded-md text-xs font-medium text-[#9A2A1E] hover:border-[#9A2A1E] transition-colors"
                      >
                        {tich.ten}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
