import React, { useContext } from "react";
import signinAnimation from "./../../assets/animation/signinAnimation.json";
import { useLottie } from "lottie-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { setLocalStorage } from "../../utils/utils";
import { setValueUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputCustom from "../../components/InputCustom/InputCustom";

const LoginPage = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = {
    animationData: signinAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        //
        try {
          const result = await authService.signIn(values);
          console.log(result);
          // B1: lưu dữ liệu xuống local
          setLocalStorage("user", result.data.content);
          dispatch(setValueUser(result.data.content));
          // B2: chuyển hướng người dùng
          handleNotification("Đăng nhập thành công", "success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.log(error);
          handleNotification(error.response.data.content, "error");
        }
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required(notiValidation.empty)
          .email("Vui lòng nhập đúng định dạng email"),
        password: yup
          .string()
          .required(notiValidation.empty)
          .min(6, "Mật khấu có tối thiểu 6 ký tự")
          .max(10, "Mật khẩu tối đa 10 ký tự"),
      }),
    });
  return (
    <div>
      <div className="container">
        <div className="LoginPage_content flex items-center h-screen">
          <div className="LoginPage_img w-1/2">{View}</div>
          <div className="LoginPage_form w-1/2 px-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="uppercase text-3xl font-bold mb-3 text-center">
                Đăng nhập tài khoản
              </h1>
              <InputCustom
                contentLabel={"Email"}
                placeHolder="Vui lòng nhập email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                onBlur={handleBlur}
                touched={touched.email}
              />
              <InputCustom
                contentLabel={"Password"}
                type="password"
                placeHolder="Vui lòng"
                name="password"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                onBlur={handleBlur}
                touched={touched.password}
              />
              <div>
                <button
                  type="submit"
                  className="inline-block w-full py-3 px-5 text-white rounded-lg bg-blue-700"
                >
                  Đăng nhập
                </button>
                <Link
                  className="text-blue-600 mt-5 hover:underline inline-block italic"
                  to="/dang-ky"
                >
                  Bấm vào đây để đăng ký nếu chưa có tài khoản
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
