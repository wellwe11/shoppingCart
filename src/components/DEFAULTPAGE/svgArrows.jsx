import classes from "./svgArrows.module.scss";

export const SvgArrowRight = () => {
  return (
    <svg
      version="1.1"
      id="icons_1_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
      width="44"
      height="44"
      fill="currentColor"
      transform="scale(-1,1)"
      className={classes.iconRight}
    >
      <path d="M78.8 38.4 54.4 64l24.4 25.6H65.3L41.6 64l23.7-25.6h13.5z" />
    </svg>
  );
};

export const SvgArrowLeft = () => {
  return (
    <svg
      version="1.1"
      id="icons_1_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
      width="44"
      height="44"
      fill="currentColor"
      className={classes.iconLeft}
    >
      <path d="M78.8 38.4 54.4 64l24.4 25.6H65.3L41.6 64l23.7-25.6h13.5z" />
    </svg>
  );
};
