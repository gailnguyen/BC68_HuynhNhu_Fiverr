import React, { useEffect } from "react";
import { Carousel } from "antd";
import "../../styles/font.scss";
import "./homepage.scss";
import IconFiverrPro from "../Icons/IconFiverrPro";
import IconFiverrLogoMaker from "../Icons/IconFiverrLogoMaker";

const HomePageContent = () => {
  // const onChange = (currentSlide) => {
  //   console.log(currentSlide);
  // };

  const serviceItems = [
    {
      id: 1,
      content: "Website Development",
      imgurl: "../../../public/image/popular_services/website-development.png",
      backgroundColor: "#1F8447",
    },
    {
      id: 2,
      content: "Logo Design",
      imgurl: "../../../public/image/popular_services/logo-design.png",
      backgroundColor: "#FF7640",
    },
    {
      id: 3,
      content: "SEO",
      imgurl: "../../../public/image/popular_services/seo.png",
      backgroundColor: "#003912",
    },
    {
      id: 4,
      content: "Architecture & Interior Design",
      imgurl: "../../../public/image/popular_services/architecture-design.png",
      backgroundColor: "#4D1727",
    },
    {
      id: 5,
      content: "Social Media Marketing",
      imgurl:
        "../../../public/image/popular_services/social-media-marketing.png",
      backgroundColor: "#687200",
    },
    {
      id: 6,
      content: "Voice Over",
      imgurl: "../../../public/image/popular_services/voice-over.png",
      backgroundColor: "#421300",
    },
    {
      id: 7,
      content: "Software Development",
      imgurl: "../../../public/image/popular_services/software-development.png",
      backgroundColor: "#254200",
    },
    {
      id: 8,
      content: "Data Science & ML",
      imgurl: "../../../public/image/popular_services/data-science.png",
      backgroundColor: "#8F2900",
    },
    {
      id: 9,
      content: "Product Photography",
      imgurl: "../../../public/image/popular_services/product-photography.png",
      backgroundColor: "#687200",
    },
    {
      id: 10,
      content: "E-Commerce Marketing",
      imgurl: "../../../public/image/popular_services/e-commerce.png",
      backgroundColor: "#00732E",
    },
    {
      id: 11,
      content: "Video Editing",
      imgurl: "../../../public/image/popular_services/video-editing.png",
      backgroundColor: "#BE5272",
    },
  ];

  const aboutItems = [
    {
      videoUrl:
        "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun",
      posterUrl:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg",
      quoter: "Tim and Dan Joo, Co-Founders",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/haerfest-logo-x2.934ab63.png",
      quote:
        "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.",
    },
    {
      videoUrl:
        "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi",
      posterUrl:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg",
      quoter: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lavender-logo-x2.3fff9e7.png",
      quote:
        "We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.",
    },
    {
      videoUrl:
        "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw",
      posterUrl:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg",
      quoter: "Kay Kim, Co-Founder",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/rooted-logo-x2.7da3bc9.png",
      quote:
        "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working.",
    },
    {
      videoUrl:
        "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl",
      posterUrl:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg",
      quoter: "Caitlin Tormey, Chief Commercial Officer",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/naadam-logo-x2.a79031d.png",
      quote:
        "We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day.",
    },
  ];

  const madeOnFiverr = [
    { id: 1, path: "../../../public/image/made_on_fiverr/1.jpg" },
    { id: 2, path: "../../../public/image/made_on_fiverr/2.jpg" },
    { id: 3, path: "../../../public/image/made_on_fiverr/3.jpg" },
    { id: 4, path: "../../../public/image/made_on_fiverr/4.jpg" },
    { id: 5, path: "../../../public/image/made_on_fiverr/5.jpg" },
    { id: 6, path: "../../../public/image/made_on_fiverr/6.jpg" },
    { id: 7, path: "../../../public/image/made_on_fiverr/7.jpg" },
    { id: 8, path: "../../../public/image/made_on_fiverr/8.jpg" },
    { id: 9, path: "../../../public/image/made_on_fiverr/9.jpg" },
    { id: 10, path: "../../../public/image/made_on_fiverr/10.jpg" },
    { id: 11, path: "../../../public/image/made_on_fiverr/11.jpg" },
    { id: 12, path: "../../../public/image/made_on_fiverr/12.jpg" },
  ];

  return (
    <>
      {/* section 2 */}
      <section className="popular_services container my-10">
        <h2>Popular services</h2>
        <Carousel
          // afterChange={onChange}
          arrows={true}
          infinite={false}
          dots={false}
          slidesToShow={6.3}
          slidesToScroll={6}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4.3,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3.3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 2.3,
                slidesToScroll: 2,
              },
            },
          ]}
        >
          {serviceItems.map((item) => {
            return (
              <div key={item.id} className="h-full">
                <div
                  className="carousel-item my-10 mr-8 border rounded-2xl flex flex-col justify-between h-[280px]"
                  style={{
                    backgroundColor: item.backgroundColor,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <h4 className="p-5 text-white">{item.content}</h4>
                  <img
                    src={item.imgurl}
                    width="95%"
                    className="rounded-2xl mx-auto pb-1"
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </section>

      {/* section 3 */}
      <section className="freelance_talent container">
        <h2>
          A whole world of freelance <br /> talent at your fingertips
        </h2>

        <div className="container mb-16 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* grid item */}
          <div className="mt-10 space-y-10">
            <img
              src="../../../public/symbol/freelance_talent/categories.72379ee.svg"
              className="self-end"
              alt=""
            />
            <h3>Over 700 categories</h3>
            <p className="text-xl">
              Get results from skilled freelancers from all over the world, for
              every task, at any price point.
            </p>
          </div>
          {/* grid item */}
          <div className="mt-10 space-y-10">
            <img
              src="../../../public/symbol/freelance_talent/handshake.287b5d3.svg"
              className="self-end"
              alt=""
            />
            <h3>Clear, transparent pricing</h3>
            <p className="text-xl">
              Pay per project or by the hour (Pro). Payments only get released
              when you approve.
            </p>
          </div>
          {/* grid item */}
          <div className="mt-10 space-y-10">
            <img
              src="../../../public/symbol/freelance_talent/lightning.2cded3f.svg"
              className="self-end"
              alt=""
            />
            <h3>Quality work done faster</h3>
            <p className="text-xl">
              Filter to find the right freelancers quickly and get great work
              delivered in no time, every time.
            </p>
          </div>
          {/* grid item */}
          <div className="mt-10 space-y-10">
            <img
              src="../../../public/symbol/freelance_talent/support.660ad7f.svg"
              className="self-end"
              alt=""
            />
            <h3>24/7 award-winning support</h3>
            <p className="text-xl">
              Chat with our team to get your questions answered or resolve any
              issues with your orders.
            </p>
          </div>
        </div>

        {/* video */}
        <div className="container">
          <video
            className="w-full"
            style={{ borderRadius: "15px" }}
            autoPlay
            controls
            muted
            poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png"
            src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
          ></video>
        </div>
      </section>

      {/* section 4 */}
      <section className="fiverr_pro container">
        <div
          style={{ backgroundColor: "#003912", borderRadius: "15px" }}
          className="grid grid-cols-2 my-20 p-16 gap-10"
        >
          <div className="text-white space-y-5">
            <IconFiverrPro />

            <h2 className="me-32 text-white">
              New e-Commerce <br /> project management <br /> service{" "}
              <span>made for your business</span>
            </h2>
            <p>
              An experienced e-Commerce project manager will plan, coordinate,
              and execute your project. Overseeing a team of e-Commerce experts,
              they'll handle everything from site building, design and content
              to optimization, marketing strategies, and UGC videos.
            </p>
            <p className="font-semibold">To get started, you should have:</p>
            <ul className="pb-4 ps-6">
              <li>
                An e-Commerce project requiring expertise in various fields
              </li>
              <li>A budget exceeding $1000</li>
              <li>A desire to get things done, without the hassle</li>
            </ul>
            <button className="py-2 px-5 rounded-md font-bold">
              Get Started
            </button>
          </div>
          <img
            src="../../../public/image/fiverr_pro.png"
            className="my-auto"
            alt=""
          />
        </div>
      </section>

      {/* section 5 */}
      <section className="about_fiverr container">
        <h2>What they're saying about Fiverr</h2>

        <Carousel
          // afterChange={onChange}
          arrows={true}
          infinite={false}
          dots={false}
        >
          {/* item 1 */}
          {aboutItems.map((item) => {
            return (
              <div className="about_fiverr_item my-10">
                <video
                  src={item.videoUrl}
                  width={600}
                  style={{ borderRadius: "8px" }}
                  controls
                  muted
                  poster={item.posterUrl}
                  className=""
                ></video>
                <div className="px-32">
                  <h5>
                    {item.quoter} |{" "}
                    <span>
                      <img
                        src={item.logo}
                        alt=""
                        style={{ display: "inline-block", height: "36px" }}
                      />
                    </span>
                  </h5>
                  <p>"{item.quote}"</p>
                </div>
              </div>
            );
          })}
        </Carousel>

        {/* fiverr logo maker */}
        <div className="fiverr_logo_maker grid grid-cols-2 my-10">
          <div className="space-y-10 p-20">
            <IconFiverrLogoMaker />
            <h2>
              Make an incredible <br /> logo <span>in seconds</span>
            </h2>
            <p>Pre-designed by top talent. Just add your touch.</p>
            <button className="py-3 px-5 rounded-md text-white">
              Try Fiverr Logo Maker
            </button>
          </div>
          <div className="p-20">
            <img
              src="../../../public/image/fiverr_logo_maker.png"
              width="100%"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* section 6 */}
      <section className="made_on_fiverr container">
        <h2 className="mt-20">Made on Fiverr</h2>

        <div className="flex flex-wrap items-start !important mt-12">
          {madeOnFiverr.map((item) => {
            return (
              <div className="card w-1/4 relative p-2" key={item.id}>
                <div className="relative group overflow-hidden">
                  <div className="card_image">
                    <img
                      src={item.path}
                      style={{ borderRadius: "10px" }}
                      alt=""
                    />
                  </div>

                  <div className="card_info absolute group-hover:top-0 left-0 h-full w-full text-white transition-all duration-1000">
                    <div className="card_info_layout">
                      <div className="icon_up absolute top-5 right-3 flex h-10 w-10 items-center justify-center bg-white rounded-full">
                        <i className="fa-regular fa-heart text-black" />
                      </div>

                      <div className="text_down absolute bottom-1 w-full p-3 flex items-center justify-between">
                        <div>
                          <p>Featured in: </p>
                          <p>by:</p>
                        </div>
                        <div className="me-3">
                          <i className="fa-solid fa-ellipsis" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* section 7 */}
      <section className="freelance_service container text-center p-10 rounded-xl my-16">
        <h2 className="mb-5">
          Freelance services at your <span>fingertips!</span>
        </h2>
        <button className="px-5 py-2 rounded-md bg-white">Join Fiverr</button>
      </section>
    </>
  );
};

export default HomePageContent;
