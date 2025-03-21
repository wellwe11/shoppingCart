import { useEffect, useRef, useState } from "react";
import classes from "./storePage.module.scss";

const StorePage = ({ data }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFetchedData(data);
  }, [data]);

  useEffect(() => {
    if (typeof fetchedData === "object") {
      setError(false);
      setLoading(false);

      console.log(fetchedData);
    } else {
      setError(true);
    }
  }, [fetchedData]);

  // ref for effect below
  const elementsRef = useRef([]);

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

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [fetchedData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div className={classes.storePage}>
      <div className={classes.imagesContainer}>
        {!loading &&
          fetchedData.products.map((image, index) => (
            <div
              className={classes.imageWrapper}
              key={index}
              ref={(el) => (elementsRef.current[index] = el)}
            >
              <img src={image.images[0]} alt="" />
              <div className={classes.imageInfo}>
                <p>{image.price}</p>
                <p>{image.rating}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StorePage;
