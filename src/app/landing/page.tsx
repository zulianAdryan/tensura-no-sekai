"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const contents = [
  <>
    <h1 className="text-4xl mb-4">Disclaimer</h1>
    <div className="tracking-wider leading-relaxed text-pretty font-notojp">
      <p>
        This website is not related to any Tensei shitara Slime Datta Ken
        「転生したらスライムだった件」 or That Time I Got Reincarnated as a
        Slime or any of its franchise related.
      </p>
      <p>
        This website is just purely made by me as a fan of the series and as my
        programming practice thus its built with open sources API and I do not
        make nor gained any profit by building this site.
      </p>
      <p className="mt-10">Thank you 「ありがとございます」.</p>
    </div>
  </>,
  <>TEST 1</>,
  <>TEST 2</>,
  <>TEST 3</>,
];

const variants: Variants = {
  hidden: {
    opacity: 0,
    // y: 50,
  },
  visible: {
    // y: 0,
    opacity: 1,
    transition: { duration: 1.25 },
  },
};

const Landing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex !== contents.length - 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  return (
    <section className="w-screen h-screen grid place-content-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          className="w-[75vw] h-fit"
          initial={"hidden"}
          animate={"visible"}
          exit={"hidden"}
        >
          {contents[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Landing;
