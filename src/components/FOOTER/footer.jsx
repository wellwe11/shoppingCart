import classes from "./footer.module.scss";

const SignUpSection = () => {
  return (
    <div>
      <div>
        <div>
          <input type="text" placeholder="Enter your email..." />
        </div>
        <div></div>
      </div>
    </div>
  );
};

const FooterInformation = () => {
  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <SignUpSection />
      <div className={classes.footerContainer}></div>
      <FooterInformation />
    </footer>
  );
};

export default Footer;
