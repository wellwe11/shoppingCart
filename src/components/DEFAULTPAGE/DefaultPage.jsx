import { useEffect, useRef, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

import { useNavigate } from "react-router-dom";
import NavButton from "../SELFMADE_COMPONENTS/NavButton";
import AboutImage from "../SELFMADE_COMPONENTS/AboutImage";

import blackWatch from "./blackWatch.png";
import aboutImageSport from "./aboutImageSport.webp";
import aboutImageSitting from "./aboutImageSitting.webp";
import aboutImageParty from "./aboutImageParty.webp";

const PictureSliderSmall = ({ fetchedData }) => {
  // set active image to be length of visible images
  // adjust this accordingly to make sure that the iamges are always visible
  let visibleImages = 7;

  const [activeImage, setActiveImage] = useState(visibleImages);
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState(null);
  const elementTarget = useRef(null);
  const [elementWidth, setElementWidth] = useState(null);

  useEffect(() => {
    setData(fetchedData.products);
  }, [fetchedData]);

  useEffect(() => {
    if (data !== null) {
      setDataFetched(true);
    }
  }, [data]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (elementTarget.current) {
        setElementWidth(elementTarget.current.offsetWidth);
      }
    });

    if (elementTarget.current) {
      resizeObserver.observe(elementTarget.current);
    }

    return () => {
      if (elementTarget.current) {
        resizeObserver.unobserve(elementTarget.current);
      }
    };
  }, [fetchedData, activeImage]);

  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/store/${link}`);
  };

  if (!dataFetched) return <div>Loading...</div>;

  return (
    <section className={classes.smallPictureSlider}>
      <div className={classes.pictureSliderContainer}>
        <NavButton
          direction="Left"
          data={data}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          classes={classes.smallSliderButtons}
          subtractImages={visibleImages}
        />
        <div
          style={{
            transform: `translateX(-${
              activeImage * elementWidth - elementWidth * visibleImages
            }px)`,
          }}
          className={classes.pictureSliderWrapper}
        >
          {dataFetched &&
            data.map((img, index) => (
              <div
                key={index}
                className={classes.pictureSliderImage}
                ref={elementTarget}
                onClick={() => {
                  handleNavigate(index);
                }}
              >
                <img src={img.images[0]} alt="" />
              </div>
            ))}
        </div>
        <NavButton
          direction="Right"
          data={data}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          classes={classes.smallSliderButtons}
          addImages={data.length}
        />
      </div>
    </section>
  );
};

const PictureSliderBig = ({ fetchedData }) => {
  const [activeImage, setActiveImage] = useState(1);
  const [mouseHoverSlider, setMouseHoverSlider] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchedPhotos = fetchedData.photos.filter(
      (img, index) => index > 10 && index < 17 && img.width > 4000
    );

    setData(fetchedPhotos);
  }, [fetchedData]);

  useEffect(() => {
    if (data !== null) {
      setDataFetched(true);
    }
  }, [data]);

  const handleMouseHoverSliderTrue = () => {
    setMouseHoverSlider(true);
  };

  const handleMouseHoverSliderFalse = () => {
    setMouseHoverSlider(false);
  };

  useEffect(() => {
    if (!mouseHoverSlider) {
      const timer = setTimeout(() => {
        if (activeImage < data.length - 1) {
          setActiveImage((prevImg) => prevImg + 1);
        } else {
          setActiveImage(0);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  });

  return (
    <section className={classes.bigPictureSLider}>
      <div className={classes.pictureSliderContainer}>
        <NavButton
          direction="Left"
          data={data}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          classes={classes.buttonClicker}
        />
        <div
          className={classes.pictureSliderWrapper}
          onMouseLeave={handleMouseHoverSliderFalse}
          onMouseEnter={handleMouseHoverSliderTrue}
        >
          {dataFetched &&
            data.map((img, index) => (
              <React.Fragment key={index}>
                <div
                  className={`${classes.pictureSliderImage} ${
                    index === activeImage
                      ? classes.pictureSliderImageInView
                      : classes.pictureSliderImageOutView
                  }`}
                >
                  <img src={img.src.landscape} alt={img.src.alt} />
                </div>
              </React.Fragment>
            ))}
        </div>
        <NavButton
          direction="Right"
          data={data}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          classes={classes.buttonClicker}
        />
      </div>
    </section>
  );
};

const PersonalSectionText = () => {
  const [header, setHeader] = useState(1);

  const handleHeader = (e) => {
    setHeader(e);
  };

  const headers = [
    "Get to know me",
    "Get to love me",
    "Get to see me",
    "Get to be me",
  ];

  const texts = [
    ` as you explore the future of style. `,
    ` with every seamless detail. `,
    ` shine in every moment. `,
    ` , always ahead of the curve. Innovation, elegance, and technology—woven into every second, crafted for those who dare to stand out.`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (header < texts.length - 1) {
        setHeader((prevHead) => prevHead + 1);
      } else {
        setHeader(0);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [header]);

  // const parts = text.split(new RegExp(`(${headers.join("|")})`, "g"));
  // console.log(parts);

  return (
    <p style={{ color: "gray" }}>
      {texts.map((text, index) => (
        <>
          <span style={{ color: index === header ? "black" : "gray" }}>
            {headers[index]}
          </span>
          {text}
        </>
      ))}
    </p>
  );
};

const PersonalStorySection = () => {
  const texts = {
    sportText:
      "I love using it while making sport. It shows my heartbeat, tracks my steps & many more useful things",
    sittingText:
      "Nothing beats quick information. I use it to help me navigate my socials and keep my up to date with the latest trends",
    partText:
      "Not only do they look nice, but it's helpful if you're out. Quick to find contacts, help me find locations, connect with people",
  };

  return (
    <section className={classes.aboutMeSection}>
      <h3>Who am I?</h3>
      <PersonalSectionText />
      {/* <p style={{ color: "gray" }}>{text}</p> */}
      <div className={classes.aboutImagesContainer}>
        <div className={classes.aboutImagesWrapper}>
          <AboutImage
            link={aboutImageSport}
            width={"358px"}
            text={texts.sportText}
          />
          <AboutImage
            link={aboutImageSitting}
            width={""}
            text={texts.sittingText}
          />
          <AboutImage
            link={aboutImageParty}
            width={"358px"}
            text={texts.partText}
          />
        </div>
      </div>
    </section>
  );
};

const ProductInformationSection = () => {
  // ref for effect below
  const textElementsRef = useRef([]);

  // creates a smooth transition for events to make them look a bit
  // nicer when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("show");
          entry.target.classList.add(`${classes.show}`);
        } else {
          entry.target.classList.remove(`${classes.show}`);
        }
      });
    });

    if (textElementsRef.current) {
      observer.observe(textElementsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={classes.ProductInformationSection}>
      <div className={classes.textContainer}>
        <div className={classes.introSectionText}>
          <div className={classes.firstTextWrapper}>
            <div className={classes.firstText}>
              <p ref={textElementsRef}>
                Elegantly crafted, packed with smart features. Stay connected,
                track health, and elevate your style.
              </p>
            </div>
            <div className={classes.firstTextImage}>
              <img src={blackWatch} alt="" className={classes.firstTextImage} />
            </div>
            <div className={classes.wave}>
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  className={classes.shape_fill}
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceInformation = () => {
  const [activePage, setActivePage] = useState(0);

  const promisePhrases = [
    `Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.`,
    `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
    `Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. 
    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. `,
    `At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.`,
  ];

  return (
    <section className={classes.serviceInformation}>
      <div className={classes.serviceInformationCotnainer}>
        <div className={classes.buttonContainer}>
          <button onClick={() => setActivePage(0)}>Our services</button>
          <button onClick={() => setActivePage(1)}>What we prodive</button>
          <button onClick={() => setActivePage(2)}>
            Where to go from here
          </button>
          <button onClick={() => setActivePage(3)}>We promise</button>
        </div>
        <div className={classes.serviceText}>
          <p>{promisePhrases[activePage]}</p>
        </div>
      </div>
      <div className={`${classes.spacer} ${classes.layer1}`}></div>
    </section>
  );
};

const DefaultPage = ({ data, dataTwo }) => {
  return (
    <div>
      <PictureSliderBig fetchedData={data} />
      <PersonalStorySection />
      <ProductInformationSection />
      <PictureSliderSmall fetchedData={dataTwo} />
      <ServiceInformation />
    </div>
  );
};

export default DefaultPage;
