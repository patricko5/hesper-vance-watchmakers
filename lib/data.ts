export type Model = {
  slug: string;
  name: string;
  reference: string;
  caseMaterial: "Stainless Steel" | "Rose Gold" | "White Gold" | "Platinum";
  movementType: "manual wind" | "automatic";
  complication: "time only" | "small seconds" | "chronograph" | "perpetual calendar" | "moon phase" | "tourbillon";
  priceChf: number;
  releaseOrder: number;
  dialColors: string[];
  straps: string[];
  description: string;
  specs: Record<string, string>;
};

export const models: Model[] = [
  {
    slug: "hesper-calibre-01",
    name: "Hesper Calibre 01",
    reference: "H01-RG",
    caseMaterial: "Rose Gold",
    movementType: "manual wind",
    complication: "time only",
    priceChf: 48000,
    releaseOrder: 6,
    dialColors: ["Warm opaline", "Graphite", "Silver sector"],
    straps: ["Alligator leather", "Calf leather", "Fabric NATO"],
    description:
      "A narrow bridge train and hand-finished barrel bridge make the first Hesper calibre legible from the back. The dial is quiet so the handwork carries the note.",
    specs: {
      "Case diameter": "38.5 mm",
      "Case thickness": "9.4 mm",
      "Case material": "18k rose gold",
      "Dial color": "Warm opaline",
      "Movement caliber": "HV-101",
      "Power reserve": "72 hours",
      Frequency: "21,600 vph",
      Jewels: "21",
      "Water resistance": "30 m",
      Strap: "Hand-stitched alligator"
    }
  },
  {
    slug: "hesper-calibre-02",
    name: "Hesper Calibre 02",
    reference: "H02-PT",
    caseMaterial: "Platinum",
    movementType: "manual wind",
    complication: "small seconds",
    priceChf: 62000,
    releaseOrder: 5,
    dialColors: ["Granite grey", "Bone enamel", "Black lacquer"],
    straps: ["Alligator leather", "Calf leather", "Fabric NATO"],
    description:
      "The seconds indication sits off-axis to leave the wheel train visible. The platinum case is kept thin and cool in the hand.",
    specs: {
      "Case diameter": "39 mm",
      "Case thickness": "9.8 mm",
      "Case material": "950 platinum",
      "Dial color": "Granite grey",
      "Movement caliber": "HV-102",
      "Power reserve": "68 hours",
      Frequency: "21,600 vph",
      Jewels: "23",
      "Water resistance": "30 m",
      Strap: "Matte alligator"
    }
  },
  {
    slug: "vance-chronograph",
    name: "Vance Chronograph",
    reference: "V03-SS",
    caseMaterial: "Stainless Steel",
    movementType: "automatic",
    complication: "chronograph",
    priceChf: 38000,
    releaseOrder: 4,
    dialColors: ["Black gilt", "Silver", "Blue grey"],
    straps: ["Alligator leather", "Calf leather", "Fabric NATO"],
    description:
      "A column wheel calibre with a visible lateral coupling. The reset hammer is polished flat, then angled by hand.",
    specs: {
      "Case diameter": "40 mm",
      "Case thickness": "12.2 mm",
      "Case material": "316L stainless steel",
      "Dial color": "Black gilt",
      "Movement caliber": "HV-303",
      "Power reserve": "56 hours",
      Frequency: "28,800 vph",
      Jewels: "31",
      "Water resistance": "50 m",
      Strap: "Calf leather"
    }
  },
  {
    slug: "vance-perpetual",
    name: "Vance Perpetual",
    reference: "V04-WG",
    caseMaterial: "White Gold",
    movementType: "automatic",
    complication: "perpetual calendar",
    priceChf: 95000,
    releaseOrder: 3,
    dialColors: ["Frosted silver", "Midnight", "Slate"],
    straps: ["Alligator leather", "Calf leather", "Fabric NATO"],
    description:
      "The calendar works from a deep month cam and grand lever. All calendar indications jump cleanly at midnight.",
    specs: {
      "Case diameter": "41 mm",
      "Case thickness": "11.8 mm",
      "Case material": "18k white gold",
      "Dial color": "Frosted silver",
      "Movement caliber": "HV-404",
      "Power reserve": "60 hours",
      Frequency: "28,800 vph",
      Jewels: "37",
      "Water resistance": "30 m",
      Strap: "Hand-stitched alligator"
    }
  },
  {
    slug: "hesper-lunar",
    name: "Hesper Lunar",
    reference: "H05-RG",
    caseMaterial: "Rose Gold",
    movementType: "manual wind",
    complication: "moon phase",
    priceChf: 54000,
    releaseOrder: 2,
    dialColors: ["Aventurine", "Opaline", "Smoked grey"],
    straps: ["Alligator leather", "Calf leather", "Fabric NATO"],
    description:
      "The lunar display is driven by a 59-tooth wheel and a thin jumper spring. It is adjusted through the crown, not a case pusher.",
    specs: {
      "Case diameter": "39 mm",
      "Case thickness": "10.1 mm",
      "Case material": "18k rose gold",
      "Dial color": "Aventurine",
      "Movement caliber": "HV-505",
      "Power reserve": "72 hours",
      Frequency: "21,600 vph",
      Jewels: "25",
      "Water resistance": "30 m",
      Strap: "Matte alligator"
    }
  },
  {
    slug: "vance-tourbillon",
    name: "Vance Tourbillon",
    reference: "V06-PT",
    caseMaterial: "Platinum",
    movementType: "manual wind",
    complication: "tourbillon",
    priceChf: 145000,
    releaseOrder: 1,
    dialColors: ["Black grand feu", "Silver", "Ruthenium"],
    straps: ["Alligator leather", "Calf leather", "Fabric NATO"],
    description:
      "The carriage turns once a minute under a black-polished bridge. The rest of the dial is left still.",
    specs: {
      "Case diameter": "40 mm",
      "Case thickness": "10.6 mm",
      "Case material": "950 platinum",
      "Dial color": "Black grand feu",
      "Movement caliber": "HV-606",
      "Power reserve": "80 hours",
      Frequency: "18,000 vph",
      Jewels: "29",
      "Water resistance": "30 m",
      Strap: "Hand-stitched alligator"
    }
  }
];

export type EditionStatus = "Reservations Open" | "Waitlist Only" | "Sold Out" | "Coming Soon";

export type Edition = {
  slug: string;
  name: string;
  limit: number;
  status: EditionStatus;
  reservationOpen: string;
  modelSlug: string;
  description: string;
};

export const editions: Edition[] = [
  {
    slug: "atelier-nocturne-12",
    name: "Atelier Nocturne 12",
    limit: 12,
    status: "Coming Soon",
    reservationOpen: "2026-06-18T09:00:00+02:00",
    modelSlug: "vance-perpetual",
    description:
      "A white-gold perpetual calendar with a dark rhodium calendar works and a hand-frosted dial. The month cam is visible through a narrow aperture at the back."
  },
  {
    slug: "barrel-bridge-series",
    name: "Barrel Bridge Series",
    limit: 18,
    status: "Reservations Open",
    reservationOpen: "2026-04-10T09:00:00+02:00",
    modelSlug: "hesper-calibre-01",
    description:
      "The bridge is cut from untreated German silver and left to warm slowly with age. Each watch carries the finishing initials under the barrel."
  },
  {
    slug: "lunar-ruby-study",
    name: "Lunar Ruby Study",
    limit: 8,
    status: "Waitlist Only",
    reservationOpen: "2026-02-01T09:00:00+01:00",
    modelSlug: "hesper-lunar",
    description:
      "A moon phase study using a ruby-toned moon disc, restrained to the same jewel color used in the pivots. The aperture edge is mirror polished."
  },
  {
    slug: "vance-zero-reset",
    name: "Vance Zero Reset",
    limit: 6,
    status: "Sold Out",
    reservationOpen: "2025-11-20T09:00:00+01:00",
    modelSlug: "vance-chronograph",
    description:
      "A column-wheel chronograph with a black-polished reset hammer and brushed steel bridges. The edition is closed and held for documented owners."
  }
];

export const galleryAngles = [
  "Front dial",
  "Caseback",
  "Left profile",
  "Right profile",
  "Crown detail",
  "Lug detail"
];

export const ownerBenefits = [
  "Lifetime servicing access",
  "Priority on limited editions",
  "Invitation to annual collector dinner"
];

export function getModel(slug: string) {
  return models.find((model) => model.slug === slug);
}

export function getEdition(slug: string) {
  return editions.find((edition) => edition.slug === slug);
}
