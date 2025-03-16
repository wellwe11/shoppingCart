import classes from "./navBar.module.scss";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    // navigate(`profile/${link}`);
    console.log("navigate to:", link);
  };

  return (
    <div className={classes.navBarStyle}>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.buttonStyle}
            onClick={() => handleNavigate("frontpage")}
          >
            Front page
          </button>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.buttonStyle}
            onClick={() => handleNavigate("store")}
          >
            Store
          </button>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.buttonStyle}
            onClick={() => handleNavigate("cart")}
          >
            Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

// header with 3 buttons:
// Front-page
// store
// cart
