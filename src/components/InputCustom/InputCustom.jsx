import React from "react";

const InputCustom = ({
  contentLabel,
  placeHolder,
  name,
  value,
  type = "text",
  className = "",
  onBlur,
  onChange,
  error,
  touched,
}) => {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {contentLabel}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        type={type}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {/* dùng toán tử điều kiện để kiểm tra touched true và error true mới truyền thông báo vào */}
      {error && touched && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputCustom;
