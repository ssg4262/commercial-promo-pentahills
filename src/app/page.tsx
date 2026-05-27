"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SideNav from "@/components/layout/SideNav";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import VideoSection from "@/components/sections/VideoSection";
import OverviewSection from "@/components/sections/OverviewSection";
import CommercialSection from "@/components/sections/CommercialSection";
import DividerSection from "@/components/sections/DividerSection";
import BirdEyeSection from "@/components/sections/BirdEyeSection";
import CommunitySection from "@/components/sections/CommunitySection";
// 세대안내: 자료 확보 후 추가 예정 (임시 주석)
// import FloorPlanSection from "@/components/sections/FloorPlanSection";
import EnvSection from "@/components/sections/EnvSection";
import DevEnvSection from "@/components/sections/DevEnvSection";
import RegistrationSection from "@/components/sections/RegistrationSection";

export default function Home() {
  useActiveSection();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        {/* 파격 분양혜택 배너: 자료 확보 후 추가 예정 (임시 제거) */}
        <VideoSection
          id="intro-video"
          title="펜타힐즈 W스퀘어, 경산의 새로운 랜드마크 상권"
          subtitle="Promotion Film"
          src="/videos/intro.mp4"
        />
        <OverviewSection />
        <CommercialSection />
        <DividerSection
          quote="호수공원이 선사하는 낭만, 펜타힐즈 W스퀘어가 완성합니다"
        />
        <BirdEyeSection />
        <CommunitySection />
        {/* 세대안내: 자료 확보 후 추가 예정 (임시 주석) */}
        {/* <FloorPlanSection /> */}
        <DividerSection
          quote="도시의 모든 일상을 담은 대규모 배후 수요의 중심"
          author="Pentahills W Square"
        />
        <EnvSection />
        <DevEnvSection />
        <RegistrationSection />
      </main>
      <Footer />
      <SideNav />
      <FloatingCTA />
      <ScrollToTop />
    </>
  );
}
