import type { GalleryItem, GalleryCategory } from "@/types";

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "living", label: "거실" },
  { id: "kitchen", label: "주방" },
  { id: "bedroom", label: "침실" },
  { id: "bathroom", label: "욕실" },
  { id: "exterior", label: "외관" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/living-01.jpg", alt: "거실 전경", category: "living" },
  { id: "g2", src: "/images/gallery/living-02.jpg", alt: "거실 창측", category: "living" },
  { id: "g3", src: "/images/gallery/living-03.jpg", alt: "거실 인테리어", category: "living" },
  { id: "g4", src: "/images/gallery/kitchen-01.jpg", alt: "주방 전경", category: "kitchen" },
  { id: "g5", src: "/images/gallery/kitchen-02.jpg", alt: "주방 아일랜드", category: "kitchen" },
  { id: "g6", src: "/images/gallery/bedroom-01.jpg", alt: "안방", category: "bedroom" },
  { id: "g7", src: "/images/gallery/bedroom-02.jpg", alt: "자녀방", category: "bedroom" },
  { id: "g8", src: "/images/gallery/bedroom-03.jpg", alt: "서재", category: "bedroom" },
  { id: "g9", src: "/images/gallery/bathroom-01.jpg", alt: "욕실 전경", category: "bathroom" },
  { id: "g10", src: "/images/gallery/bathroom-02.jpg", alt: "드레스룸", category: "bathroom" },
  { id: "g11", src: "/images/gallery/exterior-01.jpg", alt: "단지 외관", category: "exterior" },
  { id: "g12", src: "/images/gallery/exterior-02.jpg", alt: "단지 야경", category: "exterior" },
];
