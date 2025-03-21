import classes from "./navBar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchSvg from "./searchSvg";
import { useEffect, useState } from "react";
import CartIconSVG from "./cartIconSVG";

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
            onClick={() => handleNavigate("./aboutUs")}
          >
            About us
          </button>
        </div>
      </div>
    </div>
  );
};

const NavIcons = () => {
  const [searchHover, setSearchHover] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };

  const handleSearchHoverEnter = () => {
    setSearchHover(true);
  };

  const handleSearchHoverLeave = () => {
    setSearchHover(false);
  };

  const handleSearchFocusEnter = () => {
    setSearchFocus(true);
  };

  const handleSearchFocusLeave = () => {
    setSearchFocus(false);
  };

  return (
    <div className={classes.navIcons}>
      <div className={classes.iconContainer}>
        <input
          placeholder="search..."
          className={
            searchHover || searchFocus ? classes.iconContainerInputHover : ""
          }
          onMouseEnter={handleSearchHoverEnter}
          onMouseLeave={handleSearchHoverLeave}
          onFocus={handleSearchFocusEnter}
          onBlur={handleSearchFocusLeave}
        />
        <div
          className={classes.searchSVG}
          onMouseEnter={handleSearchHoverEnter}
          onMouseLeave={handleSearchHoverLeave}
        >
          <SearchSvg />
        </div>
        <button onClick={() => handleNavigate("./cart")}>
          <div className={classes.cartIconSVG}>
            <CartIconSVG />
          </div>
        </button>
      </div>
    </div>
  );
};

const Logo = () => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };
  return (
    <div className={classes.logo}>
      <NavIcons />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h1 onClick={() => handleNavigate("./")}>Ryander</h1>
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
