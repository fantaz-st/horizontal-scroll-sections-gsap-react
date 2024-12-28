import classes from "./MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={classes.container}>
      <div className={classes.fullScreenMenu}></div>

      <div className={classes.menu}>
        <div className={classes.text}>
          <p>
            FNTZ
            <br />
            testing
            <br />
            grounds
          </p>
        </div>
        <a href='#'>
          <div className={classes.hamburger}>
            <span></span>
            <span></span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default MainMenu;
