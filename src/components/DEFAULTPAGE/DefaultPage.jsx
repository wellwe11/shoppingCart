import { useEffect, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

const PictureSlider = () => {
  const images = [{ img: "imgOne" }, { img: "imgTwo" }, { img: "imgThree" }];

  const [activeImage, setActiveImage] = useState(0);
  const [mouseHoverSlider, setMouseHoverSlider] = useState(false);

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
    console.log(mouseHoverSlider);
    setMouseHoverSlider(true);
  };

  const handleMouseHoverSliderFalse = () => {
    console.log(mouseHoverSlider);
    setMouseHoverSlider(false);
  };

  useEffect(() => {
    if (!mouseHoverSlider) {
      const timer = setTimeout(() => {
        addActiveImage();
      }, 2500);

      return () => clearTimeout(timer);
    }
  });

  return (
    <div>
      <div className={classes.pictureSliderContainer}>
        <div
          className={classes.pictureSliderWrapper}
          onMouseLeave={handleMouseHoverSliderFalse}
          onMouseEnter={handleMouseHoverSliderTrue}
        >
          <button onClick={subtractActiveImage}>Scroll left!</button>
          {images.map((img, index) => (
            <React.Fragment key={index}>
              {activeImage === index && (
                <div key={index} className={classes.pictureSliderImage}>
                  {index}
                  <h1>{img.img}</h1>
                </div>
              )}
            </React.Fragment>
          ))}
          <button onClick={addActiveImage}>Scroll right!</button>
        </div>
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
