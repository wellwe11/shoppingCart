import { Link, useParams } from "react-router-dom";
import DefaultPage from "../DEFAULTPAGE/DefaultPage";
import CartPage from "../CARTPAGE/cartPage";
import StorePage from "../STOREPAGE/storePage";
import NavBar from "../NAVBAR/navBar";

import classes from "./profileStyles.module.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [dataOne, setDataOne] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.products.filter((product) =>
          product.category.toLowerCase().includes("kitchen")
        );
        setDataOne(filteredData);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { name } = useParams();

  if (loading) return <div>Loading data...</div>;

  console.log(dataOne.products);

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
