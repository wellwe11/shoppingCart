import { SvgArrowLeft, SvgArrowRight } from "./svgArrows";

const NavButton = ({
  direction,
  data,
  activeImage,
  setActiveImage,
  classes,
  addImages,
  subtractImages,
}) => {
  const addActiveImage = () => {
    if (data) {
      if (addImages) {
        if (activeImage < addImages) {
          setActiveImage((prevImg) => prevImg + 1);
        }
      }

      if (!addImages) {
        if (activeImage < data.length - 1) {
          setActiveImage((prevImg) => prevImg + 1);
        } else {
          setActiveImage(0);
        }
      }
    }
  };

  const subtractActiveImage = () => {
    if (data) {
      if (subtractImages) {
        if (activeImage > subtractImages) {
          setActiveImage((prevImg) => prevImg - 1);
        }
      }

      if (!subtractImages) {
        if (activeImage >= 1) {
          setActiveImage((prevImg) => prevImg - 1);
        } else {
          setActiveImage(data.length - 1);
        }
      }
    }
  };

  return (
    <button
      onClick={() =>
        direction === "Right" ? addActiveImage() : subtractActiveImage()
      }
      className={classes}
    >
      {direction === "Right" ? <SvgArrowRight /> : <SvgArrowLeft />}
    </button>
  );
};

export default NavButton;
