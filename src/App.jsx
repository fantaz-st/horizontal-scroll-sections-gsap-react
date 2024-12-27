import classes from "./App.module.css";
import Cursor from "./Components/Cursor/Cursor";
import Footer from "./Components/Footer/Footer";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Loader from "./Components/Loader/Loader";

const App = () => {
  return (
    <div className={classes.main}>
      <HorizontalScroll />
      <Footer />
      <Loader />
      <Cursor />
    </div>
  );
};

export default App;
