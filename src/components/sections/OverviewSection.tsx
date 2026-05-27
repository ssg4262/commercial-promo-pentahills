"use client";

import { useState } from "react";
import { cn, convertToPyeong } from "@/lib/utils";
import { PROJECT, PROJECT_STATS, PROJECT_OVERVIEW_TABLE } from "@/data/project";
import { UNIT_TYPES } from "@/data/unit-types";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import AnimatedCounter from "@/components/common/AnimatedCounter";

export default function OverviewSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "units">("overview");
  const [unitMode, setUnitMode] = useState<"sqm" | "pyeong">("sqm");

  const fmtArea = (val: number) =>
    unitMode === "pyeong" ? `${convertToPyeong(val)}평` : `${val}㎡`;

  return (
    <SectionWrapper id="overview" title="사업개요" subtitle="Overview">
      {/* Stats - minimal horizontal layout */}
      <div className="mb-12 md:mb-20 grid grid-cols-2 gap-px bg-neutral-200 md:grid-cols-4 dark:bg-neutral-800">
        {PROJECT_STATS.map((stat, i) => (
          <RevealOnScroll key={stat.label} delay={i * 0.08}>
            <div className="bg-white p-8 text-center dark:bg-[#0a0a0a]">
              <div className="heading-display text-3xl text-neutral-900 dark:text-white md:text-4xl">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
                {stat.suffix}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Tabs */}
      <RevealOnScroll>
        <div className="mb-10 flex gap-6 overflow-x-auto border-b border-neutral-200 dark:border-neutral-800 scrollbar-hide">
          {[
            { id: "overview" as const, label: "사업개요" },
            { id: "units" as const, label: "세대정보" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative pb-4 text-[15px] font-medium transition-colors",
                activeTab === tab.id
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Tab content */}
      <RevealOnScroll>
        {activeTab === "overview" && (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {PROJECT_OVERVIEW_TABLE.map((row) => (
              <div key={row.label} className="flex py-4">
                <span className="w-28 shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400 md:w-36">
                  {row.label}
                </span>
                <span className="text-sm text-neutral-800 dark:text-neutral-200">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "units" && (
          <div>
            {/* Unit toggle */}
            <div className="mb-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setUnitMode("sqm")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition",
                  unitMode === "sqm"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800"
                )}
              >
                ㎡
              </button>
              <button
                onClick={() => setUnitMode("pyeong")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition",
                  unitMode === "pyeong"
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800"
                )}
              >
                평 (공급기준)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b-2 border-neutral-900 dark:border-white">
                    <th className="pb-3 text-left font-medium">타입</th>
                    <th className="pb-3 text-right font-medium">전용면적</th>
                    <th className="pb-3 text-right font-medium">공급면적</th>
                    <th className="pb-3 text-right font-medium">세대수</th>
                    <th className="pb-3 text-right font-medium">비율</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {UNIT_TYPES.map((unit) => (
                    <tr key={unit.id} className="group">
                      <td className="py-3.5 font-semibold">{unit.name}</td>
                      <td className="py-3.5 text-right text-neutral-500">{fmtArea(unit.exclusiveArea)}</td>
                      <td className="py-3.5 text-right text-neutral-500">{fmtArea(unit.supplyArea)}</td>
                      <td className="py-3.5 text-right font-medium">{unit.unitCount}세대</td>
                      <td className="py-3.5 text-right text-neutral-400">
                        {((unit.unitCount / 1004) * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-neutral-900 dark:border-white font-semibold">
                    <td className="py-3.5">계</td>
                    <td className="py-3.5 text-right">-</td>
                    <td className="py-3.5 text-right">-</td>
                    <td className="py-3.5 text-right">1,004세대</td>
                    <td className="py-3.5 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </RevealOnScroll>
    </SectionWrapper>
  );
}
