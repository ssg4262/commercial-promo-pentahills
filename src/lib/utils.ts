import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKoreanPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");

  if (numbers.startsWith("02")) {
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  }

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}

export function convertToSquareMeters(pyeong: number): number {
  return Math.round(pyeong * 3.305785 * 100) / 100;
}

export function convertToPyeong(sqm: number): number {
  return Math.round((sqm / 3.305785) * 100) / 100;
}

export function getBasePath(): string {
  if (process.env.NODE_ENV !== "production") return "";
  if (process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === "true") return "";
  return "/commercial-promo-pentahills";
}

export function getImagePath(path: string): string {
  return `${getBasePath()}${path}`;
}
