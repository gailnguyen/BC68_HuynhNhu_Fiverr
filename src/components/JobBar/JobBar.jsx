import React, { useEffect, useState } from "react";
import { congViecService } from "../../services/congViec.service";
import { Link } from "react-router-dom";
import "../../styles/font.scss";
import "./jobBar.scss";
import { pathDefault } from "../../common/path";

const JobBar = () => {
  const [menuJobType, setMenuJobType] = useState([]);

  useEffect(() => {
    congViecService
      .layMenuLoaiCongViec()
      .then((res) => {
        console.log(res);
        setMenuJobType(res.data.content);
        console.log(menuJobType);
      })
      .catch((err) => {
        console.log(err);
      });


      
  }, []);

  return (
    <div className="job_bar border-t">
      <div className="container flex justify-between">
        {menuJobType.map((itemLoai) => {
          return (
            <div className="relative group py-2">
              <Link
                to={`${pathDefault.jobType}?loai-cong-viec=${itemLoai.id}`}
                className="hover:cursor-pointer"
              >
                {itemLoai.tenLoaiCongViec}
              </Link>

              <div className="absolute w-[250px] border top-10 left-0 opacity-0 group-hover:opacity-100">
                {itemLoai.dsNhomChiTietLoai.map((itemNhom) => {
                  return (
                    <div className="bg-white py-5 px-10">
                      {/* lấy danh sách theo chi tiết loại */}
                      <h4 className="font-bold">{itemNhom.tenNhom}</h4>

                      {/* lấy danh sách theo từng chi tiết */}
                      <div>
                        {itemNhom.dsChiTietLoai.map((itemChiTiet) => {
                          return (
                            <Link
                              className="hover:cursor-pointer"
                              to={`/ma-chi-tiet-loai-${itemChiTiet.id}`}
                            >
                              {itemChiTiet.tenChiTiet}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobBar;
