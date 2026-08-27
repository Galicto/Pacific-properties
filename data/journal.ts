export type JournalArticle = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
  readTime: string;
};

/**
 * Editorial placeholders — titles specified for launch.
 * Replace body copy with client-approved notes before treating these as
 * published advice. Do not add invented dates, authors, statistics,
 * testimonials, or legal guidance.
 */
export const journalArticles: JournalArticle[] = [
  {
    slug: "a-considered-guide-to-buying-property-in-goa",
    title: "A Considered Guide to Buying Property in Goa",
    eyebrow: "Guidance",
    readTime: "A short note",
    excerpt:
      "How we prefer to work with buyers: slowly, on the ground, and with the documents given as much attention as the view.",
    image: "/properties/pilerne-villa-collection/hero.webp",
    imageAlt: "Principal living interior of a villa in Pilerne, North Goa.",
    body: [
      "Buying property in Goa is rarely only a question of taste. The house that photographs well may sit on a restless lane. The quieter plot may ask more of the paperwork. We would rather walk both with you than summarise either from a distance.",
      "Our usual order of work is simple. First, a conversation about how the house will actually be used — a family base, a second home, a place you may not occupy every month. Then a short list, drawn from what we currently represent and from introductions that fit. Viewings follow at an hour of the day that tells you something true about light and neighbouring life.",
      "Title, conversion, access and the character of the immediate setting all matter. None of this is offered here as legal advice. Independent due diligence remains essential on every purchase, and we will say so even when a house is one we are proud to show.",
      "If you are beginning, start with a confidential conversation. The right next step is usually smaller than a portal search, and more useful.",
    ],
  },
  {
    slug: "what-to-look-for-in-a-north-goa-villa",
    title: "What to Look for in a North Goa Villa",
    eyebrow: "Residences",
    readTime: "A short note",
    excerpt:
      "Orientation, compound, privacy and the grain of the village — the points we return to when a villa has to be lived in, not only admired.",
    image: "/properties/aldona-twin-villas/hero.webp",
    imageAlt: "Twin villas in Aldona with terracotta roofs, white walls and tropical planting.",
    body: [
      "A North Goa villa is often chosen for a feeling: laterite, a pool, a garden that holds the afternoon. Those things matter. What lasts is usually less photogenic — the way the house sits on its plot, the privacy of the compound, and whether the lane still feels like a place to live.",
      "We look at orientation and breeze before interior finishes. A beautiful room on the wrong side of the day becomes a house that is lived with the shutters down. We look at parking, service access and the neighbours’ roofs. We look at whether a pool is a pleasure or a calendar of maintenance you did not plan to keep.",
      "The neighbourhoods we represent across North and South Goa do not behave as one market. A house that is right in one will not automatically be right in another. That is the point of walking them, rather than collecting them from a screen.",
      "If you are considering a villa, we would rather begin with how you spend an ordinary Tuesday in Goa than with a list of amenities.",
    ],
  },
  {
    slug: "understanding-goa-property-investment",
    title: "Understanding Goa Property Investment",
    eyebrow: "Holding",
    readTime: "A short note",
    excerpt:
      "A second home, a long hold, land, or commercial space — different decisions, none of which should be made in a hurry.",
    image: "/properties/pilerne-villa-collection/24.webp",
    imageAlt: "Private swimming pool and garden at the Pilerne villa collection.",
    body: [
      "Investment, in the way clients use the word, usually means more than a yield. Some are buying a house they will occupy. Some are holding land until a plan is clear. Some are looking at commercial space as a different class of asset. The work is to keep those aims from being confused.",
      "A villa bought in a generous mood and held without a use in mind can become expensive to keep. Land that photographs well is not always land that can be built upon in the way a buyer hopes. Commercial warehouse space, such as the inventory we currently represent in Verna, answers a different brief from a home in North Goa.",
      "We do not publish forecasts, returns or testimonials. Markets move, and a serious purchase should be tested against your own horizon, your own advisers, and the documents in front of you. Our part is to be precise about what a property is, what is known, and what remains to be verified.",
      "If you are weighing a hold in Goa, begin with the use of the property, then the place, then the paper. The order is unglamorous. It is also how a decision stays considered.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
