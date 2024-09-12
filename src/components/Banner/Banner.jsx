import React from "react";
import "../../styles/font.scss";
import "./banner.scss";
import FormSearchProduct from "../FormSearchProduct/FormSearchProduct";

const Banner = () => {
  const arrList = [
    {
      title: "Programming & Tech",
      icon: "../../../public/symbol/programming-tech.49dbf0d.svg",
    },
    {
      title: "Graphics & Design",
      icon: "../../../public/symbol/graphics-design.3272c08.svg",
    },
    {
      title: "Digital Marketing",
      icon: "../../../public/symbol/digital-marketing.85e8846.svg",
    },
    {
      title: "Writing & Translation",
      icon: "../../../public/symbol/writing-translation.dc66eb8.svg",
    },
    {
      title: "Video & Animation",
      icon: "../../../public/symbol/video-animation.21fb1d6.svg",
    },
    {
      title: "AI Services",
      icon: "../../../public/symbol/ai-services.40511da.svg",
    },
    {
      title: "Music & Audio",
      icon: "../../../public/symbol/music-audio.6a411f2.svg",
    },
    {
      title: "Business",
      icon: "../../../public/symbol/business.772c3c9.svg",
    },
    {
      title: "Consulting",
      icon: "../../../public/symbol/consulting.93989a4.svg",
    },
  ];
  return (
    <section>
      <div className="homepage_banner">
        <div className="homepage_layout container mt-36 text-center">
          <div className="w-1/2 homepage_content">
            <h2 className="font-bold text-white mb-8">
              Find the right <span>freelance</span> service, right away
            </h2>
            <FormSearchProduct
              divClass={
                "pl-3 rounded-md bg-white border border-gray-400 flex items-center justify-between"
              }
              inputClass={
                "flex- py-3 focus:border-none focus:outline-none w-2/3"
              }
            />
          </div>
          <div className="w-1/2 container homepage_trustedby flex justify-between opacity-60">
            <span className="text-white text-sm font-semibold">
              Trusted by:
            </span>
            <ul className="flex items-center justify-between space-x-8">
              <li>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg"
                  alt="meta"
                  width={70}
                  height={14}
                />
              </li>
              <li>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg"
                  alt="Google"
                  width="53.41"
                  height="17.87"
                />
              </li>
              <li>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg"
                  alt="NETFLIX"
                  width="53.64"
                  height="14.37"
                />
              </li>
              <li>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg"
                  alt="P&G"
                  width="33.13"
                  height="13.8"
                />
              </li>
              <li>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg"
                  alt="PayPal"
                  width="53.01"
                  height="12.69"
                />
              </li>
              <li>
                <img
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg"
                  alt="Payoneer"
                  width="82.42"
                  height={16}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="homepage_list container grid grid-cols-9 gap-8">
        {arrList.map((item) => {
          return (
            <div
              className="list_item border p-5 rounded-2xl space-y-5 cursor-pointer"
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <img src={item.icon} alt="" />
              <h4>{item.title}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;
