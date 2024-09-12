import Password from "antd/es/input/Password";

export const notiValidation = {
  empty: "Vui lòng không bỏ trống",
  email: "Vui lòng nhập đúng định dạng email",
  min: (minValue) => {
    return `Yêu cầu tối thiểu ${minValue} ký tự`;
  },
  max: (maxValue) => {
    return `Yêu cầu tối đa ${maxValue} ký tự`;
  },
  notAllowNumber: "Vui lòng nhập tên không chứa số",
  password: "Vui lòng nhập ít nhất 1 chữ cái viết hoa và phải có số",
};
