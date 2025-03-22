import { useEffect, useRef, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

import { SvgArrowLeft, SvgArrowRight } from "./svgArrows";
import { useNavigate } from "react-router-dom";

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

  const addActiveImage = () => {
    if (activeImage < data.length && dataFetched) {
      setActiveImage((prevImg) => prevImg + 1);
    }
  };

  const subtractActiveImage = () => {
    // only allow it to go down back to 6 which is the amount of visible elements
    if (activeImage > visibleImages && dataFetched) {
      setActiveImage((prevImg) => prevImg - 1);
    }
  };

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
      <div className={`${classes.spacer} ${classes.layer1}`}></div>
      <div className={classes.pictureSliderContainer}>
        <button
          onClick={subtractActiveImage}
          className={classes.smallSliderButtons}
        >
          <SvgArrowLeft />
        </button>
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
        <button onClick={addActiveImage} className={classes.smallSliderButtons}>
          <SvgArrowRight />
        </button>
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

  const addActiveImage = () => {
    if (activeImage < data.length - 1) {
      setActiveImage((prevImg) => prevImg + 1);
    } else {
      setActiveImage(0);
    }
  };

  const subtractActiveImage = () => {
    if (activeImage >= 1) {
      setActiveImage((prevImg) => prevImg - 1);
    } else {
      setActiveImage(data.length - 1);
    }
  };

  const handleMouseHoverSliderTrue = () => {
    setMouseHoverSlider(true);
  };

  const handleMouseHoverSliderFalse = () => {
    setMouseHoverSlider(false);
  };

  useEffect(() => {
    if (!mouseHoverSlider) {
      const timer = setTimeout(() => {
        addActiveImage();
      }, 5000);

      return () => clearTimeout(timer);
    }
  });

  return (
    <section className={classes.bigPictureSLider}>
      <div className={classes.pictureSliderContainer}>
        <button onClick={subtractActiveImage} className={classes.buttonClicker}>
          <SvgArrowRight />
        </button>
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
        <button onClick={addActiveImage} className={classes.buttonClicker}>
          <SvgArrowLeft />
        </button>
      </div>
    </section>
  );
};

const ProductInformationSection = () => {
  // ref for effect below
  const textElementsRef = useRef([]);
  const textElementsRefTwo = useRef([]);

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

    if (textElementsRef.current) observer.observe(textElementsRef.current);
    if (textElementsRefTwo.current)
      observer.observe(textElementsRefTwo.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={classes.ProductInformationSection}>
      <div className={classes.textContainer}>
        <div className={classes.introSectionText}>
          <div className={classes.firstTextWrapper}>
            <div className={classes.firstText}>
              <p ref={textElementsRef}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
          <div className={classes.wave}>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
            </svg>
          </div>
          <div className={classes.secondTextWrapper}>
            <div
              className={classes.secondText}
              // ref={(e) => (elementsRef.current = e)}
            >
              <p ref={textElementsRefTwo}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet.
              </p>
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
      <ProductInformationSection />
      <PictureSliderSmall fetchedData={dataTwo} />
      <ServiceInformation />
    </div>
  );
};

export default DefaultPage;
