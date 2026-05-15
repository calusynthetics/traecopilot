export interface Product {
  id: string;
  name: string;
  casNumber: string;
  description: string;
  category: string;
  price?: number;
  minOrder?: string;
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "CONTACT";
  specifications: {
    density: string;
    molarMass: string;
    flashPoint: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Caluanie Muelear Oxidize - 1L",
    casNumber: "7439-97-6",
    description: "High-grade oxidizing agent for industrial coating removal and heavy-duty degreasing.",
    category: "Oxidizing Agents",
    price: 1150,
    minOrder: "1 L",
    stockStatus: "IN_STOCK",
    specifications: {
      density: "1.902g/cm3",
      molarMass: "171.12 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "2",
    name: "Caluanie Muelear Oxidize - 5L",
    casNumber: "7439-97-6",
    description: "Industrial strength solvent for breakdown of resins, adhesives, and paints.",
    category: "Oxidizing Agents",
    price: 5030,
    minOrder: "1 L",
    stockStatus: "IN_STOCK",
    specifications: {
      density: "1.902g/cm3",
      molarMass: "171.12 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "3",
    name: "Caluanie Muelear Oxidize - 20L",
    casNumber: "7439-97-6",
    description: "Bulk supply for aerospace and automotive manufacturing applications.",
    category: "Oxidizing Agents",
    price: 25000,
    minOrder: "1 L",
    stockStatus: "LOW_STOCK",
    specifications: {
      density: "1.902g/cm3",
      molarMass: "171.12 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "4",
    name: "Industrial Degreaser X-100",
    casNumber: "N/A",
    description: "Premium cleaning agent for heavy machinery and industrial surfaces.",
    category: "Solvents",
    price: 850,
    stockStatus: "IN_STOCK",
    specifications: {
      density: "0.85g/cm3",
      molarMass: "N/A",
      flashPoint: "45°C",
    },
  },
  {
    id: "5",
    name: "Caluanie Muelear Oxidize - 50L",
    casNumber: "7439-97-6",
    description: "Large scale industrial oxidizing agent for mass production facilities.",
    category: "Oxidizing Agents",
    price: 50000,
    minOrder: "1 L",
    stockStatus: "CONTACT",
    specifications: {
      density: "1.902g/cm3",
      molarMass: "171.12 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "6",
    name: "Buy Caluanie Muelear",
    casNumber: "N/A",
    description: "Direct-access supply of Caluanie Muelear for research and formulation needs.",
    category: "Buy Caluanie Muelear",
    price: 1299,
    minOrder: "500 mL",
    stockStatus: "IN_STOCK",
    specifications: {
      density: "1.90g/cm3",
      molarMass: "172.00 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "7",
    name: "Oxidize Asia",
    casNumber: "N/A",
    description: "Regional-grade oxidizer blend tailored for high-performance coatings and industrial cleaning.",
    category: "Oxidize Asia",
    price: 2150,
    minOrder: "1 L",
    stockStatus: "IN_STOCK",
    specifications: {
      density: "1.88g/cm3",
      molarMass: "170.50 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "8",
    name: "Californium 252",
    casNumber: "10028-18-9",
    description: "Specialized neutron emitter material for advanced industrial and scientific applications.",
    category: "Californium 252",
    price: 750000,
    stockStatus: "CONTACT",
    specifications: {
      density: "15.1g/cm3",
      molarMass: "252.08 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "9",
    name: "Caluanie Muelear",
    casNumber: "7439-97-6",
    description: "Core Caluanie Muelear compound for precision industrial oxidation processes.",
    category: "Caluanie Muelear",
    price: 1099,
    minOrder: "250 mL",
    stockStatus: "LOW_STOCK",
    specifications: {
      density: "1.90g/cm3",
      molarMass: "172.00 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "10",
    name: "Oxidize",
    casNumber: "N/A",
    description: "Concentrated oxidizing formulation designed for rapid material processing and cleaning.",
    category: "Oxidize",
    price: 940,
    minOrder: "500 mL",
    stockStatus: "IN_STOCK",
    specifications: {
      density: "1.85g/cm3",
      molarMass: "169.80 g/mol",
      flashPoint: "Non-flammable",
    },
  },
  {
    id: "11",
    name: "Gamma-Butyrolactone (GBL)",
    casNumber: "96-48-0",
    description: "High-purity Gamma-Butyrolactone for solvent, reagent, and formulation use.",
    category: "Gamma-Butyrolactone (GBL)",
    price: 680,
    minOrder: "250 mL",
    stockStatus: "IN_STOCK",
    specifications: {
      density: "1.12g/cm3",
      molarMass: "86.09 g/mol",
      flashPoint: "67°C",
    },
  },
  {
    id: "12",
    name: "Red Mercury",
    casNumber: "Unknown",
    description: "Rare specialty material for controlled industrial and research applications.",
    category: "Red Mercury",
    price: 42000,
    stockStatus: "CONTACT",
    specifications: {
      density: "2.50g/cm3",
      molarMass: "N/A",
      flashPoint: "Non-flammable",
    },
  },
];
