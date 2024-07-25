"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, motion, useAnimate } from "framer-motion";
import { AnimeFull } from "./type";
import Video from "@/components/Video";
import Intro from "./page-intro";
import { VIDEO_SOURCE } from "@/constants";
import WrapperRevealer from "@/components/WrapperRevealer";
import Link from "next/link";
import FramesScroll from "@/components/FramesScroll";
import { Meteors } from "@/components/Meteors";

const Index = ({ data }: PageContentProps) => {
  const [animationComplete, setAnimationComplete] = useState<boolean>(true);

  useEffect(() => {
    process.env.NODE_ENV === "production" ? window.scrollTo(0, 0) : null;
  }, []);

  console.log("[PAGE CONTENT] ", {
    data,
    animationComplete,
  });

  return (
    <AnimatePresence>
      {!animationComplete ? (
        <Intro onAnimationComplete={() => setAnimationComplete(true)} />
      ) : (
        <main className="relative min-w-screen flex flex-col">
          <WrapperRevealer className="sticky top-0 px-20 -z-10">
            <Introduction
              title={data.title}
              title_english={data.title_english}
              title_japanese={data.title_japanese}
              type={data.type}
              demographics={data.demographics}
              themes={data.themes}
              licensors={data.licensors}
              studios={data.studios}
              genres={data.genres}
              rating={data.rating}
            />
          </WrapperRevealer>
          <WrapperRevealer>
            <Synopsis synopsis={data.synopsis} />
            <div className="relative">
              <div className="absolute z-10 top-0 w-full h-[50px] bg-transparent shadow-[inset_0px_20px_10px_5px_#23358b] 23358b opacity-90" />
              <div className="absolute z-10 top-0 w-full h-[50px] bg-transparent shadow-[inset_0px_10px_10px_1px_#23358b] 23358b opacity-90" />
              <FramesScroll className="h-[850vh]" />
            </div>
            <div className="h-[200vh]">TEST</div>
          </WrapperRevealer>
        </main>
      )}
    </AnimatePresence>
  );
};

const Introduction = ({
  title,
  title_english,
  title_japanese,
  type,
  demographics,
  themes,
  licensors,
  studios,
  genres,
  rating,
}: IntroductionProps) => {
  return (
    <>
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-transparent shadow-[inset_800px_0px_400px_50px_#000] opacity-90" />
          <div className="absolute bottom-0 w-full h-[50px] bg-transparent shadow-[inset_0px_-51px_8px_-45px_#000] opacity-90" />
          <Video
            className="w-screen h-screen object-cover"
            src={VIDEO_SOURCE.HOME.src}
            type={VIDEO_SOURCE.HOME.type}
            autoPlay
            loop
            muted
            aria-label="background"
          />
        </div>
      </div>
      <div className="self-start w-full h-screen flex">
        <div className="my-auto mb-24 px-10 flex flex-col gap-y-10">
          <div className="space-y-4 -ml-2">
            <h1
              className="text-[8rem] 3xl:text-[10rem] text-balance font-medium text-slime select-none"
              aria-label="title-default"
            >
              {title}
            </h1>
            <div className="flex gap-x-40 ml-2">
              <div>
                <p className="font-coiny text-slate-400/60">jp</p>
                <p
                  className="font-text text-pretty"
                  aria-label="title-japanese"
                >
                  {title_japanese}
                </p>
              </div>
              <div>
                <p className="font-coiny text-slate-400/60">en</p>
                <p className="font-text text-pretty" aria-label="title-english">
                  {title_english}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-start gap-x-16">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2">
                <p className="font-text mr-2">{type}</p>
                {[...demographics, ...themes].map(({ name, mal_id }) => (
                  <p
                    key={mal_id}
                    className="border rounded w-fit px-2 py-1 bg-input/90 shadow-sm shadow-white/40 text-sm font-semibold font-text"
                    aria-label={`demographic-${mal_id}`}
                  >
                    {name}
                  </p>
                ))}
              </div>

              <div className="flex gap-x-10 items-start">
                <div className="flex flex-col items-start">
                  <p className="text-slate-300 text-xs">Licensors</p>
                  <div className="flex flex-row gap-1">
                    {licensors.map(({ mal_id, name, url }) => (
                      <Link
                        key={mal_id}
                        href={url}
                        target="_blank"
                        aria-label={`licensor-${name}`}
                        className="hover:text-hover"
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-slate-300 text-xs">Studios</p>
                  <div className="flex flex-row gap-1">
                    {studios.map(({ mal_id, name, url }) => (
                      <Link
                        key={mal_id}
                        href={url}
                        target="_blank"
                        aria-label={`studio-${name}`}
                        className="hover:text-hover"
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 ml-1">
                {genres.map(({ name, mal_id }) => (
                  <p
                    key={mal_id}
                    className="text-base font-text group"
                    aria-label={`genre-${name}`}
                  >
                    {name}
                    <span className="group-last:hidden leading-[0px] ml-2">
                      ・
                    </span>
                  </p>
                ))}
              </div>
              <p
                className="border border-slate-700/80 rounded bg-black text-sm text-white font-semibold w-fit py-1 px-2"
                aria-label="rating"
              >
                {rating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Synopsis = ({ synopsis }: SynopsisProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "h1",
        {
          opacity: 1,
          y: 0,
        },
        {
          duration: 0.85,
        }
      );
    } else {
      animate(
        "h1",
        {
          opacity: 0,
          y: 200,
        },
        {
          duration: 1,
        }
      );
    }
  }, [isInView]);

  return (
    <div className="h-[180vh] overflow-x-hidden relative grid place-items-end bg-gradient-to-b from-black from-20% to-[#23358b] shadow-[0px_10px_60px_60px_#000]">
      <div className="absolute top-[25vh] w-full">
        <Meteors number={25} height={600} />
      </div>
      {/* <div className="absolute z-10 bottom-0 w-full h-[50px] bg-transparent shadow-[0px_20px_13px_0px_#23358b] opacity-90" /> */}
      {/* <div className="absolute z-10 bottom-0 w-full h-[50px] bg-transparent shadow-[inset_20px_-25px_10px_-28px_#23358b] opacity-90" /> */}
      <div ref={scope} className="px-20 space-y-[10rem] mb-16 z-10">
        <motion.h1
          className="text-slime text-9xl desktop:text-9xl"
          initial={{
            opacity: 0,
          }}
        >
          Synopsis
        </motion.h1>
        <p
          aria-label="synopsis"
          className="text-lg desktop:text-2xl font-desc tracking-wider !leading-loose whitespace-pre-line text-pretty"
        >
          {synopsis}
        </p>
      </div>
    </div>
  );
};
export default Index;
export interface PageContentProps {
  data: AnimeFull;
}
type IntroductionProps = Pick<
  AnimeFull,
  | "title"
  | "title_japanese"
  | "title_english"
  | "type"
  | "demographics"
  | "themes"
  | "licensors"
  | "studios"
  | "genres"
  | "rating"
>;
type SynopsisProps = Pick<AnimeFull, "synopsis">;
