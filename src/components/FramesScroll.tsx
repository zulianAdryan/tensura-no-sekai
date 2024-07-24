"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useScroll, motion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const FramesScroll = ({ className }: { className?: ClassValue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_FRAMES = 278;
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const yProgress = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
    }
    const img = new Image();
    img.src = "/frames/0001.jpg";

    img.onload = () => {
      if (canvasRef.current && contextRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        contextRef.current.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    };

    const getImageSrc = (index: number): string =>
      `/frames/${index.toString().padStart(4, "0")}.jpg`;

    const preloadImages = async () => {
      const imageLoadedPromises = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const imgLoadPromise = new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => reject("error loading image");
        });
        imageLoadedPromises.push(imgLoadPromise);
        img.src = getImageSrc(i);
        await imgLoadPromise;
      }
      return Promise.all(imageLoadedPromises);
    };

    const updateImage = (index: number) => {
      img.src = getImageSrc(index);
      if (canvasRef.current && contextRef.current) {
        contextRef.current.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    };

    preloadImages();

    yProgress.on("change", (frames) =>
      requestAnimationFrame(() => updateImage(parseInt(frames.toString())))
    );
  }, []);

  return (
    <motion.div ref={containerRef} className={cn(className)}>
      <div className="sticky top-0 bg-cyan-100 overflow-hidden">
        <canvas ref={canvasRef} className="" />
      </div>
    </motion.div>
  );
};

export default FramesScroll;
