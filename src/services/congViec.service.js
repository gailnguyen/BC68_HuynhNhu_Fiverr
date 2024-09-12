import { http } from "./config";

export const congViecService = {
  // set tên phương thức
  layCongViecTheoTen: (data) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${data}`);
  },
  layMenuLoaiCongViec: () => {
    return http.get("/cong-viec/lay-menu-loai-cong-viec");
  },
  layChiTietLoaiCongViec: (id) => {
    return http.get(`/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`);
  },
  layCongViecTheoChiTietLoai: (id) => {
    return http.get(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`);
  },
  layCongViecChiTiet: (id) => {
    return http.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);
  },
};
