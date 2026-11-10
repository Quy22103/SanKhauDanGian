import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, BookOpen, Users, Music, MapPin } from "lucide-react";
import cheoData from "../../data/cheo.json";
import { CheoDataset } from "../../types/cheo";
import ArchivalImage from "../../components/ArchivalImage";

const data = cheoData as CheoDataset;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const tich = data.tichCheo.filter(
      (item) =>
        item.ten.toLowerCase().includes(q) ||
        item.tenGoiKhac.toLowerCase().includes(q) ||
        item.gioiThieu.toLowerCase().includes(q)
    );
    const vai = data.vaiMau.filter(
      (item) =>
        item.ten.toLowerCase().includes(q) ||
        item.loaiVai.toLowerCase().includes(q)
    );
    const dieu = data.lanDieu.filter(
      (item) =>
        item.ten.toLowerCase().includes(q) ||
        item.nhomLanDieu.toLowerCase().includes(q)
    );
    const chieu = data.chieuCheo.filter(
      (item) =>
        item.ten.toLowerCase().includes(q) ||
        item.tinhThanh.toLowerCase().includes(q)
    );

    return { tich, vai, dieu, chieu };
  }, [searchQuery]);

  const totalResults = searchResults
    ? searchResults.tich.length +
      searchResults.vai.length +
      searchResults.dieu.length +
      searchResults.chieu.length
    : 0;

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-[#1C1917] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_cheo_san_dinh_1794294217331.jpg"
            alt="Không gian biểu diễn Chèo sân đình Bắc Bộ"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-amber-300 font-medium">
              Di sản sân khấu dân gian đồng bằng Bắc Bộ
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
              Chèo Sân Đình &amp; Sân Khấu Dân Gian Bắc Bộ
            </h1>
            <p className="mt-5 text-base sm:text-lg text-stone-200 leading-relaxed">
              Không gian lưu trữ, tra cứu tích Chèo cổ, hệ thống vai mẫu, làn điệu truyền thống và các chiếu Chèo đang gìn giữ hồn cốt văn hóa làng xã Việt Nam.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-xl">
              <label htmlFor="home-search" className="sr-only">
                Tìm kiếm tích Chèo, vai mẫu, làn điệu, chiếu Chèo
              </label>
              <div className="flex items-center bg-[#FBF9F5] rounded-md border border-stone-300 shadow-sm focus-within:ring-2 focus-within:ring-[#9A2A1E]">
                <Search className="w-5 h-5 text-stone-400 ml-3.5 shrink-0" />
                <input
                  id="home-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tích Chèo, vai mẫu, làn điệu, chiếu Chèo..."
                  className="w-full bg-transparent px-3 py-3 text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-3 text-xs font-medium text-stone-500 hover:text-[#9A2A1E]"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Search Results */}
      {searchResults && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
              Kết quả tra cứu ({totalResults})
            </h2>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-sm text-[#9A2A1E] hover:underline font-medium"
            >
              Đóng kết quả
            </button>
          </div>

          {totalResults === 0 ? (
            <p className="text-sm text-stone-600 py-6">
              Không tìm thấy dữ liệu phù hợp với từ khóa "{searchQuery}".
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.tich.map((item) => (
                <Link
                  key={item.id}
                  to={`/tich-cheo?id=${item.id}`}
                  className="p-4 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E] transition-colors"
                >
                  <span className="text-xs text-[#9A2A1E] font-medium">Tích Chèo</span>
                  <h3 className="mt-1 font-serif text-base font-semibold text-[#1C1917]">
                    {item.ten}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.gioiThieu}</p>
                </Link>
              ))}
              {searchResults.vai.map((item) => (
                <Link
                  key={item.id}
                  to={`/vai-mau?id=${item.id}`}
                  className="p-4 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E] transition-colors"
                >
                  <span className="text-xs text-[#B45309] font-medium">Vai Mẫu</span>
                  <h3 className="mt-1 font-serif text-base font-semibold text-[#1C1917]">
                    {item.ten}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.dacDiemNhanVat}</p>
                </Link>
              ))}
              {searchResults.dieu.map((item) => (
                <Link
                  key={item.id}
                  to={`/lan-dieu?id=${item.id}`}
                  className="p-4 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E] transition-colors"
                >
                  <span className="text-xs text-[#3F2E21] font-medium">Làn Điệu</span>
                  <h3 className="mt-1 font-serif text-base font-semibold text-[#1C1917]">
                    {item.ten}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.dacDiemAmNhac}</p>
                </Link>
              ))}
              {searchResults.chieu.map((item) => (
                <Link
                  key={item.id}
                  to={`/chieu-cheo?id=${item.id}`}
                  className="p-4 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E] transition-colors"
                >
                  <span className="text-xs text-stone-600 font-medium">Chiếu Chèo</span>
                  <h3 className="mt-1 font-serif text-base font-semibold text-[#1C1917]">
                    {item.ten}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2">{item.tinhThanh}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tích Chèo tiêu biểu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kho tàng kịch bản</span>
            </p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-[#1C1917]">
              Tích Chèo Tiêu Biểu
            </h2>
          </div>
          <Link
            to="/tich-cheo"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9A2A1E] hover:underline whitespace-nowrap"
          >
            <span>Xem tất cả ({data.tichCheo.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.tichCheo.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/tich-cheo?id=${item.id}`}
              className="group bg-white border border-stone-200 rounded-md overflow-hidden hover:border-[#9A2A1E]/60 transition-colors flex flex-col"
            >
              <ArchivalImage src={item.hinhAnh} alt={item.ten} />
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-stone-500 flex items-center gap-2">
                  <span>{item.chuDe}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.trangThaiXacMinh}</span>
                </div>
                <h3 className="mt-2 font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#9A2A1E] transition-colors">
                  {item.ten}
                </h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed line-clamp-3 flex-1">
                  {item.gioiThieu}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#9A2A1E]">
                  Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vai Mẫu đặc trưng */}
      <section className="bg-[#F2EDE4]/60 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-stone-300/80 pb-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B45309] font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Hệ thống nhân vật</span>
              </p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-[#1C1917]">
                Vai Mẫu Đặc Trưng
              </h2>
            </div>
            <Link
              to="/vai-mau"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9A2A1E] hover:underline whitespace-nowrap"
            >
              <span>Xem tất cả ({data.vaiMau.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.vaiMau.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/vai-mau?id=${item.id}`}
                className="group bg-white border border-stone-200 rounded-md overflow-hidden hover:border-[#9A2A1E]/60 transition-colors flex flex-col"
              >
                <ArchivalImage src={item.hinhAnh} alt={item.ten} />
                <div className="p-4 flex-1 flex flex-col">
                  <span className="text-xs text-stone-500">{item.loaiVai}</span>
                  <h3 className="mt-1 font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#9A2A1E] transition-colors">
                    {item.ten}
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-600 leading-relaxed line-clamp-3 flex-1">
                    {item.dacDiemNhanVat}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Làn điệu & Chiếu Chèo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Làn điệu nổi bật */}
        <div>
          <div className="flex items-end justify-between border-b border-stone-200 pb-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                <span>Âm nhạc truyền thống</span>
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1917]">
                Làn Điệu Chèo Nổi Bật
              </h2>
            </div>
            <Link
              to="/lan-dieu"
              className="text-sm font-medium text-[#9A2A1E] hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-4">
            {data.lanDieu.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/lan-dieu?id=${item.id}`}
                className="block p-4 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E]/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                    {item.ten}
                  </h3>
                  <span className="text-xs text-stone-500 whitespace-nowrap">
                    {item.nhomLanDieu}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">
                  {item.dacDiemAmNhac}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Chiếu Chèo */}
        <div>
          <div className="flex items-end justify-between border-b border-stone-200 pb-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#3F2E21] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Đơn vị &amp; Không gian</span>
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1917]">
                Chiếu Chèo &amp; Đoàn Chèo
              </h2>
            </div>
            <Link
              to="/chieu-cheo"
              className="text-sm font-medium text-[#9A2A1E] hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-4">
            {data.chieuCheo.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/chieu-cheo?id=${item.id}`}
                className="block p-4 bg-white border border-stone-200 rounded-md hover:border-[#9A2A1E]/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                    {item.ten}
                  </h3>
                  <span className="text-xs text-stone-500 whitespace-nowrap">
                    {item.tinhThanh}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">
                  {item.gioiThieu}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mục đích bảo tồn */}
      <section className="bg-[#3F2E21] text-[#FBF9F5] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-300 font-medium">
            Sứ mệnh bảo tồn di sản
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold">
            Gìn giữ tiếng trống Chèo nơi sân đình Bắc Bộ
          </h2>
          <p className="mt-4 text-base text-stone-200 leading-relaxed max-w-2xl mx-auto">
            Ứng dụng được xây dựng nhằm hệ thống hóa tư liệu về tích Chèo, vai mẫu, làn điệu và các chiếu Chèo còn hoạt động, giúp học sinh, sinh viên và công chúng tiếp cận nghệ thuật truyền thống một cách chính xác, minh bạch và dễ dàng.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/hoi-dap-ai"
              className="px-5 py-2.5 bg-[#9A2A1E] hover:bg-[#7D2117] text-white text-sm font-medium rounded-md transition-colors"
            >
              Tra cứu cùng AI Gemini
            </Link>
            <Link
              to="/gioi-thieu"
              className="px-5 py-2.5 border border-stone-400/60 hover:bg-white/10 text-white text-sm font-medium rounded-md transition-colors"
            >
              Tìm hiểu về dự án
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
