import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <div className={classes.top}>
        <div className={classes.line}>
          <div className={classes.menu}>
            <ul>
              <li>
                <a href='#'>Home</a>
              </li>
              <li>
                <a href='#'>About</a>
              </li>
              <li>
                <a href='#'>Services</a>
              </li>
              <li>
                <a href='#'>Contact</a>
              </li>
            </ul>
          </div>
          <div className={classes.adress}>
            224 W MONTGOMERY ST VILLA RICA,
            <br />
            GEORGIA 30180
          </div>
          <div className={classes.phone}>
            + 678 282 7974
            <br />
            <a href='mailto:fntz@fntz.com'>FNTZ@FNTZ.COM</a>
          </div>
          <div className={classes.social}>
            ©2024 RAD
            <br />
            IG FB X IN GEORGIA 30180
          </div>
        </div>

        <div className={classes.line}>
          <p style={{ textTransform: "uppercase", marginTop: "1rem" }}>
            We’re a creative, collaborative, research based, social enterprise architecture firm
            <br />
            continuously making an effort to impact the community.
          </p>
        </div>
      </div>
      <div className={classes.bottom}>
        <a href='#'>PRIVACY POLICY</a>
      </div>

      <h1 className={classes.fntz}>FNTZ</h1>
    </section>
  );
};

export default Footer;
