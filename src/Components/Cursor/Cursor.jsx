import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import classes from "./Cursor.module.css";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (cursorRef.current) {
      const innerDivs = cursorRef.current.querySelectorAll(`.${classes.left}, .${classes.right}, .${classes.top}, .${classes.bottom}`);
      const handleMouseMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        gsap.to(cursorRef.current, {
          x,
          y,
          ease: "none",
          duration: 0,
        });
      };

      const handleMouseEnter = () => {
        gsap.to(`.${classes.left}`, {
          scaleX: 5,
          x: "-20px",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(`.${classes.right}`, {
          scaleX: 5,
          x: "20px",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(`.${classes.top}`, {
          scaleX: 5,
          y: "-20px",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(`.${classes.bottom}`, {
          scaleX: 5,
          y: "20px",
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(cursorRef.current, {
          scale: 1.25,
          rotate: 45,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(innerDivs, {
          scaleX: 1,
          y: 0,
          x: 0,
          height: 1,
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(cursorRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      // Attach listeners for mouse movement and link hover
      window.addEventListener("mousemove", handleMouseMove);

      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
      });

      // Cleanup listeners
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        links.forEach((link) => {
          link.removeEventListener("mouseenter", handleMouseEnter);
          link.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);

  return (
    <div ref={cursorRef} className={classes.cursor}>
      <div className={classes.left} />
      <div className={classes.right} />
      <div className={classes.top} />
      <div className={classes.bottom} />
    </div>
  );
};

export default Cursor;
