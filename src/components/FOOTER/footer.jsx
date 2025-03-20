import classes from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <h3>This is the footer</h3>
      </div>
    </footer>
  );
};

export default Footer;
