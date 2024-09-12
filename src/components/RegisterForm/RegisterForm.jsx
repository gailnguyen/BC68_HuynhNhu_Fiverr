import React, { useContext } from "react";
import InputCustom from "../InputCustom/InputCustom";
import { useFormik } from "formik";
import { DatePicker } from "antd";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";

const RegisterForm = () => {
  // dùng useContext lấy ra handleNotification từ App
  const { handleNotification } = useContext(NotificationContext);
  // dùng hook useFormik để quản lý form
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // kiểm tra xem value lấy được đã phù hợp với yêu cầu của cơ sở dữ liệu chưa, chưa thì chỉnh lại
      // values.gender = values.gender == "Nam" ? true : false
      authService
        .signUp({
          ...values,
          gender: values.gender == "Nam" ? true : false,
        })
        .then((res) => {
          console.log(res);
          handleNotification("Đăng ký tài khoản thành công", "success");
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error");
        });
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, notiValidation.notAllowNumber),
      email: yup
        .string()
        .required(notiValidation.empty)
        .email(notiValidation.email),
      password: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^(?=.*[A-Z])(?=.*\d).+$/, notiValidation.password),
      phone: yup.string().required(notiValidation.empty),
      birthday: yup.string().required(notiValidation.empty),
      gender: yup.string().required(notiValidation.empty),
    }),
  });
  return (
    <div>
      <h2 className="uppercase text-3xl font-bold mb-3 text-center">
        Đăng ký tài khoản
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          {/* name */}
          <InputCustom
            contentLabel={"Họ và tên"}
            placeHolder={"Nhập họ và tên"}
            className={"w-1/2 p-3"}
            name={"name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />
          {/* email */}
          <InputCustom
            contentLabel={"Email"}
            placeHolder={"Nhập email"}
            className={"w-1/2 p-3"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          {/* phone */}
          <InputCustom
            contentLabel={"Số điện thoại"}
            placeHolder={"Nhập số điện thoại"}
            className={"w-1/2 p-3"}
            name={"phone"}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
          />
          {/* gender */}
          <div className="w-1/2 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Giới tính
            </label>
            <select
              name="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              //   error={errors.gender}
              //   touched={touched.gender}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.gender && touched.gender ? (
              <p className="text-red-500">{errors.gender}</p>
            ) : null}
          </div>

          {/* password */}
          <InputCustom
            contentLabel={"Mật khẩu"}
            type="password"
            placeHolder={"Nhập mật khẩu"}
            className={"w-1/2 p-3"}
            name={"password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          {/* birthday */}
          <div className="w-1/2 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngày sinh
            </label>
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              onChange={(datejs, dateString) => {
                setFieldValue("birthday", dateString);
              }}
            />
            {errors.birthday && touched.birthday && (
              <p className="text-red-500">{errors.birthday}</p>
            )}
          </div>
          {/* button */}
          <button
            type="submit"
            className="m-3 px-5 py-2 bg-orange-800 text-white rounded-md w-full"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
