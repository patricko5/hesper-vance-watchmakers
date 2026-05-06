export type BarMenuItem = {
  name: string;
  price?: string | number;
  description?: string;
  options?: { label: string; price: string | number }[];
};

export type BarMenuCategory = {
  id: string;
  title: string;
  items: BarMenuItem[];
};

export const barMenuCategories: BarMenuCategory[] = [
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      { name: "MIMOSA", price: 12, description: "Sparkling wine and your choice of juice: Orange, Grapefruit or Pineapple." },
      { name: "MARGARITAS 1.5 oz", price: 14, description: "Jose Cuervo Tradicional, Orange liquor, lime, simple syrup. Double: +$5. Flavour: +$1 (Mango, Tamarind, Strawberry, Coconut, Jalapeño)." },
      { name: "FROZEN MEZCALITAS 1.5 oz", price: 14, description: "400 Conejos Mezcal, triple sec, lime, mango, simple syrup, tajin rim." },
      { name: "MEZCALITA", price: 14, description: "400 Conejos Mezcal, triple sec, simple syrup, lime, tajin rim." },
      { name: "MOJITO 1.5 oz", price: 13, description: "Bacardi white Rum, fresh mint, lime, simple syrup, soda." },
      { name: "BELLINI 2 oz", price: 12, description: "White rum, peach schnapps, sparkling wine and peach." },
      { name: "LOUNGE MICHELADAS", price: 17, description: "Your choice of Mexican beer bottle, Clamato, Petroleo, Lime, Tajin, Chips, peanuts, fresh cucumber and spicy sauce on top." },
      { name: "MICHELADA", price: 14, description: "Your choice of Mexican beer bottle, Clamato, Petroleo, Lime, Tamarind straw and Tajin Rim." },
      { name: "PALOMA 1.5 oz", price: 13, description: "Jose Cuervo Tradicional, lime, Grapefruit juice, squirt. Salt rim." },
      { name: "CANTARITO 1.5 oz", price: 14, description: "Jose Cuervo Tradicional, lime, orange Juice, grapefruit juice, orange wedges, salt and tajin rim." },
      { name: "VAMPIRITO", price: 15, description: "Jose Cuervo Tradicional, lime, orange Juice, grapefruit juice, sangrita, orange wedges, salt and tajin rim." },
      { name: "MARGARITA FLIGHT", price: 22, description: "Four different flavours of frozen margarita (Strawberry, Tamarind, Mango and Lime)." },
      { name: "FISHBOWL", price: 28, description: "Bellini or Frozen Margarita with your choice of flavour." },
      { name: "TEQUILA BULLDOG 1.5 oz", price: 16, description: "Lime frozen margarita, coronita, salt rim." },
      { name: "SANGRIA", price: 15, description: "Red wine, bellini, Brandy, fresh red fruits." },
      { name: "FROZEN RUMCHATA", price: 15, description: "2 oz white rum Bacardi Horchata." }
    ]
  },
  {
    id: "draft-beers",
    title: "Beers (Draft)",
    items: [
      { name: "Tequila Cocina Lager", options: [{ label: "PINT", price: 7 }, { label: "PITCHER", price: 21 }] },
      { name: "33 Acres Nirvana IPA", options: [{ label: "PINT", price: 8 }, { label: "PITCHER", price: 24 }] },
      { name: "33 Acres Fluffy Cloud Hazy IPA", options: [{ label: "PINT", price: 8 }, { label: "PITCHER", price: 24 }] },
      { name: "East Van Hazy Pale Ale", options: [{ label: "PINT", price: 8 }, { label: "PITCHER", price: 24 }] },
      { name: "Stella", options: [{ label: "PINT", price: 8 }, { label: "PITCHER", price: 24 }] },
      { name: "Corona", options: [{ label: "PINT", price: 10 }, { label: "PITCHER", price: 30 }] },
      { name: "Guinness", options: [{ label: "PINT", price: 10 }] }
    ]
  },
  {
    id: "bottles",
    title: "Bottles",
    items: [
      { name: "Corona 330 ML", price: 8 },
      { name: "Dos Equis Lager 335 ML", price: 8 },
      { name: "Pacifico 355 ML", price: 8 },
      { name: "Modelo Especial 355 ML", price: 8 },
      { name: "Negra Modelo 355 ML", price: 8 },
      { name: "Sol 330 ML", price: 8 }
    ]
  },
  {
    id: "coolers-buckets",
    title: "Coolers & Buckets",
    items: [
      { name: "Smirnoff Ice", price: 9 },
      { name: "Whiteclaw", price: 8 },
      { name: "Beer Bucket", price: 36, description: "5 bottles" },
      { name: "Mega Bucket", price: 70, description: "10 bottles" }
    ]
  },
  {
    id: "digestives",
    title: "Digestive Drinks",
    items: [
      { name: "Carajillo 2oz", price: 13 },
      { name: "Carajillo Mazapan", price: 15 },
      { name: "Carajillo Moch", price: 15 },
      { name: "Vanilla Win", price: 9 }
    ]
  },
  {
    id: "shots-chupitos",
    title: "Shots & Chupitos",
    items: [
      { name: "Jager Bomb", price: 9, description: "Jagermeister and Red Bull" },
      { name: "Bufanda", price: 9, description: "Hpnotiq, Red Bull" },
      { name: "Baby Mango", price: 8 },
      { name: "Choco Krispy", price: 8 },
      { name: "Pitufo", price: 8 },
      { name: "Blow Job", price: 10 },
      { name: "Gummy Bear", price: 7 }
    ]
  }
];
