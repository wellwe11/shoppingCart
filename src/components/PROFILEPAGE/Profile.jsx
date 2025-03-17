import { Link, useParams } from "react-router-dom";
import DefaultPage from "../DEFAULTPAGE/DefaultPage";
import CartPage from "../CARTPAGE/cartPage";
import StorePage from "../STOREPAGE/storePage";
import NavBar from "../NAVBAR/navBar";

import classes from "./profileStyles.module.css";

const Profile = ({}) => {
  const { name } = useParams();
  return (
    <div>
      <NavBar />
      <div>
        {name === "store" ? (
          <StorePage />
        ) : name === "cart" ? (
          <CartPage />
        ) : (
          <DefaultPage />
        )}
      </div>
    </div>
  );
};

export default Profile;
