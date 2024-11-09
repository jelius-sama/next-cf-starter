import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFile(value: any): value is File {
  return value instanceof File;
}

export function isString(value: any): value is string {
  return typeof value === "string";
}
