import classes from "./navBar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchSvg from "./searchSvg";
import { useEffect, useRef, useState } from "react";
import CartIconSVG from "./cartIconSVG";
import userEvent from "@testing-library/user-event";

const NavButtons = ({ classNameView }) => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };

  return (
    <div className={`${classes.navBarBtns} ${classNameView}`}>
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
  const elementTarget = useRef();
  const [menuPos, setMenuPos] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
      } else {
        setScrollDirection("down");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("menu enter screen");
          setMenuPos(false);
        } else {
          console.log("menu is out of view");
          setMenuPos(true);
        }
      });
    });
    if (elementTarget.current) {
      observer.observe(elementTarget.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={classes.navBar}>
      <div className={classes.container}>
        <Logo ref={elementTarget} />
        {menuPos ? (
          <NavButtons
            classNameView={
              scrollDirection === "down"
                ? classes.menuViewOut
                : classes.menuViewFade
            }
          />
        ) : (
          <NavButtons classNameView={classes.menuViewIn} />
        )}
      </div>
      <div ref={elementTarget} style={{ height: "1px" }}></div>
    </div>
  );
};

export default NavBar;
