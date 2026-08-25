export type UnassignedMediaStatus = "needs-review";

export type UnassignedMediaType = "video" | "image";

export type UnassignedMediaItem = {
  file: string;
  propertySlug: string | null;
  type: UnassignedMediaType;
  status: UnassignedMediaStatus;
  notes: string;
};

/**
 * Construction stills held out of public listings until the client confirms
 * the site. Served from `/properties/unassigned-construction/` for internal
 * review only — do not attach to a property gallery.
 */
export const unassignedConstructionStills: UnassignedMediaItem[] = [
  {
    file: "public/properties/unassigned-construction/49.webp",
    propertySlug: null,
    type: "image",
    status: "needs-review",
    notes:
      "Needs client confirmation: possibly Saipem or another development.",
  },
  {
    file: "public/properties/unassigned-construction/50.webp",
    propertySlug: null,
    type: "image",
    status: "needs-review",
    notes:
      "Needs client confirmation: possibly Saipem or another development.",
  },
  {
    file: "public/properties/unassigned-construction/51.webp",
    propertySlug: null,
    type: "image",
    status: "needs-review",
    notes:
      "Needs client confirmation: possibly Saipem or another development.",
  },
];

/**
 * Developer note — video intake
 *
 * The inventory brief specified seven client MP4 files. The 25 Aug 2026
 * WhatsApp drop contained stills only; no MP4s were present in the workspace.
 * When each video arrives, replace the empty `file` value with the real
 * filename, keep `propertySlug: null` and `status: "needs-review"` until it
 * has been visually matched, then move it onto that listing’s detail page.
 *
 * Do not autoplay an unverified video anywhere. Once assigned:
 * show a poster first, load on view or interaction, autoplay muted only if
 * it is the verified property hero film, and always provide controls plus
 * a static fallback image.
 */
export const unassignedMedia: UnassignedMediaItem[] = [
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 1 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 2 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 3 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 4 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 5 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 6 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
  {
    file: "",
    propertySlug: null,
    type: "video",
    status: "needs-review",
    notes:
      "Client video 7 of 7. File not included in the 25 Aug 2026 stills drop. Keep off public pages until added and visually matched.",
  },
];
