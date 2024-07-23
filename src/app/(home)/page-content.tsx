"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimeFull } from "./type";
import Video from "@/components/Video";
import Intro from "./page-intro";
import { VIDEO_SOURCE } from "@/constants";
import WrapperRevealer from "@/components/WrapperRevealer";
import Link from "next/link";
import FramesScroll from "@/components/FramesScroll";

export interface PageContentProps {
  data: AnimeFull;
}

const PageContent = ({ data }: PageContentProps) => {
  const [animationComplete, setAnimationComplete] = useState<boolean>(true);

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
          <WrapperRevealer className="bg-fixed px-20">
            <div className="absolute inset-0 -z-10 w-full h-full">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-transparent shadow-[inset_800px_0px_500px_10px_#000] opacity-90" />
                <Video
                  className="w-screen h-screen object-cover"
                  src={VIDEO_SOURCE.HOME.src}
                  type={VIDEO_SOURCE.HOME.type}
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
            <div className="self-start w-full h-screen flex">
              <div className="my-auto px-10 flex flex-col gap-y-5">
                <div className="space-y-4 -ml-2">
                  <h1 className="text-[6.5rem] 3xl:text-[10rem] text-balance font-medium font-heading leading-none text-sky-500 text-shadow text-shadow-x-md text-shadow-y-sm text-shadow-cyan-100">
                    {data.title}
                  </h1>
                  <div className="flex gap-x-10 ml-2">
                    <div>
                      <p className="font-coiny text-slate-400/60">jp</p>
                      <p className="font-text text-pretty">
                        {data.title_japanese}
                      </p>
                    </div>
                    <div>
                      <p className="font-coiny text-slate-400/60">en</p>
                      <p className="font-text text-pretty">
                        {data.title_english}
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  aria-label="synopsis"
                  className="text-[0.70rem] desktop:text-sm font-sans leading-normal whitespace-pre-line w-[75%] text-pretty my-1 desktop:my-10"
                >
                  {data.synopsis}
                </p>

                <div className="flex flex-row items-start gap-x-20">
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2">
                      <p className="font-text mr-2">{data.type}</p>
                      {[...data.demographics, ...data.themes].map(
                        ({ name, mal_id }) => (
                          <p
                            key={mal_id}
                            className="border rounded w-fit px-2 py-1 bg-input/90 shadow-sm shadow-white/40 text-sm font-semibold font-text"
                          >
                            {name}
                          </p>
                        )
                      )}
                    </div>

                    <div className="flex gap-x-10 items-start">
                      <div className="flex flex-col items-start">
                        <p className="text-slate-300 text-xs">Licensors</p>
                        <div className="flex flex-row gap-1">
                          {data.licensors.map(({ mal_id, name, url }) => (
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
                          {data.studios.map(({ mal_id, name, url }) => (
                            <Link
                              key={mal_id}
                              href={url}
                              target="_blank"
                              aria-label={`studios-${name}`}
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
                      {data.genres.map(({ name, mal_id }) => (
                        <p key={mal_id} className="text-base font-text group">
                          {name}
                          <span className="group-last:hidden leading-[0px] ml-2">
                            ・
                          </span>
                        </p>
                      ))}
                    </div>
                    <p className="border border-slate-600/80 rounded bg-black text-sm text-white font-semibold w-fit py-1 px-2">
                      {data.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </WrapperRevealer>
          <WrapperRevealer>
            <FramesScroll className="h-[700vh]" />
          </WrapperRevealer>
        </main>
      )}
    </AnimatePresence>
  );
};

export default PageContent;
