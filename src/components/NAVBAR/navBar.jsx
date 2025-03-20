import classes from "./navBar.module.scss";
import btnClasses from "./navBarButtons.module.scss";
import logoClasses from "./logo.module.scss";
import { Link, useNavigate } from "react-router-dom";

const NavButtons = () => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };

  return (
    <div className={btnClasses.container}>
      <div className={btnClasses.wrapper}>
        <button
          className={btnClasses.style}
          onClick={() => handleNavigate("../")}
        >
          Front page
        </button>
      </div>
      <div className={btnClasses.wrapper}>
        <button
          className={btnClasses.style}
          onClick={() => handleNavigate("./store")}
        >
          Store
        </button>
      </div>
      <div className={btnClasses.wrapper}>
        <button
          className={btnClasses.style}
          onClick={() => handleNavigate("./cart")}
        >
          About us
        </button>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className={logoClasses.container}>
      <div className={logoClasses.wrapper}>
        <h1>Ryander</h1>
        <h3>Smartwatches</h3>
      </div>
    </div>
  );
};

const NavIcons = () => {
  return (
    <div>
      <div className={classes.iconContainer}>
        <div>Cart</div>
        <div>Search</div>
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className={classes.container}>
      <Logo />
      <div className={classes.wrapper}>
        <NavButtons />
      </div>
      {/* <NavIcons /> */}
    </div>
  );
};

export default NavBar;

// header with 3 buttons:
// Front-page
// store
// cart
