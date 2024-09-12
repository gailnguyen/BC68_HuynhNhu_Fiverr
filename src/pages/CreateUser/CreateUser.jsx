import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/InputCustom/InputCustom";
import { Select, Space } from "antd";
import { skillService } from "../../services/skill.service";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import { useSelector } from "react-redux";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const CreateUser = () => {
  const { handleNotification } = useContext(NotificationContext);

  // set isActive cho nút chuyển trang
  const [isActive, setIsActive] = useState(true);

  // set các bước register
  const [step, setStep] = useState(1);

  // đổ list skills vào select
  const [listSkill, setListSkill] = useState([]);

  // state để lưu hình ảnh mà người dùng upload
  const [uploadImg, setUploadImg] = useState(null);

  // thông bao dung lượng img vượt quy định
  const [errorImg, setErrorImg] = useState("");

  // lấy token từ redux lên để update avatar, dùng useSelector để bóc tách user từ authSlice
  const { user } = useSelector((state) => state.authSlice);

  //xây dựng chức năng thêm người dùng
  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [],
    certification: [],
  });

  // hàm handleChangeValue lấy dữ liệu người dùng
  const handleChangeValue = (event) => {
    event.preventDefault();
    // console.log(event.target);
    const { name, value } = event.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
    // console.log(userValue);
  };

  // hàm handleSubmitFormCreateUser dùng để lấy toàn bộ dữ liệu của user
  const handleSubmitFormCreateUser = (event) => {
    event.preventDefault();
    console.log(userValue);
  };

  // hàm xử lý handlesubmit form update avatar
  const handleSubmitAvatar = (event) => {
    event.preventDefault();
    // gọi đến formData trên backend để truyền img vào giúp update avatar ng dùng
    // khởi tạo formData từ lớp đối tượng FormData của javascript
    let formData = new FormData();
    // kiểm tra dữ liệu trước khi dùng append đẩy dữ liệu lên formData
    if (uploadImg) {
      // truyền vào append gồm 2 dữ liệu: 1 là tên key của formData trên backend, 2 là dữ liệu truyền vào
      formData.append("formFile", uploadImg.img);
      // gọi service để update dữ liệu trên backend
      nguoiDungService
        .uploadAvatar(user.token, formData)
        .then((res) => {
          console.log(res);
          handleNotification("Upload avatar thành công", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // hàm render layout dựa trên step
  const renderLayoutForm = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-3" onSubmit={handleSubmitFormCreateUser}>
            <InputCustom
              contentLabel="Name"
              name="name"
              onChange={handleChangeValue}
            />
            <InputCustom
              contentLabel="Email"
              name="email"
              onChange={handleChangeValue}
            />
            <InputCustom
              contentLabel="Phone"
              name="phone"
              onChange={handleChangeValue}
            />
            <InputCustom
              contentLabel="Password"
              type="password"
              name="password"
              onChange={handleChangeValue}
            />
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Ngày sinh
              </label>
              <input
                type="date"
                name="birthday"
                value={userValue.birthday.split("-").reverse().join("-")}
                onChange={(event) => {
                  console.log(event.target.value);
                  // đảo ngược chuỗi để trả về đúng format dd-mm-yyyy
                  const arrDate = event.target.value
                    .split("-")
                    .reverse()
                    .join("-");
                  console.log(arrDate);
                  setUserValue({ ...userValue, birthday: arrDate });
                  console.log(userValue);
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Giới tính
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="gender"
                onChange={handleChangeValue}
              >
                <option value={true}>Nam</option>
                <option value={false}>Nữ</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Role
              </label>
              <select
                onChange={handleChangeValue}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="role"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Chọn skills
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                options={listSkill}
                onChange={(value, option) => {
                  setUserValue({ ...userValue, skill: value });
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Certifications
              </label>
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                tokenSeparators={[","]}
                options={options}
                onChange={(value, option) => {
                  // console.log(value);
                  setUserValue({ ...userValue, certification: value });
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-black text-white"
                onClick={() => {
                  nguoiDungService
                    .addUsers(userValue)
                    .then((res) => {
                      console.log(res);
                      handleNotification(
                        "Thêm người dùng thành công",
                        "success"
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setIsActive(false);
                }}
              >
                Tạo người dùng
              </button>
            </div>
          </form>
        );

      case 1:
        return (
          <div>
            <form onSubmit={handleSubmitAvatar} className="space-y-2">
              <h2>Set avatar</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Upload hình ảnh
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    const img = event.target.files[0];
                    // console.log(event.target.files[0]);

                    if (img) {
                      if (img.size > 1 * 1024 * 1024) {
                        setErrorImg("* Hình quá kích thước cho phép");
                        return;
                      }
                      const imgUrl = URL.createObjectURL(img);
                      console.log(imgUrl);
                      // dùng object literal để tạo ra 2 thuộc tính img và imgUrl cho object uploadImg
                      setUploadImg({ img, imgUrl });
                      setErrorImg("");
                    }
                  }}
                />
              </div>
              <p className="text-red-500 italic">{errorImg}</p>
              <img src={uploadImg?.imgUrl} width={300} alt="" />
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-green-600 text-white"
              >
                Upload
              </button>
            </form>
          </div>
        );
    }
  };

  useEffect(() => {
    skillService
      .getAllSkills()
      .then((res) => {
        // console.log(res);
        let newListSkill = res.data.content.map((skill, index) => {
          return { label: skill.tenSkill, value: skill.tenSkill };
        });
        // console.log(newListSkill);
        setListSkill(newListSkill);
        // setIsActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-5">
        Form tạo người dùng trong hệ thống admin
      </h2>
      {renderLayoutForm()}
      <button
        disabled={isActive}
        className={`bg-blue-600 text-white rounded-md px-5 py-2 my-3 ${
          isActive ? "cursor-not-allowed" : null
        }`}
        onClick={() => {
          setStep(step + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default CreateUser;
