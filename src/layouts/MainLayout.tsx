import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, MessageSquareText } from "lucide-react";

const NAV_ITEMS = [
  { to: "/tich-cheo", label: "Tích Chèo" },
  { to: "/vai-mau", label: "Vai Mẫu" },
  { to: "/lan-dieu", label: "Làn Điệu" },
  { to: "/chieu-cheo", label: "Chiếu Chèo" },
  { to: "/nguon-tu-lieu", label: "Tư Liệu" },
  { to: "/gioi-thieu", label: "Giới Thiệu" },
];

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <Link
            to="/"
            className="font-serif text-xl font-bold tracking-tight text-[#9A2A1E] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A2A1E] rounded-sm"
          >
            Chèo Sân Đình
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    isActive
                      ? "border-[#9A2A1E] text-[#9A2A1E] font-semibold"
                      : "border-transparent hover:text-[#9A2A1E] hover:border-stone-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/hoi-dap-ai"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#9A2A1E] rounded-md hover:bg-[#7D2117] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9A2A1E]"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Hỏi Đáp AI</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 text-stone-700 hover:text-[#9A2A1E] rounded-md border border-stone-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#9A2A1E]/10 text-[#9A2A1E] font-semibold"
                      : "text-stone-700 hover:bg-stone-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 bg-[#F2EDE4]/70 text-stone-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3F2E21]">
                Chèo Sân Đình Bắc Bộ
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 max-w-sm">
                Cổng thông tin lưu trữ, tra cứu và góp phần bảo tồn nghệ thuật Chèo truyền thống và sân khấu dân gian Bắc Bộ.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Danh mục lưu trữ
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/tich-cheo" className="hover:text-[#9A2A1E] transition-colors">
                    Thư viện Tích Chèo
                  </Link>
                </li>
                <li>
                  <Link to="/vai-mau" className="hover:text-[#9A2A1E] transition-colors">
                    Thư viện Vai Mẫu
                  </Link>
                </li>
                <li>
                  <Link to="/lan-dieu" className="hover:text-[#9A2A1E] transition-colors">
                    Chú giải Làn Điệu
                  </Link>
                </li>
                <li>
                  <Link to="/chieu-cheo" className="hover:text-[#9A2A1E] transition-colors">
                    Danh sách Chiếu Chèo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Thông tin &amp; Tư liệu
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/nguon-tu-lieu" className="hover:text-[#9A2A1E] transition-colors">
                    Nguồn tư liệu tham khảo
                  </Link>
                </li>
                <li>
                  <Link to="/hoi-dap-ai" className="hover:text-[#9A2A1E] transition-colors">
                    Hỏi đáp cùng Trợ lý AI
                  </Link>
                </li>
                <li>
                  <Link to="/gioi-thieu" className="hover:text-[#9A2A1E] transition-colors">
                    Giới thiệu dự án &amp; Nhóm thực hiện
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-stone-300/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© 2026 Dự án Bảo tồn Nghệ thuật Chèo Sân Đình Bắc Bộ — Dự án xã hội phi lợi nhuận.</p>
            <p>Dữ liệu được tổng hợp và phân loại rõ ràng theo trạng thái xác minh.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
