import classes from "./navBar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import SearchSvg from "./searchSvg";
import { useEffect, useRef, useState } from "react";
import CartIconSVG from "./cartIconSVG";

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

const Logo = ({ ref }) => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(`/${link}`);
  };
  return (
    <div className={classes.logo} ref={ref}>
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
  const elementTargetTwo = useRef();
  const [navButtonClass, setNavButtonClass] = useState("");
  const [navButtonarea, setNavButtonArea] = useState("top");
  const [navButtonTop, setNavButtonTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    if (navButtonTop) {
      setNavButtonClass("");
    } else if (!navButtonTop && navButtonarea === "halfTop") {
      setNavButtonClass(`${`${classes.menuViewOut}`}`);
    } else if (
      !navButtonTop &&
      navButtonarea === "out" &&
      scrollDirection === "down"
    ) {
      setNavButtonClass(`${`${classes.menuViewFade}`}`);
    } else if (
      !navButtonTop &&
      navButtonarea === "out" &&
      scrollDirection === "up"
    ) {
      setNavButtonClass(`${`${classes.menuViewOut}`}`);
    }
  }, [navButtonarea, scrollDirection, navButtonTop]);

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
          if (entry.target === elementTarget.current) {
            setNavButtonTop(true);
          }

          if (entry.target === elementTargetTwo.current) {
            setNavButtonArea("halfTop");
          }
        }

        if (!entry.isIntersecting) {
          if (entry.target === elementTarget.current) {
            setNavButtonTop(false);
          }

          if (entry.target === elementTargetTwo.current) {
            setNavButtonArea("out");
          }
        }
      });
    });

    if (elementTarget.current) observer.observe(elementTarget.current);
    if (elementTargetTwo.current) observer.observe(elementTargetTwo.current);

    return () => {
      if (elementTarget.current) observer.unobserve(elementTarget.current);
      if (elementTargetTwo.current)
        observer.unobserve(elementTargetTwo.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={classes.navBar}>
      <div className={classes.container}>
        <Logo ref={elementTarget} />
        <NavButtons classNameView={navButtonClass} />
      </div>
      <div
        ref={elementTargetTwo}
        style={{
          height: "30px",
          width: "30px",
          position: "absolute",
          marginTop: "300px",
        }}
      ></div>
    </div>
  );
};

export default NavBar;
