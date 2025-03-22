import { Link, useParams } from "react-router-dom";
import DefaultPage from "../DEFAULTPAGE/DefaultPage";
import CartPage from "../CARTPAGE/cartPage";
import StorePage from "../STOREPAGE/storePage";
import AboutUsPage from "../ABOUTUSPAGE/aboutUs";

const PEXEL_API_KEY = import.meta.env.VITE_PEXEP_API_KEY;

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
  const [dataOne, setDataOne] = useState(null);
  const [dataTwo, setDataTwo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedOne, fetchedTwo] = await Promise.all([
          fetch(
            "https://api.pexels.com/v1/search?query=smartwatch&per_page=20",
            {
              headers: {
                Authorization: PEXEL_API_KEY,
              },
            }
          ).then((response) => response.json()),

          fetch("https://dummyjson.com/products/search?q=watch").then(
            (response) => response.json()
          ),
        ]);

        setDataOne(fetchedOne);
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
      <NavBar />
      <div>
        {product ? (
          <StorePage data={dataTwo} clickedImage={product} />
        ) : name ? (
          <PageToView data={dataTwo} />
        ) : (
          <DefaultPage data={dataOne} dataTwo={dataTwo} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
