import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Regular expression to match YouTube URLs
export const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

/**
 * Combines class names using clsx and merges Tailwind CSS classes using twMerge.
 * 
 * @param inputs - An array of class values.
 * @returns A string of combined and merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}