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
          Cart
        </button>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className={logoClasses.container}>
      <div className={logoClasses.wrapper}>
        <h1>This is a Logo</h1>
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
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
