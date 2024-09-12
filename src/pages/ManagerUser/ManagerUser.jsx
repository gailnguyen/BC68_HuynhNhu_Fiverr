import React, { useContext, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { useDispatch, useSelector } from "react-redux";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";

const ManagerUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listUsers } = useSelector((state) => state.nguoiDungSlice);
  useEffect(() => {
    dispatch(getValueUserApi());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      // text là dữ liệu nằm trong thuộc tính avatar, và nó là đường dẫn, do đó truyền trực tiếp text vào src để hiển thị hình ảnh
      render: (text) => {
        return <img src={text} width={50} height={50} alt="" />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) => {
        return <Tag color={text ? "blue" : "cyan"}>{text ? "Nam" : "Nữ"}</Tag>;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        return (
          <Tag color={text == "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
            {text}
          </Tag>
        );
      },
    },
    {
      // action dùng là chức năng xóa sửa
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              nguoiDungService
                .deleteUsers(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  // gọi api lần nữa để cập nhật dữ liệu
                  dispatch(getValueUserApi());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  // cập nhật lại data khi xóa thất bại
                  dispatch(getValueUserApi());
                });
            }}
            className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-red-500/90 duration-300"
          >
            Xóa
          </button>
          <button className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-600/90 duration-300">
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={listUsers} />;
};
export default ManagerUser;
