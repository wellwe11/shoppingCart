import { useEffect, useRef, useState } from "react";
import classes from "./storePage.module.scss";
import starImage from "./rating.png";
import { useNavigate } from "react-router-dom";
import NavButton from "../SELFMADE_COMPONENTS/NavButton";

const AddToCart = ({ data, setProductsInCart, amount, setAmount }) => {
  const handleProducts = (newProducts) => {
    for (let i = 0; i < amount; i++) {
      setProductsInCart((prevProducts) => [...prevProducts, newProducts]);
    }
  };

  const handleAmountPlus = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const handleAmountMinus = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  return (
    <div className={classes.addToCart}>
      <button
        className={classes.addToCartBtn}
        onClick={() => handleProducts(data)}
      >
        Add to cart
      </button>
      <div className={classes.amountBtn}>
        <button onClick={handleAmountMinus}>-</button>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={handleAmountPlus}>+</button>
      </div>
    </div>
  );
};

const ProductInfo = ({ data, setProductsInCart }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    setFetchedData(data);
    setAmount(1);
  }, [data]);

  return (
    <div className={classes.productInfo}>
      {fetchedData && (
        <div>
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
              subtractImages={2}
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

          <div className={classes.productText} style={{ color: "black" }}>
            <br></br>
            <h3>
              {fetchedData.title} - {fetchedData.brand}
            </h3>
            <br></br>
            <p>{fetchedData.description}</p>
            <br></br>
            <h6>{fetchedData.warrantyInformation}</h6>
            <br></br>
            <AddToCart
              data={fetchedData}
              setProductsInCart={setProductsInCart}
              amount={amount}
              setAmount={setAmount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const StorePageOne = ({ fetchedData, clickedImage }) => {
  let clickedImagePage = !isNaN(clickedImage)
    ? Math.floor(clickedImage / 4)
    : 0;
  const [page, setPage] = useState(clickedImagePage);
  let productsToViewDownTo = page ? page * 4 : 0;
  let productsToViewUpTo = productsToViewDownTo + 3;

  const navigate = useNavigate();

  // ref for effect below
  const elementsRef = useRef([]);
  const [fetchedPageProducts, setFetchedPageProducts] = useState([]);

  useEffect(() => {
    const productPageToView = fetchedData.products.filter(
      (_, index) => index <= productsToViewUpTo && index >= productsToViewDownTo
    );

    setFetchedPageProducts(productPageToView);
  }, [page]);

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
  }, [fetchedPageProducts]);

  const handleNavigate = (link) => {
    navigate(`/store/${link}`);
  };

  return (
    <div className={classes.productsPage}>
      <div className={classes.imagesContainer}>
        {fetchedPageProducts.map((image, index) => (
          <div
            className={classes.imageWrapper}
            key={index}
            ref={(el) => (elementsRef.current[index] = el)}
            onClick={() => handleNavigate(index + 4 * page)}
          >
            <img src={image.images[0]} alt="" />
            <div className={classes.imageInfo}>
              <div className={classes.imagePrice}>
                <p>{image.price}</p>
              </div>
              <div className={classes.imageRatingWrapper}>
                <div
                  className={classes.imageRatingCover}
                  style={{
                    marginRight: `-${Number(image.rating) * 40}%`,
                  }}
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
      <StorePageButtons
        pages={fetchedData.products}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

const StorePageButtons = ({ pages, page, setPage }) => {
  const amountOfPages = Math.floor(pages.length / 4) + 1;
  const startPage = page + 1;

  // a responsice array that will display the amount of pages viewable
  const data = [];

  for (let i = 0; i < amountOfPages; i++) {
    data.push(i);
  }

  // add a limit to NavButton so that it functions correctly (it needs data to setpage etc)

  return (
    <div className={classes.storePageButtons}>
      <NavButton
        direction="Left"
        data={data}
        activeImage={page}
        setActiveImage={setPage}
        classes={classes.buttonStyle}
      />
      <p>{`${startPage} of ${amountOfPages}`}</p>
      <NavButton
        direction="Right"
        data={data}
        activeImage={page}
        setActiveImage={setPage}
        classes={classes.buttonStyle}
      />
    </div>
  );
};

const StorePage = ({ data, clickedImage, setProductsInCart }) => {
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
      <ProductInfo
        data={fetchedData.products[clickedImage]}
        setProductsInCart={setProductsInCart}
      />
      {!loading && (
        <>
          <StorePageOne fetchedData={fetchedData} clickedImage={clickedImage} />
        </>
      )}
    </div>
  );
};

export default StorePage;
