export default function GioiThieuPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-stone-200 pb-6 mb-10">
        <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold">
          Về dự án
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Giới Thiệu Ứng Dụng Chèo Sân Đình Bắc Bộ
        </h1>
      </div>

      {/* A. Giới thiệu dự án */}
      <section className="space-y-4 text-base leading-relaxed text-stone-700">
        <h2 className="font-serif text-2xl font-bold text-[#3F2E21]">
          Mục đích &amp; Giá trị văn hóa
        </h2>
        <p>
          Nghệ thuật Chèo là loại hình sân khấu dân gian truyền thống lâu đời, gắn bó mật thiết với đời sống sinh hoạt văn hóa làng xã vùng đồng bằng Bắc Bộ. Từ không gian chiếu Chèo nơi sân đình cổ kính, những tích Chèo, vai mẫu và làn điệu dân gian đã phản ánh sâu sắc tâm hồn, đạo lý và khát vọng nhân văn của người Việt.
        </p>
        <p>
          Ứng dụng web <strong>Chèo Sân Đình và Sân Khấu Dân Gian Bắc Bộ</strong> được xây dựng nhằm hệ thống hóa tư liệu về các tích Chèo cổ, hệ thống vai mẫu, làn điệu truyền thống và danh sách các chiếu Chèo, đoàn Chèo đang hoạt động, đồng thời tích hợp công cụ hỏi đáp AI Gemini để hỗ trợ học sinh, sinh viên, giáo viên và công chúng tra cứu thuận tiện.
        </p>
      </section>

      {/* B. Thông tin thực hiện dự án */}
      <section className="mt-12 bg-white border border-stone-200 rounded-md p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-[#9A2A1E] font-semibold">
          Hồ sơ thực hiện
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-[#1C1917]">
          Thông Tin Thực Hiện Dự Án
        </h2>

        <dl className="mt-6 divide-y divide-stone-200 text-sm sm:text-base">
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <dt className="font-medium text-stone-500">Sinh viên thực hiện</dt>
            <dd className="sm:col-span-2 font-semibold text-[#1C1917]">
              Trương Văn Quý
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <dt className="font-medium text-stone-500">Mã sinh viên</dt>
            <dd className="sm:col-span-2 font-semibold text-[#1C1917] tabular-nums">
              PH68121
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <dt className="font-medium text-stone-500">Nhóm</dt>
            <dd className="sm:col-span-2 font-semibold text-[#1C1917] tabular-nums">
              2
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <dt className="font-medium text-stone-500">Chương trình</dt>
            <dd className="sm:col-span-2 font-semibold text-[#1C1917]">
              Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <dt className="font-medium text-stone-500">Tính chất dự án</dt>
            <dd className="sm:col-span-2 font-semibold text-[#9A2A1E]">
              Dự án xã hội phi lợi nhuận
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
