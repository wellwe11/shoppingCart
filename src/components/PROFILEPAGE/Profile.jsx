import { Link, useParams } from "react-router-dom";
import DefaultPage from "../DEFAULTPAGE/DefaultPage";
import CartPage from "../CARTPAGE/cartPage";
import StorePage from "../STOREPAGE/storePage";
import AboutUsPage from "../ABOUTUSPAGE/aboutUs";

import "../../index.module.scss";
import classes from "./profileStyles.module.css";
import { useEffect, useState } from "react";

import NavBar from "../NAVBAR/navBar";
import Footer from "../FOOTER/footer";

const pages = {
  cart: CartPage,
  store: StorePage,
  aboutUs: AboutUsPage,
};

const Profile = () => {
  const [dataTwo, setDataTwo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedTwo = await Promise.all([
          fetch("https://dummyjson.com/products/search?q=watch").then(
            (response) => response.json()
          ),
        ]);

        setDataTwo(fetchedTwo);
      } catch (error) {
        console.log("Failed to fetch data", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { name } = useParams();

  const { product } = useParams();

  const PageToView = pages[name];

  if (loading) return <div>Loading data...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div>
      <NavBar productsInCart={productsInCart} />
      <div>
        {product ? (
          <StorePage
            setProductsInCart={setProductsInCart}
            data={dataTwo}
            clickedImage={product}
          />
        ) : name ? (
          <PageToView
            setProductsInCart={setProductsInCart}
            dataTwo={dataTwo}
            data={dataTwo}
            cartData={productsInCart}
          />
        ) : (
          <DefaultPage dataTwo={dataTwo} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
