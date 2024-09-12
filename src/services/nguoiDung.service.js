import { http } from "./config";
export const nguoiDungService = {
  getAllUsers: () => {
    return http.get("/users");
  },
  deleteUsers: (id) => {
    return http.delete(`/users?id=${id}`);
  },
  addUsers: (data) => {
    return http.post("/users", data);
  },
  uploadAvatar: (token, data) => {
    // backend yêu cầu truyền vào 1 headers token để upload hình ảnh nên phải truyền vào 1 tham số config
    return http.post("/users/upload-avatar", data, {
      headers: {
        token,
      },
    });
  },
};
