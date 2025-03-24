import { useEffect, useRef, useState } from "react";
import classes from "./storePage.module.scss";
import starImage from "./rating.png";
import { useNavigate } from "react-router-dom";
import NavButton from "../FREECOPONENTS/NavButton";

const ProductInfo = ({ data }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setFetchedData(data);
  }, [data]);

  console.log(activeImage);

  console.log(fetchedData);
  return (
    <div className={classes.productInfo}>
      {fetchedData && (
        <>
          <div className={classes.productImagesContainer}>
            <div className={classes.smallImagesContainer}>
              {fetchedData.images.map((image, index) => (
                <div
                  className={classes.productImagesSmall}
                  key={index}
                  onClick={() => setActiveImage(index)}
                  style={{
                    border: index === activeImage ? "1px solid white" : "",
                  }}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
            <NavButton
              direction="Left"
              data={fetchedData.images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              classes={classes.productImageButtons}
            />
            <div className={classes.productImage}>
              <img src={fetchedData.images[activeImage]} alt="" />
            </div>
            <NavButton
              direction="Right"
              data={fetchedData.images}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              classes={classes.productImageButtons}
            />
          </div>

          <div className={classes.productText}>
            <p style={{ color: "red" }}>
              {fetchedData.title}
              {fetchedData.brand}
              {fetchedData.description}
              {fetchedData.returnPolicy}
              {fetchedData.warrantyInformation}
            </p>
          </div>
        </>
      )}
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
    <div className={classes.productsPage}>
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
    <div className={classes.storePage}>
      <ProductInfo data={fetchedData.products[clickedImage]} />
      {!loading && <StorePageOne fetchedData={fetchedData} />}
    </div>
  );
};

export default StorePage;
