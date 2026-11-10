import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, ExternalLink, MapPin } from "lucide-react";
import cheoData from "../../data/cheo.json";
import { CheoDataset, ChieuCheo } from "../../types/cheo";

const data = cheoData as CheoDataset;

export default function ChieuCheoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [activeItem, setActiveItem] = useState<ChieuCheo | null>(null);

  const provinces = useMemo(() => {
    const set = new Set(data.chieuCheo.map((item) => item.tinhThanh));
    return ["Tất cả", ...Array.from(set)];
  }, []);

  const statuses = ["Tất cả", "Đang hoạt động", "Chưa xác minh"];

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const found = data.chieuCheo.find((c) => c.id === idParam);
      if (found) setActiveItem(found);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return data.chieuCheo.filter((item) => {
      const matchProvince =
        selectedProvince === "Tất cả" || item.tinhThanh === selectedProvince;
      const matchStatus =
        selectedStatus === "Tất cả" ||
        item.trangThaiHoatDong === selectedStatus;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        item.ten.toLowerCase().includes(q) ||
        item.diaChi.toLowerCase().includes(q) ||
        item.tinhThanh.toLowerCase().includes(q);
      return matchProvince && matchStatus && matchQuery;
    });
  }, [query, selectedProvince, selectedStatus]);

  const handleOpen = (item: ChieuCheo) => {
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
        <p className="text-xs uppercase tracking-widest text-[#3F2E21] font-semibold">
          Đơn vị &amp; Câu lạc bộ biểu diễn
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Danh Sách Chiếu Chèo &amp; Đoàn Chèo
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
          Thông tin các nhà hát Chèo chuyên nghiệp và chiếu Chèo cộng đồng tại Bắc Bộ. Các đơn vị chưa có tư liệu xác thực về lịch diễn hoặc địa chỉ đều được ghi rõ trạng thái “Chưa xác minh”.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên đoàn hoặc tỉnh/thành..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Lọc theo tỉnh thành"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9A2A1E]"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>
                Tỉnh/Thành: {p}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5">
            {statuses.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedStatus === st
                    ? "bg-[#9A2A1E] text-white"
                    : "bg-[#F2EDE4] text-stone-700 hover:bg-stone-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white border border-stone-200 rounded-md">
          <p className="text-sm text-stone-600">
            Không tìm thấy chiếu Chèo hoặc đoàn Chèo nào phù hợp.
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
                <div className="text-xs text-stone-500 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {item.tinhThanh}
                  </span>
                  <span
                    className={
                      item.trangThaiHoatDong === "Đang hoạt động"
                        ? "text-emerald-800 font-medium"
                        : "text-amber-800 font-medium"
                    }
                  >
                    {item.trangThaiHoatDong}
                  </span>
                </div>

                <h2 className="mt-2 font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#9A2A1E] transition-colors">
                  {item.ten}
                </h2>
                <p className="mt-1 text-xs text-stone-500">{item.diaChi}</p>
                <p className="mt-2.5 text-sm text-stone-600 line-clamp-2">
                  {item.gioiThieu}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Xác minh: {item.trangThaiXacMinh}</span>
                <span className="text-[#9A2A1E] font-medium group-hover:underline">
                  Xem chi tiết
                </span>
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
            className="bg-[#FBF9F5] border border-stone-200 rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
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
              <span>{activeItem.tinhThanh}</span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.trangThaiHoatDong}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#9A2A1E]">
                {activeItem.trangThaiXacMinh}
              </span>
            </div>

            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {activeItem.ten}
            </h2>
            <p className="mt-1 text-sm text-stone-600">{activeItem.diaChi}</p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-700">
              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Giới thiệu
                </h3>
                <p className="mt-1">{activeItem.gioiThieu}</p>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Lịch sử hình thành
                </h3>
                <p className="mt-1">{activeItem.lichSu}</p>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Hoạt động &amp; Lịch biểu diễn
                </h3>
                <p className="mt-1">{activeItem.hoatDongBieuDien}</p>
                <p className="mt-1 text-stone-600">
                  <strong>Lịch biểu diễn:</strong> {activeItem.lichBieuDien}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#3F2E21]">
                  Nghệ nhân / Đại diện &amp; Liên hệ
                </h3>
                <p className="mt-1">
                  <strong>Đại diện:</strong> {activeItem.ngheNhanDaiDien}
                </p>
                <p className="mt-1">
                  <strong>Liên hệ:</strong> {activeItem.lienHe}
                </p>
              </div>

              {activeItem.website && (
                <div>
                  <a
                    href={activeItem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9A2A1E] hover:underline"
                  >
                    <span>Truy cập trang thông tin chính thức</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
