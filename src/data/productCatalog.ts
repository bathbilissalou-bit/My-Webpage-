export interface ColorOption {
  name: string;
  hex: string;
}

export interface FabricOption {
  id: string;
  name: string;
  grade: string; // e.g. "Super 220"
  desc: string;
}

export interface DesignOption {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

export interface FitOption {
  id: string;
  name: string;
  desc: string;
}

export interface ConfigurableProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  colors: ColorOption[];
  fabrics: FabricOption[];
}

export const DESIGN_OPTIONS: DesignOption[] = [
  { id: "classic",    icon: "◈", name: "Classic",             desc: "Timeless silhouette, heritage cut. The HavrePlacide foundation." },
  { id: "modern",     icon: "◻", name: "Modern",              desc: "Clean lines, contemporary structure. For today's tastemaker." },
  { id: "royal",      icon: "♛", name: "Royal / Ceremonial",  desc: "Ornate details, elevated finish. Crafted for exceptional moments." },
  { id: "minimal",    icon: "○", name: "Minimal",             desc: "Quiet luxury, refined simplicity. When less says everything." },
  { id: "embroidered",icon: "✦", name: "Embroidered",         desc: "Handcrafted motifs, artisan detail. Every stitch tells a story." },
  { id: "statement",  icon: "◆", name: "Statement / Bold",    desc: "Strong presence, signature piece. Wear your identity with pride." },
  { id: "wedding",    icon: "❋", name: "Wedding / Special",   desc: "Ceremonial elegance, unforgettable. For life's most meaningful moments." },
  { id: "business",   icon: "▪", name: "Business / Formal",   desc: "Polished excellence, professional authority. Command every room." },
];

export const FIT_OPTIONS: FitOption[] = [
  { id: "slim",    name: "Slim Fit",     desc: "Tailored close to the body, sharp silhouette" },
  { id: "regular", name: "Regular Fit",  desc: "Classic ease with clean, structured lines" },
  { id: "relaxed", name: "Relaxed Fit",  desc: "Comfortable and generous, effortlessly refined" },
  { id: "bespoke", name: "Bespoke Fit",  desc: "Fully custom to your exact measurements" },
];

const SHARED_FABRICS: FabricOption[] = [
  { id: "super100", name: "Super 100",   grade: "Super 100",  desc: "Lightweight, breathable. Perfect for warm climates." },
  { id: "super120", name: "Super 120",   grade: "Super 120",  desc: "Medium weight, versatile for year-round wear." },
  { id: "super150", name: "Super 150",   grade: "Super 150",  desc: "Premium quality, structured drape and body." },
  { id: "super220", name: "Super 220",   grade: "Super 220",  desc: "Finest grade available. Exceptional luxury drape." },
  { id: "linen",    name: "Linen Blend", grade: "Linen",      desc: "Natural texture, elegant casual refinement." },
  { id: "cotton",   name: "Cotton Blend",grade: "Cotton",     desc: "Everyday luxury. Breathable, comfortable excellence." },
];

export const PRODUCT_CATALOG: ConfigurableProduct[] = [
  {
    id: "tunique-navy",
    name: "Tunique Bleu Marine",
    image: "/img-man-navy-side.jpeg",
    price: "$350 – $400",
    colors: [
      { name: "Navy",     hex: "#1a2a4a" },
      { name: "Midnight", hex: "#0d0d0d" },
      { name: "Charcoal", hex: "#3a3a3a" },
      { name: "Ivory",    hex: "#f5f0e8" },
      { name: "Gold",     hex: "#c9a96e" },
      { name: "Burgundy", hex: "#6b2737" },
    ],
    fabrics: [
      SHARED_FABRICS[2], // Super 150
      SHARED_FABRICS[3], // Super 220
      SHARED_FABRICS[0], // Super 100
    ],
  },
  {
    id: "tunique-grey",
    name: "Tunique Gris Lin",
    image: "/img-man-grey-standing.jpeg",
    price: "$350 – $400",
    colors: [
      { name: "Charcoal", hex: "#3a3a3a" },
      { name: "Stone",    hex: "#8a8070" },
      { name: "Ivory",    hex: "#f5f0e8" },
      { name: "Sage",     hex: "#7a8f7a" },
      { name: "Navy",     hex: "#1a2a4a" },
      { name: "Taupe",    hex: "#b5a898" },
    ],
    fabrics: [
      SHARED_FABRICS[0], // Super 100
      SHARED_FABRICS[4], // Linen Blend
      SHARED_FABRICS[1], // Super 120
    ],
  },
  {
    id: "tunique-taupe",
    name: "Tunique Grège",
    image: "/img-tunique-taupe.png",
    price: "$350 – $400",
    colors: [
      { name: "Taupe",    hex: "#b5a898" },
      { name: "Ivory",    hex: "#f5f0e8" },
      { name: "Stone",    hex: "#8a8070" },
      { name: "Gold",     hex: "#c9a96e" },
      { name: "Sage",     hex: "#7a8f7a" },
      { name: "Midnight", hex: "#0d0d0d" },
    ],
    fabrics: [
      SHARED_FABRICS[3], // Super 220
      SHARED_FABRICS[2], // Super 150
      SHARED_FABRICS[5], // Cotton Blend
    ],
  },
];
