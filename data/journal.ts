export type JournalArticle = {
  slug: string;
  title: string;
  eyebrow: string;
  date: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
  readTime: string;
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "assagao-after-the-noise",
    title: "Assagao, after the noise",
    eyebrow: "Neighbourhood",
    date: "March 2026",
    readTime: "6 min",
    excerpt:
      "What remains when a village becomes an address — and how to read a house there with a cooler head.",
    image:
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop",
    imageAlt: "A quiet courtyard house, in the manner of inland North Goa.",
    body: [
      "Assagao’s reputation arrived faster than most of its lanes could absorb it. The restaurants are known; the laterite walls are photographed. What is less often said is how the village still works as a place to live — if the house is chosen with a little patience.",
      "We look first at orientation, compound, and the character of the immediate lane. A beautiful interior on a restless road is a weekend house. A simpler house on a still lane is often the one people keep.",
      "This note is a beginning, not a map. If you are considering Assagao, we would rather walk it with you than summarise it from a distance.",
    ],
  },
  {
    slug: "buying-land-in-goa",
    title: "Buying land in Goa, without haste",
    eyebrow: "Guidance",
    date: "January 2026",
    readTime: "8 min",
    excerpt:
      "Title, conversion, access and the slow work of knowing a plot before a plan is drawn.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop",
    imageAlt: "A wooded parcel of land in filtered morning light.",
    body: [
      "Land in Goa rewards those who can wait. The parcel that photographs well is not always the parcel that can be built upon in the way a buyer hopes. Conversion, access, slope, and the neighbours’ roofs all matter more than a drone still.",
      "Our work on land is mostly listening, then reading documents, then walking the site at more than one hour of the day. None of this is glamorous. It is how a house avoids becoming a problem.",
      "If you are looking at a plot — in Moira, Assagao, or further afield — we can help you decide whether it is a beginning, or only a beautiful photograph.",
    ],
  },
  {
    slug: "the-quiet-calculus-of-a-second-home",
    title: "The quiet calculus of a second home",
    eyebrow: "Living",
    date: "November 2025",
    readTime: "5 min",
    excerpt:
      "Between a villa, an apartment and a house you may not occupy every month — how to choose on purpose.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop",
    imageAlt: "A still swimming pool at the edge of a tropical house.",
    body: [
      "A second home in Goa is often bought in a generous mood and lived in a practical one. The pool that delighted in January can become a calendar of maintenance by July. The villa that felt necessary on a viewing can feel large when you arrive alone.",
      "We ask clients to describe an ordinary Tuesday in Goa, not a festive week. From that, the right scale usually appears — sometimes a courtyard house, sometimes a well-made apartment with a terrace.",
      "There is no correct answer, only a considered one. That is the work.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
