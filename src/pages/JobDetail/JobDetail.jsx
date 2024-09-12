import React, { useEffect, useState } from "react";
import { congViecService } from "../../services/congViec.service";
import { useSearchParams } from "react-router-dom";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { binhLuanService } from "../../services/binhLuan.service";
import InputCustom from "../../components/InputCustom/InputCustom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import "./jobDetail.scss";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
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
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const JobDetail = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [jobDetail, setJobDetail] = useState([]);
  const [comment, setComment] = useState([]);
  const currentTime = new Date();
  const { user } = useSelector((state) => state.authSlice);

  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    let maCongViec = searchParam.get("ma-cong-viec");
    console.log(maCongViec);
    congViecService
      .layCongViecChiTiet(maCongViec)
      .then((res) => {
        console.log(res);
        setJobDetail(res.data.content[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    binhLuanService
      .layBinhLuanTheoCongViec(maCongViec)
      .then((res) => {
        console.log(res);
        setComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newComment]);

  const { values, handleChange, handleSubmit, handleBlur, touched } = useFormik(
    {
      initialValues: {
        maNguoiBinhLuan: "",
        maCongViec: "",
        noiDung: "",
        ngayBinhLuan: "",
      },

      onSubmit: (values) => {
        values.maCongViec = searchParam.get("ma-cong-viec");
        values.ngayBinhLuan = currentTime;
        values.maNguoiBinhLuan = user.user.id;
        console.log(values);

        binhLuanService
          .postBinhLuan(user.token, values)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
  );

  const renderJobDetail = () => {
    if (!jobDetail || !jobDetail.congViec) {
      return <div className="mt-36">...loading</div>;
    }
    return (
      <div className="job_detail space-y-10">
        {/* breadcrumbs */}
        <ul className="breadcrumbs flex items-center">
          <li>
            <a className="breadcrumbs-home" href="#">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/home-breadcrumb.2ba1681.svg"
                alt=""
              />
            </a>
          </li>
          <li>
            <span className="divider mx-3 text-gray-400">/</span>
            <span>{jobDetail.tenLoaiCongViec}</span>
          </li>
          <li>
            <span className="divider mx-3 text-gray-400">/</span>
            <span>{jobDetail.tenNhomChiTietLoai}</span>
          </li>
          <li>
            <span className="divider mx-3 text-gray-400">/</span>
            <span>{jobDetail.tenChiTietLoai}</span>
          </li>
        </ul>

        {/* title */}
        <div className="grid grid-cols-3 gap-16 px-16">
          <div className="col-span-2 space-y-5">
            {/* job title */}
            <h3>{jobDetail.congViec.tenCongViec}</h3>

            {/* author */}
            <div className="user flex items-center gap-8">
              <img
                src={jobDetail.avatar}
                width="80px"
                className="rounded-full"
                alt=""
              />

              <div className="space-y-3">
                <h4 className="uppercase font-bold">{jobDetail.tenNguoiTao}</h4>
                <div className="space-x-2">
                  <i class="fa-solid fa-star"></i>
                  <span>{jobDetail.congViec.saoCongViec}.0</span>
                  <span>({jobDetail.congViec.danhGia})</span>
                </div>
              </div>
            </div>

            {/* job image */}
            <img src={jobDetail.congViec.hinhAnh} width="100%" alt="" />

            {/* about gig */}
            <div className="space-y-3">
              <h4>About this Gig:</h4>
              <p>{jobDetail.congViec.moTaNgan}</p>
              <span>Read More</span>
            </div>

            {/* Q&A */}
            <div id="accordion-collapse" data-accordion="collapse">
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-collapse-body-1"
                >
                  <span>What is Flowbite?</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-1"
                className="hidden"
                aria-labelledby="accordion-collapse-heading-1"
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is an open-source library of interactive components
                    built on top of Tailwind CSS including buttons, dropdowns,
                    modals, navbars, and more.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Check out this guide to learn how to{"{"}" "{"}"}
                    <a
                      href="/docs/getting-started/introduction/"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      get started
                    </a>
                    {"{"}" "{"}"}
                    and start developing websites even faster with components on
                    top of Tailwind CSS.
                  </p>
                </div>
              </div>
              <h2 id="accordion-collapse-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target="#accordion-collapse-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-2"
                >
                  <span>Is there a Figma file available?</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-2"
                className="hidden"
                aria-labelledby="accordion-collapse-heading-2"
              >
                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is first conceptualized and designed using the
                    Figma software so everything you see in the library has a
                    design equivalent in our Figma file.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Check out the{"{"}" "{"}"}
                    <a
                      href="https://flowbite.com/figma/"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Figma design system
                    </a>
                    {"{"}" "{"}"}
                    based on the utility classes from Tailwind CSS and
                    components from Flowbite.
                  </p>
                </div>
              </div>
              <h2 id="accordion-collapse-heading-3">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                  data-accordion-target="#accordion-collapse-body-3"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-3"
                >
                  <span>
                    What are the differences between Flowbite and Tailwind UI?
                  </span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-collapse-body-3"
                className="hidden"
                aria-labelledby="accordion-collapse-heading-3"
              >
                <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    The main difference is that the core components from
                    Flowbite are open source under the MIT license, whereas
                    Tailwind UI is a paid product. Another difference is that
                    Flowbite relies on smaller and standalone components,
                    whereas Tailwind UI offers sections of pages.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    However, we actually recommend using both Flowbite, Flowbite
                    Pro, and even Tailwind UI as there is no technical reason
                    stopping you from using the best of two worlds.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Learn more about these technologies:
                  </p>
                  <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                    <li>
                      <a
                        href="https://flowbite.com/pro/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Flowbite Pro
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tailwindui.com/"
                        rel="nofollow"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Tailwind UI
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <ul>
                <li>
                  Will you work on projects that are not Fantasy or Science
                  Fiction?
                </li>
                <li>Are you a native English speaker?</li>
                <li>What's the cost for longer projects?</li>
                <li>
                  Could you proofread a project for me in just a few days?
                </li>
                <li>What document types can you work with?</li>
              </ul>
            </div>

            {/* review */}
            <div className="w-full max-w-2xl mx-auto font-sans">
              <h3 className="text-lg mb-3">Reviews</h3>
              <p className="text-sm mb-5">206 reviews for this Gig</p>
              <div className="flex justify-between">
                {/* Star Rating Section */}
                <div className="w-1/2">
                  <div className="flex items-center mb-2">
                    <span className="w-20 text-sm">5 Stars</span>
                    <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                      <div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ width: "99%" }}
                      />
                    </div>
                    <span className="text-sm">(204)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-20 text-sm">4 Stars</span>
                    <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                      <div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ width: "1%" }}
                      />
                    </div>
                    <span className="text-sm">(2)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-20 text-sm">3 Stars</span>
                    <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                      <div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <span className="text-sm">(0)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-20 text-sm">2 Stars</span>
                    <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                      <div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <span className="text-sm">(0)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-20 text-sm">1 Star</span>
                    <div className="relative flex-grow h-2 bg-gray-300 mx-3">
                      <div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <span className="text-sm">(0)</span>
                  </div>
                </div>
                {/* Rating Breakdown Section */}
                <div className="w-2/5">
                  <div className="flex items-center mb-3">
                    <span className="text-xl mr-2">★★★★★</span>
                    <span className="text-sm">5.0</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Seller communication level</span>
                    <span className="text-sm">★★★★★ 5</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Recommend to a friend</span>
                    <span className="text-sm">★★★★★ 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Service as described</span>
                    <span className="text-sm">★★★★★ 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* sort review */}
            <div>
              <div className="flex">
                <p>Sort By</p>
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Most relevant
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <p>
                <i class="fa-regular fa-square"></i> Only show reviews with
                files (83)
              </p>
            </div>

            {/* bình luận */}
            {comment.map((item) => {
              return (
                <div className="w-full border border-gray-200 rounded-lg space-y-5 my-5 p-3">
                  <div className="flex py-3 border-b-2">
                    <img
                      src={item.avatar}
                      width="50px"
                      height="50px"
                      className="rounded-full"
                      alt=""
                    />
                    <div className="ms-5">
                      <h4>{item.tenNguoiBinhLuan}</h4>
                      <p>Mexico</p>
                    </div>
                  </div>
                  <div>
                    <span className="star">
                      {item.saoBinhLuan}.0 <i class="fa-solid fa-star"></i>
                    </span>
                    <span className="time ms-3 text-sm text-gray-400">
                      {item.ngayBinhLuan}
                    </span>
                    <p className="comment my-5 font-semibold">{item.noiDung}</p>
                  </div>
                </div>
              );
            })}

            <form onSubmit={handleSubmit}>
              <InputCustom
                contentLabel={"Add a comment"}
                type="large-input"
                placeHolder="Leave a comment"
                name="noiDung"
                onChange={handleChange}
                value={values.noiDung}
                onBlur={handleBlur}
                touched={touched.password}
              />
              <button className="py-2 px-5 bg-black text-white rounded-md mt-3">
                Comment
              </button>
            </form>
          </div>

          <div className="sticky top-36 h-fit">
            <div className="grid grid-cols-3 items-center justify-between text-center">
              <div>Basic</div>
              <div>Standard</div>
              <div>Premium</div>
            </div>
            <div className="flex justify-between">
              <div>{jobDetail.congViec.tenCongViec}</div>
              <div>${jobDetail.congViec.giaTien}</div>
            </div>
            <div>Mô tả công việc: {jobDetail.congViec.moTaNgan}</div>
            <div>
              <button className="w-full py-2 px-5 bg-black text-white rounded-md">
                Đăng ký (${jobDetail.congViec.giaTien})
              </button>
            </div>
            <div>
              <button className="w-full py-2 px-5 border rounded-md">
                Contact me
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="mt-36 container">{renderJobDetail()}</div>;
};

export default JobDetail;
