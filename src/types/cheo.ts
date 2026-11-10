export interface TichCheo {
  id: string;
  ten: string;
  tenGoiKhac: string;
  chuDe: string;
  gioiThieu: string;
  tomTatCotTruyen: string;
  nguonGoc: string;
  nhanVat: string[];
  giaTriVanHoa: string;
  hinhAnh: string;
  taiLieuThamKhao: string;
  trangThaiXacMinh: string;
}

export interface VaiMau {
  id: string;
  ten: string;
  loaiVai: string;
  dacDiemNhanVat: string;
  tinhCach: string;
  hoaTrangTrangPhuc: string;
  phongCachDienXuat: string;
  tichCheoLienQuan: string[];
  hinhAnh: string;
  nguonThamKhao: string;
  trangThaiXacMinh: string;
}

export interface LanDieu {
  id: string;
  ten: string;
  tenGoiKhac: string;
  nhomLanDieu: string;
  nguonGoc: string;
  dacDiemAmNhac: string;
  nhipDieu: string;
  cachTheHien: string;
  noiDungCamXuc: string;
  yNghiaVanHoa: string;
  hoanCanhSuDung: string;
  viDuTrichDoan: string;
  ngheNhanBieuDien: string;
  hinhAnh: string;
  nguonThamKhao: string;
  trangThaiXacMinh: string;
}

export interface ChieuCheo {
  id: string;
  ten: string;
  diaChi: string;
  tinhThanh: string;
  gioiThieu: string;
  lichSu: string;
  ngheNhanDaiDien: string;
  hoatDongBieuDien: string;
  lichBieuDien: string;
  lienHe: string;
  website: string;
  nguonThamKhao: string;
  trangThaiHoatDong: string;
  trangThaiXacMinh: string;
}

export interface NguonTuLieu {
  id: string;
  ten: string;
  tacGia: string;
  namXuatBan: string;
  loaiTaiLieu: string;
  moTa: string;
  duongDan: string;
  nhomLienQuan: string[];
}

export interface CheoDataset {
  tichCheo: TichCheo[];
  vaiMau: VaiMau[];
  lanDieu: LanDieu[];
  chieuCheo: ChieuCheo[];
  nguonTuLieu: NguonTuLieu[];
}
