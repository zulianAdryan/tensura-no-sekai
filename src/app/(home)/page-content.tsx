"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimeFull } from "./type";
import Video from "@/components/Video";
import Intro from "./page-intro";

export interface PageContentProps {
  data: AnimeFull;
}

const PageContent = ({ data }: PageContentProps) => {
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  return (
    <AnimatePresence>
      {!animationComplete ? (
        <Intro onAnimationComplete={() => setAnimationComplete(true)} />
      ) : (
        <main className="relative min-w-screen grid h-screen px-20">
          <div className="absolute inset-0 -z-10 w-full">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-transparent shadow-[inset_0px_0px_200px_25px_#000]" />
              <Video
                className="w-screen h-screen object-cover"
                src="/home.webm"
                type="video/webm"
                autoPlay
                loop
                muted
              />
            </div>
          </div>
          <div className="self-center w-full">
            <h1>Tensura</h1>
          </div>
        </main>
      )}
    </AnimatePresence>
  );
};

export default PageContent;
