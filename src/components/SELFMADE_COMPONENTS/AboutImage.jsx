import classes from "./aboutImage.module.scss";

const AboutImage = ({ link, alt, width, height, text }) => {
  return (
    <div
      className={classes.aboutImage}
      style={{ width: width, height: height }}
    >
      <div className={classes.aboutImageWrapper}>
        <div className={classes.aboutText}>
          <p>{text}</p>
        </div>
        <img src={link} alt={alt} />
      </div>
    </div>
  );
};

export default AboutImage;
