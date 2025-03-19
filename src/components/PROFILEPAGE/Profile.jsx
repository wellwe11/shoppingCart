import { Link, useParams } from "react-router-dom";
import DefaultPage from "../DEFAULTPAGE/DefaultPage";
import CartPage from "../CARTPAGE/cartPage";
import StorePage from "../STOREPAGE/storePage";
import NavBar from "../NAVBAR/navBar";

const PEXEL_API_KEY = import.meta.env.VITE_PEXEP_API_KEY;

import classes from "./profileStyles.module.css";
import { useEffect, useState } from "react";

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
          fetch("https://api.pexels.com/v1/search?query=wrist watch", {
            method: "GET",
            headers: {
              Authorization: PEXEL_API_KEY,
            },
          }).then((response) => response.json()),

          // find second API and fetch PRODUCTS
          // fetch("otherApi").then((response) => response.json()),
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

    console.log(dataOne);
  }, []);

  const { name } = useParams();

  if (loading) return <div>Loading data...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div>
      <NavBar />
      <div>
        {name === "store" ? (
          <StorePage />
        ) : name === "cart" ? (
          <CartPage />
        ) : (
          <DefaultPage data={dataOne} />
        )}
      </div>
    </div>
  );
};

export default Profile;
