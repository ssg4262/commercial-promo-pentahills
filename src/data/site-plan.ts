export type UnitTypeId = "74A" | "84A" | "84B" | "99A" | "99B";

export const UNIT_COLORS: Record<UnitTypeId, string> = {
  "74A": "#F9A8D4", // pink
  "84A": "#86EFAC", // green
  "84B": "#FCD34D", // yellow
  "99A": "#93C5FD", // blue
  "99B": "#C4B5FD", // violet
};

export const UNIT_BG: Record<UnitTypeId, string> = {
  "74A": "#FCE7F3",
  "84A": "#DCFCE7",
  "84B": "#FEF3C7",
  "99A": "#DBEAFE",
  "99B": "#EDE9FE",
};

export interface UnitCell {
  ho: number;       // 호수 (1, 2, 3, 4...)
  type: UnitTypeId;
}

export interface FloorData {
  floor: number;    // 층 (1 = 1층, -1 = B1)
  units: UnitCell[];
}

export interface BuildingDef {
  id: string;
  label: string;
  totalUnits: number;
  floors: FloorData[];
  // SVG footprint (viewBox 0 0 900 600)
  svgX: number;
  svgY: number;
  svgW: number;
  svgH: number;
  dominantColor: string;
}

function makeFloors(
  maxFloor: number,
  pattern: UnitTypeId[],
  minFloor = 1,
): FloorData[] {
  const result: FloorData[] = [];
  for (let f = maxFloor; f >= minFloor; f--) {
    result.push({
      floor: f,
      units: pattern.map((type, i) => ({ ho: i + 1, type })),
    });
  }
  return result;
}

export const BUILDINGS: BuildingDef[] = [
  {
    id: "101",
    label: "101동",
    totalUnits: 22 * 3,    // 33층 × 2호 = 66 → 실제 약 66
    floors: makeFloors(33, ["84A", "99B", "99B"]),
    svgX: 620, svgY: 90, svgW: 45, svgH: 310,
    dominantColor: UNIT_COLORS["84A"],
  },
  {
    id: "102",
    label: "102동",
    totalUnits: 35 * 4,
    floors: makeFloors(35, ["84A", "84A", "99A", "99A"]),
    svgX: 490, svgY: 65, svgW: 48, svgH: 350,
    dominantColor: UNIT_COLORS["84A"],
  },
  {
    id: "103",
    label: "103동",
    totalUnits: 25 * 4,
    floors: makeFloors(25, ["84A", "84B", "84B", "84A"]),
    svgX: 370, svgY: 170, svgW: 46, svgH: 220,
    dominantColor: UNIT_COLORS["84B"],
  },
  {
    id: "104",
    label: "104동",
    totalUnits: 35 * 4,
    floors: makeFloors(35, ["84A", "84A", "84B", "84B"]),
    svgX: 245, svgY: 60, svgW: 50, svgH: 360,
    dominantColor: UNIT_COLORS["84A"],
  },
  {
    id: "105",
    label: "105동",
    totalUnits: 28 * 4,
    floors: makeFloors(28, ["74A", "74A", "74A", "74A"]),
    svgX: 155, svgY: 300, svgW: 52, svgH: 190,
    dominantColor: UNIT_COLORS["74A"],
  },
  {
    id: "106",
    label: "106동",
    totalUnits: 35 * 4,
    floors: makeFloors(35, ["84A", "84B", "84B", "84A"]),
    svgX: 275, svgY: 320, svgW: 50, svgH: 240,
    dominantColor: UNIT_COLORS["84A"],
  },
  {
    id: "107",
    label: "107동",
    totalUnits: 30 * 4,
    floors: makeFloors(30, ["84A", "99A", "99A", "84B"]),
    svgX: 400, svgY: 310, svgW: 50, svgH: 255,
    dominantColor: UNIT_COLORS["99A"],
  },
  {
    id: "108",
    label: "108동",
    totalUnits: 35 * 4,
    floors: makeFloors(35, ["99A", "99B", "99B", "84A"]),
    svgX: 530, svgY: 305, svgW: 105, svgH: 215,
    dominantColor: UNIT_COLORS["99B"],
  },
];

// 단지 외곽 경계 (SVG 폴리곤 포인트)
export const SITE_BOUNDARY =
  "100,50 720,40 850,120 870,490 720,570 580,590 200,560 80,440 60,280 100,50";
