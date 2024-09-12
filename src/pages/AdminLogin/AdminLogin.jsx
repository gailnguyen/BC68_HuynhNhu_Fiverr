import React, { useContext } from "react";
import InputCustom from "../../components/InputCustom/InputCustom";
import { useFormik } from "formik";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/utils";
import { setValueUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const AdminLogin = () => {
  // bắn phương thức setValueUser từ redux store xuống cpn
  const dispatch = useDispatch();

  // chuyển hướng ng dùng về trang admin sau khi đăng nhập thành công
  const navigate = useNavigate();

  // destructuring gọi đến hàm handleNotification để thông báo
  const { handleNotification } = useContext(NotificationContext);

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
      authService
        .signIn(values)
        .then((res) => {
          console.log(res);
          // kiểm tra người signin có phải là admin
          if (res.data.content.user.role == "USER") {
            // thông báo không cho phép truy cập
            handleNotification("Bạn không được phép truy cập", "error");
            // kiểm tra số lần truy cập bất thường thông qua biến viPham
            let viPham = getLocalStorage("viPham");
            if (!viPham) {
              setLocalStorage("viPham", 1);
            } else {
              viPham++;
              viPham == 3
                ? (window.location.href = "https://google.com")
                : setLocalStorage("viPham", viPham);
            }
          } else {
            setLocalStorage("user", res.data.content);
            handleNotification("Đăng nhập trang admin thành công", "success");
            // đẩy thông tin user lên store redux và lưu vào local storage (thông qua reducer setValueUser)
            dispatch(setValueUser(res.data.content));
            // xóa lỗi viPham trong local storage
            localStorage.removeItem("viPham");
            // chuyển người ng dùng về trang admin
            navigate(pathDefault.admin);
          }
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error");
        });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="admin_login h-screen flex">
          <div className="admin_login_animation w-1/2"></div>
          <div className="admin_login_form w-1/2 flex flex-col justify-center">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold text-center">
                Trang đăng nhập admin
              </h1>
              <InputCustom
                contentLabel={"Email"}
                name={"email"}
                onChange={handleChange}
                value={values.name}
              />
              <InputCustom
                contentLabel={"Mật khẩu"}
                name={"password"}
                type="password"
                onChange={handleChange}
                value={values.password}
              />
              <button
                type="submit"
                className="py-2 px-5 bg-black text-white rounded-lg inline-block w-full"
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
