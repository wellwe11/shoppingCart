import classes from "./footer.module.scss";

const SignUpSection = () => {
  return (
    <div>
      <div className={classes.newsLetterContainer}>
        <div className={classes.newsLetterWrapper}>
          <h2>Join our crew and subrscribe to our newsletter!</h2>
          <h5>
            15% off your first order and many more oppertunities await you
          </h5>
          <div className={classes.emailAndButtonContainer}>
            <input type="text" placeholder="Enter your email..." />
            <button>Subscribe</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

const FooterButtons = ({ buttons, buttonsTitle }) => {
  return (
    <div className={classes.footerButtonsWrapper}>
      <h4>{buttonsTitle}</h4>
      {buttons.map((button, index) => (
        <button key={index}>{button}</button>
      ))}
    </div>
  );
};

const FooterInformation = () => {
  const us = ["Who Are We", "Find Locations", "Partners", "Our Future"];
  const brand = ["Style & Fit", "Technology", "Press", "Events"];
  const help = [
    "Shipping & Returns",
    "Repairs",
    "Warranty",
    "FAQ",
    "Contact Us",
  ];

  return (
    <div className={classes.footerButtonsContainer}>
      <FooterButtons buttons={us} buttonsTitle={"US"} />
      <FooterButtons buttons={brand} buttonsTitle={"BRAND"} />
      <FooterButtons buttons={help} buttonsTitle={"HELP"} />
    </div>
  );
};

const FooterInformationTwo = () => {
  return (
    <div className={classes.footerInformationTwo}>
      <div className={classes.headerContainer}>
        <h3>CONTACT US FOR FURTHER INFORMATION</h3>
      </div>
      <p>
        Whether you're a collector or visiting for the first time, we're here to
        assist!
      </p>
      <div className={classes.pContainer}>
        <p>+12 345 6789 10</p>
        <p> || </p>
        <p>RyanderEmail@someEmail.com</p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <SignUpSection />
      <div className={classes.footerContainer}>
        <FooterInformation />
        <FooterInformationTwo />
      </div>
    </footer>
  );
};

export default Footer;
