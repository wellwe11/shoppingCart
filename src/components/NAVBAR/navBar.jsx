import classes from "./navBar.module.scss";
import { Link, useNavigate } from "react-router-dom";

const NavButtons = () => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };

  return (
    <div className={classes.navBarBtns}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <button
            className={classes.style}
            onClick={() => handleNavigate("../")}
          >
            Front page
          </button>
        </div>
        <div className={classes.wrapper}>
          <button
            className={classes.style}
            onClick={() => handleNavigate("./store")}
          >
            Store
          </button>
        </div>
        <div className={classes.wrapper}>
          <button
            className={classes.style}
            onClick={() => handleNavigate("./cart")}
          >
            About us
          </button>
        </div>
      </div>
    </div>
  );
};

const NavIcons = () => {
  return (
    <div className={classes.navIcons}>
      <div className={classes.iconContainer}>
        <button>Cart</button>
        <input placeholder="search..." />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className={classes.logo}>
      <NavIcons />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h1>Ryander</h1>
          <h3>Smartwatches</h3>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.container}>
        <Logo />
        <NavButtons />
      </div>
    </div>
  );
};

export default NavBar;

// header with 3 buttons:
// Front-page
// store
// cart
