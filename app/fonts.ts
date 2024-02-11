import {
  Nanum_Brush_Script as Nanum,
  Oswald,
  Rubik_Mono_One as Rubik,
  Victor_Mono as Victor,
} from 'next/font/google';

export const inter = Oswald({
  subsets: ["latin"],
  display: "swap",
});
export const Nanum_Brush_Script = Nanum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const Victor_Mono = Victor({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});
export const Rubik_Mono_One = Rubik({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
