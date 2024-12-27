import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";
import classes from "./HorizontalScroll.module.css";
import slides from "./data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(
    () => {
      const horizontalContainer = horizontalRef.current;
      const allSlides = gsap.utils.toArray(`.${classes.slide}`);

      // 1) Horizontal scrolling logic
      const totalScrollWidth = horizontalContainer.scrollWidth - window.innerWidth;
      const lol = gsap.to(horizontalContainer, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress) => {
              // Determine slide thresholds
              const thresholds = allSlides.map((_, i) => i / (allSlides.length - 1));

              // Find the closest threshold that satisfies the condition
              const index = thresholds.findIndex((threshold) => progress < threshold + 0.1 && progress > threshold - 0.1);

              // Ensure snapping only occurs if user has passed 50% of the current slide
              const nextThreshold = progress - thresholds[index] > 0.5 / (allSlides.length - 1) ? thresholds[index + 1] : thresholds[index];

              return nextThreshold || progress; // Default to the current progress
            },
            duration: 0.5,
            ease: "power3.inOut",
          },
        },
      });

      // 2) Parallax effect for each slide background
      const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

      allSlides.forEach((slide, i) => {
        const bg = slide.querySelector(`.${classes.bg}`);
        gsap.fromTo(
          bg,
          {
            backgroundPosition: () => (i ? `${-window.innerWidth * getRatio(slide)}px 50%` : "0px 50%"),
          },
          {
            backgroundPosition: () => `${window.innerWidth * (1 - getRatio(slide))}px 50%`,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: lol,
              start: () => (i ? "top bottom" : "top top"),
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // 3) Split-type for titles & custom onEnter/onLeave animations
      allSlides.forEach((slide, i) => {
        const titleEl = slide.querySelector(`.${classes.title}`);
        if (!titleEl) return;

        // Split the text into lines
        const splitTitle = new SplitType(titleEl, { types: "lines" });
        const lines = splitTitle.lines;

        // (Optional) wrap each line in an extra <span>
        lines.forEach((line) => {
          const text = line.textContent;
          line.textContent = "";
          const innerSpan = document.createElement("span");
          innerSpan.classList.add(classes.inner);
          innerSpan.textContent = text;
          line.appendChild(innerSpan);
        });

        const innerEls = lines.map((line) => line.querySelector(`.${classes.inner}`));

        // Create a dedicated ScrollTrigger for each slide’s title lines
        ScrollTrigger.create({
          containerAnimation: lol, // tie it to the horizontal pinned scroll
          trigger: slide,
          start: "left center", // adjust to taste
          onEnter: () => {
            gsap.to(innerEls, {
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            });
          },
          onEnterBack: () => {
            gsap.to(innerEls, {
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            });
          },
          onLeave: () => {
            gsap.to(innerEls, {
              y: -150,
              duration: 0.5,
              ease: "power3.in",
              stagger: 0.1,
            });
          },
          onLeaveBack: () => {
            gsap.to(innerEls, {
              y: -150,
              duration: 0.5,
              ease: "power3.in",
              stagger: 0.1,
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className={classes.container} ref={containerRef}>
      <div className={classes.horizontal} ref={horizontalRef}>
        {slides.map((slide) => (
          <div key={slide.id} className={classes.slide}>
            <div className={classes.bg} style={{ backgroundImage: `url(${slide.img})` }} />
            <div className={classes.text}>
              <h1 className={classes.title}>{slide.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
