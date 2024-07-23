import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Inter as FontSans,
  Noto_Sans_JP as FontNotoSansJapanese,
  Cherry_Bomb_One as FontCherry,
  Coiny as FontCoiny,
  Mochiy_Pop_One as FontMochiy,
} from "next/font/google";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontNotoSansJapanese = FontNotoSansJapanese({
  subsets: ["latin"],
  variable: "--font-notojp",
});
const fontCherry = FontCherry({
  subsets: ["latin"],
  variable: "--font-cherry",
  weight: "400",
});
const fontCoiny = FontCoiny({
  subsets: ["latin"],
  variable: "--font-coiny",
  weight: "400",
});
const fontMochiy = FontMochiy({
  subsets: ["latin"],
  variable: "--font-mochiy",
  weight: "400",
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fonts = [
  fontSans.variable,
  fontNotoSansJapanese.variable,
  fontCherry.variable,
  fontCoiny.variable,
  fontMochiy.variable,
];
