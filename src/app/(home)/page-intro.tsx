import Video from "@/components/Video";
import { useAnimate, motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";

const DISCLAIMER_TRANSITION = {
  delay: 0.85,
  duration: 1.25,
};

interface PageIntroProps {
  onAnimationComplete: () => void;
}

const PageIntro = ({ onAnimationComplete }: PageIntroProps) => {
  const [disclaimerRef, disclaimer] = useAnimate();
  const controls = useAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleTimeUpdate = () => {
        if (videoElement.currentTime >= 11) {
          controls.start({ scale: 6, opacity: 0 }, { duration: 1.5 });
        }
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [controls]);

  const handleVideo = () => {
    return {
      start: async () => {
        await disclaimer(
          disclaimerRef.current,
          {
            opacity: 0,
          },
          { duration: DISCLAIMER_TRANSITION.duration }
        );
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
      stop: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        // setAnimationComplete(true);
        onAnimationComplete();
      },
    };
  };

  //   console.log({ animationComplete });

  return (
    <section className="bg-black relative w-screen h-screen grid place-content-center overflow-hidden">
      <motion.div
        ref={disclaimerRef}
        className="w-[75vw] h-fit"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: DISCLAIMER_TRANSITION.delay,
          duration: DISCLAIMER_TRANSITION.duration,
        }}
        exit={"hidden"}
        onAnimationComplete={handleVideo().start}
      >
        <h1 className="text-4xl mb-4">Disclaimer</h1>
        <div className="tracking-wider leading-relaxed text-pretty font-notojp">
          <p>
            This website is not related to any Tensei shitara Slime Datta Ken
            「転生したらスライムだった件」 or That Time I Got Reincarnated as a
            Slime or any of its franchise related.
          </p>
          <p>
            This website is just purely made by me as a fan of the series and as
            my programming practice thus its built with open sources API and I
            do not make nor gained any profit by building this site.
          </p>
          <p className="mt-10">Thank you 「ありがとございます」.</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 grid place-content-center"
        initial={{ scale: 1 }}
        animate={controls}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-transparent shadow-[inset_0px_0px_10px_10px_#000]" />
          <Video
            className="w-screen h-full object-cover"
            ref={videoRef}
            src="/intro.mp4"
            type="video/mp4"
            // autoPlay={true}
            muted
            onEnded={handleVideo().stop}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default PageIntro;
