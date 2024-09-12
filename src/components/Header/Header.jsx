import React from "react";
import { Link } from "react-router-dom";
import IconHeader from "../Icons/IconHeader";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "./header.scss";
import LinkCustom from "../LinkCustom/LinkCustom";
import { pathDefault } from "../../common/path";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";
import JobBar from "../JobBar/JobBar";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Discover
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Community
      </a>
    ),
    // icon: <SmileOutlined />,
    // disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Guides
      </a>
    ),
    // disabled: true,
  },
  //   {
  //     key: "4",
  //     danger: true,
  //     label: "a danger item",
  //   },
];

const Header = () => {
  return (
    <header className="border-b fixed top-0 left-0 w-full z-10 bg-white">
      <div className="container">
        <div className="header_content flex items-center justify-between py-5">
          <div className="header_logo flex items-center space-x-4">
            <Link to={pathDefault.homePage}>
              <IconHeader color={"#4C4D51"} />
            </Link>
            <FormSearchProduct
              divClass={
                "pl-3 rounded-md border border-gray-400 flex items-center justify-between min-w-[400px]"
              }
              inputClass={"flex- py-1 focus:border-none focus:outline-none"}
            />
          </div>
          <nav className="header_navigation space-x-5 font-semibold">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="cursor-pointer py-2 px-3 hover:bg-gray-100 duration-300 rounded-md"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Fiverr Pro
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="cursor-pointer py-2 px-3 hover:bg-gray-100 duration-300 rounded-md"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Explore
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <button>Tiếng Việt</button>
            <a href="">Become a Seller</a>
            <LinkCustom
              content={"Đăng nhập"}
              to={pathDefault.login}
              className={"py-2 px-5 rounded-md bg-green-600 text-white"}
            ></LinkCustom>
            <LinkCustom
              content={"Đăng ký"}
              to={pathDefault.register}
              className={
                "py-2 px-5 rounded-md border border-green-600 text-green-600"
              }
            >
              Đăng nhập
            </LinkCustom>
          </nav>
        </div>
      </div>
      <JobBar />
    </header>
  );
};

export default Header;
