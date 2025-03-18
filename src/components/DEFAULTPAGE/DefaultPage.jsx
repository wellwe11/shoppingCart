import { useEffect, useRef, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

const PictureSliderSmall = ({ size }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [];

  const elementTarget = useRef(null);
  const [elementWidth, setElementWidth] = useState(null);

  const createImages = () => {
    for (let i = 0; i < size; i++) {
      images.push(i);
    }
  };
  createImages();

  const addActiveImage = () => {
    if (activeImage < 9) {
      setActiveImage((prevImg) => prevImg + 1);
    }
  };

  const subtractActiveImage = () => {
    if (activeImage >= 1) {
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
  }, []);

  console.log(elementWidth * activeImage);

  console.log(elementWidth);

  return (
    <div className={classes.smallPictureSlider}>
      <div className={classes.pictureSliderContainer}>
        <button
          onClick={subtractActiveImage}
          className={classes.smallSliderButtons}
        >
          Click me
        </button>
        <div
          style={{
            transform: `translateX(-${(elementWidth - 8) * activeImage}px)`,
          }}
          className={classes.pictureSliderWrapper}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className={classes.pictureSliderImage}
              ref={elementTarget}
            >
              {index}
            </div>
          ))}
        </div>
        <button onClick={addActiveImage} className={classes.smallSliderButtons}>
          Click me
        </button>
      </div>
    </div>
  );
};

const PictureSliderBig = ({ size }) => {
  const [activeImage, setActiveImage] = useState(1);
  const [mouseHoverSlider, setMouseHoverSlider] = useState(false);
  const images = [];

  const createImages = () => {
    for (let i = 0; i < size; i++) {
      images.push(i);
    }
  };
  createImages();

  const addActiveImage = () => {
    if (activeImage < images.length - 1) {
      setActiveImage((prevImg) => prevImg + 1);
    } else {
      setActiveImage(0);
    }
  };

  const subtractActiveImage = () => {
    if (activeImage >= 1) {
      setActiveImage((prevImg) => prevImg - 1);
    } else {
      setActiveImage(images.length - 1);
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
    <div className={classes.bigPictureSLider}>
      <div className={classes.pictureSliderContainer}>
        <button onClick={subtractActiveImage} className={classes.buttonClicker}>
          Scroll left!
        </button>
        <div
          className={classes.pictureSliderWrapper}
          onMouseLeave={handleMouseHoverSliderFalse}
          onMouseEnter={handleMouseHoverSliderTrue}
        >
          {images.map((img, index) => (
            <React.Fragment key={index}>
              {index === activeImage && (
                <div className={classes.pictureSliderImage}>{index}</div>
              )}
            </React.Fragment>
          ))}
        </div>
        <button onClick={addActiveImage} className={classes.buttonClicker}>
          Scroll right!
        </button>
      </div>
    </div>
  );
};

const DefaultPage = () => {
  return (
    <div>
      <PictureSliderBig size={10} />
      <PictureSliderSmall size={15} />
    </div>
  );
};

export default DefaultPage;
