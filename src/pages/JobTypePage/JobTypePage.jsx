import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";
import { Carousel } from "antd";
import "../../styles/font.scss";
import "./jobTypePage.scss";
import { pathDefault } from "../../common/path";

const JobTypePage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  // console.log(searchParam.get("loai-cong-viec"));

  const [jobTypeName, setJobTypeName] = useState("");
  const [listJobType, setListJobType] = useState([]);

  const popularListItem = [
    {
      imgUrl: "../../../public/image/job_type_page/1.png",
      title: "Minimalist Logo Design",
    },
    {
      imgUrl: "../../../public/image/job_type_page/2.png",
      title: "Illustration",
    },
    {
      imgUrl: "../../../public/image/job_type_page/3.png",
      title: "Website Design",
    },
    {
      imgUrl: "../../../public/image/job_type_page/4.png",
      title: "Architecture & Interior Design",
    },
    {
      imgUrl: "../../../public/image/job_type_page/5.png",
      title: "AI Artists",
    },
    {
      imgUrl: "../../../public/image/job_type_page/6.png",
      title: "Image Editing",
    },
    {
      imgUrl: "../../../public/image/job_type_page/7.png",
      title: "T-Shirts & Merchandise",
    },
    {
      imgUrl: "../../../public/image/job_type_page/8.png",
      title: "Industrial & Product Design",
    },
    {
      imgUrl: "../../../public/image/job_type_page/9.png",
      title: "Social Media Design",
    },
  ];

  useEffect(() => {
    let maLoaiCongViec = searchParam.get("loai-cong-viec");
    congViecService
      .layChiTietLoaiCongViec(maLoaiCongViec)
      .then((res) => {
        console.log(res);
        setListJobType(res.data.content[0].dsNhomChiTietLoai);
        setJobTypeName(res.data.content[0].tenLoaiCongViec);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   let maChiTiet = searchParam.get("chi-tiet-cong-viec");
  // }, [jobTypeName]);

  const renderContent = () => {
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="job_bannner">
          <div className="job_banner_content bg-green-950 text-white text-center p-10">
            <h2>{jobTypeName}</h2>
            <p>Designs to make you stand out.</p>
            <button className="py-2 px-5 border border-white rounded-md">
              How Fiverr Work
            </button>
          </div>
        </div>

        <div className="job_carousel my-14 space-y-5">
          <h4>Most popular in {jobTypeName}</h4>

          <Carousel
            arrows={true}
            infinite={false}
            dots={false}
            slidesToShow={4.3}
            slidesToScroll={5}
          >
            {popularListItem.map((item) => {
              return (
                <div className="carousel-item">
                  <div className="item_layout flex items-center justify-between border rounded-2xl p-2 me-5">
                    <img src={item.imgUrl} width={60} alt="" />
                    <div className="item_text flex items-center">
                      <h5 className="item_title mx-5">{item.title}</h5>
                      <i class="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="job_explore">
          <h4>Explore {jobTypeName}</h4>

          <div className="grid grid-cols-4 gap-8">
            {listJobType.map((item) => {
              return (
                <div className="job_type mt-7">
                  <div className="mb-8">
                    <img
                      src={item.hinhAnh}
                      style={{ borderRadius: "10px" }}
                      alt=""
                    />
                  </div>

                  <div className="space-y-5">
                    <h5>{item.tenNhom}</h5>
                    {item.dsChiTietLoai.map((item) => {
                      return (
                        <Link
                          className="job_detail block hover:cursor-pointer"
                          to={`${pathDefault.listJob}?chi-tiet-loai=${item.id}`}
                        >
                          {item.tenChiTiet}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="job_suggestion my-20 text-center">
          <h4>You might be interested in {jobTypeName} FAQs</h4>
          <ul className="flex flex-wrap items-center justify-center space-x-8 space-y-8 text-center">
            <li>Proofreading & Editing</li>
            <li>Website Content</li>
            <li>English to German Translations</li>
            <li>English to Spanish Translations</li>
            <li>Resume Writing</li>
            <li>Scriptwriting</li>
            <li>Translation Services</li>
            <li>AI Content Editing</li>
            <li>Articles and Blogposts</li>
            <li>Book and eBook Writing</li>
            <li>Creative Writing</li>
            <li>Transcription Services</li>
            <li>Cover Letters</li>
          </ul>
        </div>
      </div>
    );
  };

  return <section className="job_type mt-32">{renderContent()}</section>;
};

export default JobTypePage;
