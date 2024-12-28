import { useEffect, useRef, useState } from "react";
import classes from "./Loader.module.css";
import gsap from "gsap";
import slides from "../HorizontalScroll/data";

const Loader = () => {
  const loaderRef = useRef(null);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let loadedImages = 0;
    const totalImages = slides.length;

    const updateProgress = () => {
      loadedImages += 1;
      setPercentage(Math.round((loadedImages / totalImages) * 100));
    };

    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.img;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });
  }, []);

  useEffect(() => {
    if (loaderRef.current) {
      const loadAnim = gsap.timeline();
      loadAnim
        .to(loaderRef.current, {
          x: gsap.utils.mapRange(0, 100, -200, 200)(percentage),
          duration: 0.2,
          ease: "power1.out",
        })
        .to(`.${classes.loader}`, {
          duration: 0.5,
          ease: "power2.out",
          opacity: 0,
          delay: 0.5,
          onComplete: () => {
            gsap.set(`.${classes.loader}`, { display: "none" });
          },
        });
    }
  }, [percentage]);
  return (
    <div className={classes.loader}>
      <p ref={loaderRef}>{percentage}%</p>
    </div>
  );
};

export default Loader;
