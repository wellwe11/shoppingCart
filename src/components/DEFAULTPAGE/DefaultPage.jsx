import { useEffect, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

const PictureSlider = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [prevImage, setPrevImage] = useState(2);
  const [mouseHoverSlider, setMouseHoverSlider] = useState(false);

  const images = [{ img: "imgOne" }, { img: "imgTwo" }, { img: "imgThree" }];

  const addActiveImage = () => {
    if (activeImage < images.length - 1) {
      setPrevImage(activeImage);
      setActiveImage((prevImg) => prevImg + 1);
    } else {
      setActiveImage(0);
      setPrevImage(2);
    }
  };

  const subtractActiveImage = () => {
    if (activeImage >= 1) {
      setPrevImage(activeImage);
      setActiveImage((prevImg) => prevImg - 1);
    } else {
      setActiveImage(images.length - 1);
      setPrevImage(0);
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
      }, 3500);

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
          <div
            className={classes.visibleImageContainer}
            style={{ marginLeft: `-${activeImage}00%` }}
          >
            {/* <button onClick={subtractActiveImage}>Scroll left!</button> */}
            {images.map((img, index) => (
              <React.Fragment key={index}>
                <div key={index} className={classes.pictureSliderImage}>
                  {index}
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* <button onClick={addActiveImage}>Scroll right!</button> */}
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
