export type MenuItem = {
  name: string;
  descriptor: string;
  price: string;
  image: string;
  tags?: string[];
  addOn?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle?: string;
  note?: string;
  items: MenuItem[];
};

export const foodCategories: MenuCategory[] = [
  {
    id: "brunch",
    name: "Brunch",
    subtitle: "Weekends 12 pm – 3 pm",
    items: [
      {
        name: "Huevos Rancheros",
        descriptor:
          "Two fried eggs served with homemade Mexican sauce, accompanied by refried beans and feta cheese, avocado slices and three corn tortillas.",
        price: "$17",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
        addOn: "+$5 Add Meat"
      },
      {
        name: "Chilaquiles",
        descriptor:
          "Deep fried corn tortilla chips smothered in your choice of green, red or Swiss sauce, topped with crema fresca, feta cheese and onions. Accompanied by refried beans and one fried egg.",
        price: "$20",
        image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be3?auto=format&fit=crop&w=900&q=80",
        addOn: "+$5 Add Meat"
      },
      {
        name: "Enchiladas Aztecas",
        descriptor:
          "Tortilla casserole stuffed with chicken, mozzarella cheese, sour cream and your choice of green, red or Swiss sauce. Accompanied by rice and beans.",
        price: "$22",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    id: "antojitos",
    name: "Antojitos",
    items: [
      {
        name: "Guac & Chips",
        descriptor:
          "Fresh smashed avocado seasoned with lime and house spices, topped with pico de gallo and feta cheese. Served with a side of corn tortilla chips.",
        price: "$17",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"]
      },
      {
        name: "Guac & Chicharrón",
        descriptor:
          "House made guacamole accompanied by four pieces of pressed pork belly, topped with red onions and corn tortillas on the side.",
        price: "$28",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Tequila Nachos",
        descriptor:
          "Homemade corn tortilla chips, black beans, mozzarella cheese, chorizo sauce. Topped with pico de gallo and fresh guacamole.",
        price: "$25",
        image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=900&q=80",
        addOn: "+$5 Add Meat"
      },
      {
        name: "Boneless",
        descriptor:
          "Boneless chicken with your choice of Buffalo, BBQ or Lemon Pepper. Served with ranch dip, baby carrots and celery.",
        price: "$17",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Wings",
        descriptor:
          "Chicken wings with your choice of Buffalo, BBQ or Lemon Pepper. Served with ranch dip, baby carrots and celery.",
        price: "$17",
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Queso Fundido",
        descriptor: "Melted cheese bubbling hot in a cast iron skillet. Served with a side of 5 flour tortillas.",
        price: "$18",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"],
        addOn: "+$5.50 Add Meat"
      }
    ]
  },
  {
    id: "carne",
    name: "Carne",
    items: [
      {
        name: "Carne Asada",
        descriptor: "8 oz top sirloin steak, green salad, rice, beans and quesadilla with chorizo.",
        price: "$32",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Molcajete",
        descriptor:
          "Grilled steak, chicken, chorizo, shrimp, asadero cheese, and fire roasted salsa on a traditional molcajete hot stone. Served with rice, refried beans, guacamole and corn tortillas.",
        price: "$69",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Alambre",
        descriptor:
          "Your choice of chicken breast, top sirloin or pastor, mixed with onions, peppers and melted cheese. Served with rice, beans and corn tortillas.",
        price: "$27",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
        tags: ["Choose protein"]
      },
      {
        name: "Gringas Pastor",
        descriptor: "Three pastor quesadillas on a handmade flour tortilla with cilantro, onion and serrano sauce.",
        price: "$25",
        image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Kekabirrias",
        descriptor: "Three corn quesadillas with beef, accompanied by consome, cilantro and onion.",
        price: "$25",
        image: "https://images.unsplash.com/photo-1570461226513-e08b58a52c53?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    id: "mariscos",
    name: "Mariscos",
    items: [
      {
        name: "Aguachile Camarón",
        descriptor: "Cured and marinated shrimp with red onion and cucumber. Choice of green, red or black sauce.",
        price: "$28",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
        tags: ["Choose sauce"]
      },
      {
        name: "Aguachile Mixto",
        descriptor: "Boiled and marinated shrimp, octopus and tuna.",
        price: "$38",
        image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Ceviche Atún",
        descriptor:
          "Fresh cured tuna with citrus, red onion, cucumber and avocado.",
        price: "$25",
        image: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Tostada de Pulpo",
        descriptor: "Homemade crispy corn tortilla with marinated and grilled octopus, avocado, onion and house black sauce.",
        price: "$15",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    id: "tacos",
    name: "Tacos",
    note: "Order of four $22 · Each $6",
    items: [
      {
        name: "Carne Asada",
        descriptor: "Topped with onion and cilantro.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Pastor",
        descriptor: "Marinated pork with pineapple.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Carnitas",
        descriptor: "Confit pork.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Tinga de Pollo",
        descriptor: "Pulled chicken in tomato and chipotle sauce.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Birria",
        descriptor: "Slow-cooked beef stew.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1570461226513-e08b58a52c53?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Chorizo",
        descriptor: "Mexican pork sausage.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Camarón Baja",
        descriptor: "Beer-battered shrimp, cabbage and chipotle-garlic mayo.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Especial de Pulpo",
        descriptor: 'Corn tortilla 6", avocado, grilled octopus and spicy sauce.',
        price: "$15",
        image: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?auto=format&fit=crop&w=900&q=80",
        tags: ["Chef's pick"]
      },
      {
        name: "Frijoles",
        descriptor: "Refried beans.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"]
      },
      {
        name: "Veggie Pastor",
        descriptor: "Plant based protein.",
        price: "$6",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegan"]
      }
    ]
  },
  {
    id: "kids",
    name: "Menu Kids",
    items: [
      {
        name: "Kids Quesadilla",
        descriptor: '6" flour tortilla stuffed with melted mozzarella cheese. Served with a small side of rice and beans.',
        price: "$12",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"]
      }
    ]
  },
  {
    id: "sopas",
    name: "Sopas",
    items: [
      {
        name: "Tortilla Soup",
        descriptor: "Tomato soup with chicken broth, feta, sour cream, avocado and tortilla strips.",
        price: "$15",
        image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Birria Soup",
        descriptor: "Traditional beef stew with Mexican spices.",
        price: "$25",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    id: "postres",
    name: "Postres",
    items: [
      {
        name: "Churros with Vanilla Ice Cream",
        descriptor: "Crispy churros served with smooth vanilla ice cream.",
        price: "$13",
        image: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"]
      },
      {
        name: "Tres Leches Cake",
        descriptor: "A moist sponge soaked in three types of milk, topped with a light cream finish.",
        price: "$13",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"]
      },
      {
        name: "Flan",
        descriptor: "Classic creamy custard dessert with a smooth caramel topping.",
        price: "$13",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
        tags: ["Vegetarian"]
      }
    ]
  }
];

export const sides = [
  "Rice $5",
  "Beans $5",
  "Guacamole $3",
  "Pico de Gallo $3",
  "Tortilla Chips $3",
  "Side Fries $7",
  "Side Salad $7",
  "Corn Tortilla 5pc $3",
  "Flour Tortilla 1pc $1"
];

export const cocktails: MenuItem[] = [
  {
    name: "Cordova Margarita",
    descriptor: "Blanco tequila, lime, agave, sea salt.",
    price: "$16",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Mezcal Paloma",
    descriptor: "Mezcal, grapefruit, lime, soda.",
    price: "$17",
    image: "https://images.unsplash.com/photo-1563223771-375783ee91ad?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Oaxacan Old Fashioned",
    descriptor: "Reposado, mezcal, bitters, orange.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80"
  }
];

export const tequilaSelection = [
  ["Fortaleza Blanco", "$18"],
  ["Casamigos Reposado", "$16"],
  ["Don Julio Anejo", "$19"],
  ["Clase Azul Plata", "$30"],
  ["El Tesoro Extra Anejo", "$28"],
  ["Del Maguey Vida Mezcal", "$15"]
];

export const drinks = {
  beer: ["Pacifico $8", "Modelo Especial $8", "Four Winds IPA $9", "Strange Fellows Lager $9"],
  wine: ["Cava Brut $14", "Sauvignon Blanc $13", "Rioja Crianza $15", "Malbec $14"],
  zero: ["Hibiscus Agua Fresca $7", "Lime Jarritos $6", "Topo Chico $6", "Virgin Paloma $9"]
};

export const events = [
  {
    date: "May 18",
    title: "Salsa Night",
    description: "A warm evening of Latin rhythms, cocktails, and late dinner service.",
    time: "8:00 PM - late"
  },
  {
    date: "Jun 01",
    title: "Tequila Tasting",
    description: "A guided flight through blanco, reposado, anejo, and mezcal expressions.",
    time: "6:30 PM"
  },
  {
    date: "Jun 15",
    title: "Weekend Brunch Fiesta",
    description: "Live DJ brunch with chilaquiles, margaritas, and patio energy.",
    time: "12:00 PM - 3:00 PM"
  }
];
