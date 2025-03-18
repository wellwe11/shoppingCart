import { useEffect, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

const PictureSlider = () => {
  const [activeImage, setActiveImage] = useState(1);
  const [mouseHoverSlider, setMouseHoverSlider] = useState(false);

  const images = [
    { img: "imgOne" },
    { img: "imgTwo" },
    { img: "imgThree" },
    { img: "imgFour" },
    { img: "imgFive" },
    { img: "imgSix" },
  ];

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
    <div>
      <div className={classes.pictureSliderContainer}>
        <button
          onClick={subtractActiveImage}
          className={classes.leftButtonClicker}
        >
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
        <button onClick={addActiveImage} className={classes.rightButtonClicker}>
          Scroll right!
        </button>
      </div>
    </div>
  );
};

const DefaultPage = () => {
  return (
    <div>
      <PictureSlider />
    </div>
  );
};

export default DefaultPage;
