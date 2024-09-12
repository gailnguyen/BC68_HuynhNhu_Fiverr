import React, { useEffect, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";
import { pathDefault } from "../../common/path";



const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  // console.log(searchParam.get("ma-cong-viec"));

  const [listJob, setListJob] = useState([]);

  useEffect(() => {
    let tenCongViec = searchParam.get("query");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        console.log(res);
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });

    let chiTietLoai = searchParam.get("chi-tiet-loai");
    congViecService
      .layCongViecTheoChiTietLoai(chiTietLoai)
      .then((res) => {
        console.log(res);
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderListJob = () => {
    if (listJob.length !== 0) {
      return (
        <div className="grid grid-cols-4">
          {listJob.map((item, index) => {
            return (
              <Link
                className="m-2 border border-gray-200"
                // to={pathDefault.jobDetail}
                to={`/job-detail?ma-cong-viec=${item.id}`}
              >
                {/* hình ảnh mô tả job */}
                <img src={item.congViec.hinhAnh} className="w-full" alt="" />
                {/* thông tin người đăng */}
                <div className="flex px-3 space-x-3 mt-2 items-center">
                  {/* avatar */}
                  <img
                    src={item.avatar}
                    className="rounded-full size-12"
                    alt=""
                  />
                  {/* tên người đăng */}
                  <div className="ml-3">
                    <h4>{item.tenNguoiTao}</h4>
                    <p>Level 2 Seller</p>
                  </div>
                </div>
                <div className="px-3">
                  {/* mô tả công việc */}
                  <h3 className="m-2">{item.congViec.tenCongViec}</h3>
                  {/* đánh giá offer */}
                  <div className="space-x-2">
                    <i className="fa-solid fa-star text-yellow-400" />
                    <span className="text-yellow-400">
                      {item.congViec.saoCongViec}.0
                    </span>
                    <span className="text-gray-500">
                      ({item.congViec.danhGia})
                    </span>
                  </div>
                </div>
                {/* tim và mức lương */}
                <div className="flex items-center justify-between mt-4 text-gray-500 border-t border-t-1 px-3 py-1">
                  <i className="fa-solid fa-heart" />
                  <div className="">
                    <span>STARTING AT </span>
                    <span>${item.congViec.giaTien}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return <div className="italic">Không tìm thấy kết quả phù hợp</div>;
    }
  };

  return <div className="container mt-36">{renderListJob()}</div>;
};

export default ListJobPage;
