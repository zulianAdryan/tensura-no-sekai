import { SourceHTMLAttributes, VideoHTMLAttributes } from "react";

export const API = {
  BASE_URL: "https://api.jikan.moe/v4",
  ANIME_ID: "37430",
};

export const VIDEO_SOURCE: {
  [key: string]: Pick<
    VideoHTMLAttributes<HTMLVideoElement>,
    "src" | "poster"
  > & { type: SourceHTMLAttributes<HTMLSourceElement>["type"] };
} = {
  INTRO: {
    src: "/intro.mp4",
    poster: "",
    type: "video/mp4",
  },
  HOME: {
    src: "/home.mp4",
    poster: "/poster-home.jpg",
    type: "video/mp4",
  },
};
