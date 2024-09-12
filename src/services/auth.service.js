import { http } from "./config";

export const authService = {
  // tên phương thức trùng với end point trên api để tương tác vs backend
  signUp: (data) => {
    // gọi http đã setup trong config.js rồi gắn thêm method + end point còn thiếu
    return http.post("/auth/signup", data);
  },
  signIn: (data) => {
    return http.post("/auth/signin", data);
  },
};
