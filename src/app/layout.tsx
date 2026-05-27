import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "펜타힐즈 W스퀘어 | 수변 문화복합몰 상가분양 안내",
  description:
    "호수공원을 품은 대구·경북 유일의 수변 문화복합몰 펜타힐즈 W스퀘어. 반경 3km 6만 3천여 배후세대, 3,443세대 단지 내 고정수요, 이탈리아 베로나 모티브 상가분양 접수 중.",
  keywords: [
    "펜타힐즈 W스퀘어",
    "펜타힐즈 더블유 스퀘어",
    "경산 상가분양",
    "중산지구 상가",
    "수변 문화복합몰",
    "중산호수공원",
    "아이에스동서",
  ],
  openGraph: {
    title: "펜타힐즈 W스퀘어 | 수변 문화복합몰 상가분양 안내",
    description:
      "호수공원을 품은 대구·경북 유일의 수변 문화복합몰. 6만 3천여 배후세대 상권 선점.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
