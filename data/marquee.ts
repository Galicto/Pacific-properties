export type MarqueeImage = {
  src: string;
  alt: string;
  width: "narrow" | "regular" | "wide";
};

/**
 * Dual-row marquee stills. REPLACE with local photography
 * (villas, laterite, interiors, pools, palms, coastline).
 */
export const marqueeImages: MarqueeImage[] = [
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop",
    alt: "A villa courtyard organised around a swimming pool.",
    width: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop",
    alt: "A bedroom in filtered tropical light.",
    width: "narrow",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop",
    alt: "A lawn and pool at a coastal residence.",
    width: "regular",
  },
  {
    src: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop",
    alt: "A Portuguese-influenced village street.",
    width: "narrow",
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop",
    alt: "An infinity edge looking toward tropical planting.",
    width: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop",
    alt: "A dining room opening toward the garden.",
    width: "regular",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop",
    alt: "The Arabian Sea along a Goa shoreline.",
    width: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop",
    alt: "An interior gallery beside a planted court.",
    width: "narrow",
  },
  {
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop",
    alt: "A modern tropical house with a long pool.",
    width: "regular",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop",
    alt: "Temple-scale tropical architecture and palms.",
    width: "regular",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop",
    alt: "A stone and timber bathing room.",
    width: "narrow",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop",
    alt: "A covered lounge beside still water.",
    width: "wide",
  },
];
