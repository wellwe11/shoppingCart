import { useEffect, useRef, useState } from "react";
import classes from "./storePage.module.scss";
import starImage from "./rating.png";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ data }) => {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setFetchedData(data);
  }, [data]);

  return (
    <div className={classes.productInfo}>
      <div className={classes.productText}>
        {fetchedData && (
          <p style={{ color: "red" }}>
            {fetchedData.title}
            {fetchedData.brand}
            {fetchedData.description}
            {fetchedData.returnPolicy}
            {fetchedData.warrantyInformation}
          </p>
        )}
      </div>
    </div>
  );
};

const StorePageOne = ({ fetchedData }) => {
  // ref for effect below
  const elementsRef = useRef([]);

  // creates a smooth transition for events to make them look a bit
  // nicer when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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

  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/store/${link}`);
  };

  return (
    <div className={classes.storePage}>
      <div className={classes.imagesContainer}>
        {fetchedData.products.map((image, index) => (
          <div
            className={classes.imageWrapper}
            key={index}
            ref={(el) => (elementsRef.current[index] = el)}
            onClick={() => handleNavigate(index)}
          >
            <img src={image.images[0]} alt="" />
            <div className={classes.imageInfo}>
              <div className={classes.imagePrice}>
                <p>{image.price}</p>
              </div>
              <div className={classes.imageRatingWrapper}>
                <div
                  className={classes.imageRatingCover}
                  style={{ marginRight: `-${Number(image.rating) * 40}%` }}
                ></div>
                <img
                  src={starImage}
                  alt="image rating"
                  className={classes.imageRating}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StorePage = ({ data, clickedImage }) => {
  const [fetchedData, setFetchedData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(data);

  useEffect(() => {
    setFetchedData(data);
  }, [data]);

  useEffect(() => {
    if (data && data.products && data.products.length > 0) {
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      console.log("ERROR, FETCHED DATA:", fetchedData, "DATA:", data);
    }
  }, [data]);

  if (error) return <div>ERROR</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ProductInfo data={fetchedData.products[clickedImage]} />
      {!loading && <StorePageOne fetchedData={fetchedData} />}
    </>
  );
};

export default StorePage;
