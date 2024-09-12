import React, { useEffect, useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import IconSearch from "../Icons/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { congViecService } from "../../services/congViec.service";
import { Dropdown, Space } from "antd";
import useDebounce from "../../hooks/useDebounce";

const FormSearchProduct = ({ divClass, inputClass }) => {
  // điều hướng người dùng khi submit form tìm kiếm, truyền keyword lên url
  const navigate = useNavigate();
  //   const isResponsive = useResponsive({
  //     mobile: 576,
  //     tablet: 992,
  //   });
  //   console.log(isResponsive);

  // state quản lý thông tin người dùng nhập vào input
  const [searchValue, setSearchValue] = useState("");

  // state quản lý đóng mở dropdown suggestion
  const [checkOpen, setCheckOpen] = useState(false);

  // state quản lý list job gợi ý
  const [listJobSuggest, setListJobSuggest] = useState([]);

  // dùng useDebounce để delay call api
  const debouncedValue = useDebounce(searchValue, 500);

  //   hàm chạy sự kiện onSubmit cho button
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
    navigate(`${pathDefault.listJob}?query=${searchValue}`);
  };

  // tạo hook useEffect để xử lý debounce
  useEffect(() => {
    // dùng debounce trong onChange để delay việc gửi dữ liệu lên backend
    // console.log(debouncedValue);

    if (searchValue) {
      // gọi api lấy dữ liệu sản phẩm để đưa suggest cho user
      congViecService
        .layCongViecTheoTen(searchValue)
        .then((res) => {
          console.log(res);
          setCheckOpen(true);
          let newListJobSuggest = res.data.content;
          if (newListJobSuggest.length == 0) {
            newListJobSuggest.push({
              key: 1,
              label: (
                <p className="italic">Không tìm thấy kết quả nào phù hợp</p>
              ),
            });
          } else {
            newListJobSuggest = res.data.content
              .slice(0, 4)
              .map((item, index) => {
                return {
                  key: index,
                  label: (
                    <Link
                      to={pathDefault.jobDetail}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.congViec.hinhAnh}
                        className="h-14"
                        alt=""
                      />
                      <div>
                        <h4>{item.congViec.tenCongViec}</h4>
                        <p className="italic">
                          Starting at ${item.congViec.giaTien}
                        </p>
                      </div>
                    </Link>
                  ),
                };
              });
          }
          setListJobSuggest(newListJobSuggest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debouncedValue]);

  //   hàm chạy sự kiện onChange cho input
  const handleChange = (e) => {
    // const { value, name } = event.target
    setSearchValue(e.target.value);

    // nếu input rỗng thì ko open dropdown
    if (!e.target.value) {
      setCheckOpen(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Dropdown
          menu={{
            items: listJobSuggest,
          }}
          open={checkOpen}
        >
          <div className={divClass}>
            <input
              type="text"
              placeholder="Nhập thông tin cần tìm"
              className={inputClass}
              onChange={handleChange}
              value={searchValue}
            />
            <button type="submit" className="p-2">
              <IconSearch size="20" color="gray" />
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default FormSearchProduct;
