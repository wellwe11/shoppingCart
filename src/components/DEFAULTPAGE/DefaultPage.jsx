import { useEffect, useRef, useState } from "react";
import classes from "./defaultPage.module.scss";
import React from "react";

const PictureSliderSmall = ({ fetchedData }) => {
  const [activeImage, setActiveImage] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState(null);
  const elementTarget = useRef(null);
  const [elementWidth, setElementWidth] = useState(null);

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (data !== null) {
      setDataFetched(true);
      setActiveImage(data.length);
    }
  }, [data]);

  const addActiveImage = () => {
    if (activeImage < data.length && dataFetched) {
      setActiveImage((prevImg) => prevImg + 1);
    }
  };

  const subtractActiveImage = () => {
    if (activeImage >= 1 && dataFetched) {
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
  }, [fetchedData]);

  if (!dataFetched) return <div>Loading...</div>;

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
            transform: `translateX(-${data.length - activeImage}0%)`,
          }}
          className={classes.pictureSliderWrapper}
        >
          {dataFetched &&
            data.map((img, index) => (
              <div
                key={index}
                className={classes.pictureSliderImage}
                ref={elementTarget}
              >
                {img.title}
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

const PictureSliderBig = ({ fetchedData }) => {
  const [activeImage, setActiveImage] = useState(1);
  const [mouseHoverSlider, setMouseHoverSlider] = useState(false);
  const [data, setData] = useState(fetchedData);

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
          {/* {data.map((img, index) => (
            <React.Fragment key={index}>
              {index === activeImage && (
                <div className={classes.pictureSliderImage}>{index}</div>
              )}
            </React.Fragment>
          ))} */}
        </div>
        <button onClick={addActiveImage} className={classes.buttonClicker}>
          Scroll right!
        </button>
      </div>
    </div>
  );
};

const DefaultPage = ({ data }) => {
  return (
    <div>
      <PictureSliderBig fetchedData={data} />
      <PictureSliderSmall fetchedData={data} />
    </div>
  );
};

export default DefaultPage;
