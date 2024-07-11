import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Inter as FontSans,
  Noto_Sans_JP as FontNotoSansJapanese,
} from "next/font/google";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });
const fontNotoSansJapanese = FontNotoSansJapanese({
  subsets: ["latin"],
  variable: "--font-notojp",
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fonts = [fontSans.variable, fontNotoSansJapanese.variable];
