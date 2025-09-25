export interface Motorcycle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  stock: number;
  image: string;
  status: "Disponível" | "Vendido" | "Reservado";
  category: "Sport" | "Naked" | "Cruiser" | "Adventure" | "Scooter";
  engine: string;
  power: string;
  weight: string;
  fuel: string;
  description: string;
  features: string[];
  salesCount: number;
}

export const motorcyclesData: Motorcycle[] = [
  {
    id: "1",
    name: "Honda CBR 600RR",
    brand: "Honda",
    model: "CBR 600RR",
    year: 2024,
    price: 45000,
    stock: 8,
    image: "src/assets/bike-cbr.png",
    status: "Disponível",
    category: "Sport",
    engine: "599cc",
    power: "118 CV",
    weight: "194 kg",
    fuel: "Gasolina",
    description: "A Honda CBR 600RR é uma motocicleta esportiva de alta performance, ideal para quem busca velocidade e adrenalina.",
    features: ["ABS", "Controle de Tração", "Quickshifter", "Freios Brembo"],
    salesCount: 24
  },
  {
    id: "2",
    name: "Yamaha MT-07",
    brand: "Yamaha",
    model: "MT-07",
    year: 2024,
    price: 38000,
    stock: 12,
    image: "src/assets/bike-yamaha.png",
    status: "Disponível",
    category: "Naked",
    engine: "689cc",
    power: "75 CV",
    weight: "182 kg",
    fuel: "Gasolina",
    description: "A Yamaha MT-07 combina performance e versatilidade, perfeita para uso urbano e viagens.",
    features: ["ABS", "Display Digital", "LED", "Suspensão Ajustável"],
    salesCount: 18
  },
  {
    id: "3",
    name: "Kawasaki Ninja 650",
    brand: "Kawasaki",
    model: "Ninja 650",
    year: 2024,
    price: 42000,
    stock: 6,
    image: "src/assets/bike-kawasaki.png",
    status: "Disponível",
    category: "Sport",
    engine: "649cc",
    power: "68 CV",
    weight: "193 kg",
    fuel: "Gasolina",
    description: "A Kawasaki Ninja 650 oferece o equilíbrio perfeito entre performance esportiva e conforto para o dia a dia.",
    features: ["ABS", "Controle de Tração", "Farol LED", "Painel Digital"],
    salesCount: 15
  },
  {
    id: "4",
    name: "BMW S1000RR",
    brand: "BMW",
    model: "S1000RR",
    year: 2024,
    price: 85000,
    stock: 3,
    image: "src/assets/hero-bike.png",
    status: "Reservado",
    category: "Sport",
    engine: "999cc",
    power: "210 CV",
    weight: "197 kg",
    fuel: "Gasolina",
    description: "A BMW S1000RR é uma superbike de última geração com tecnologia de ponta.",
    features: ["Quickshifter", "Controle de Largada", "Modos de Pilotagem", "Suspensão Eletrônica"],
    salesCount: 12
  },
  {
    id: "5",
    name: "Ducati Monster 797",
    brand: "Ducati",
    model: "Monster 797",
    year: 2023,
    price: 55000,
    stock: 4,
    image: "src/assets/showroom.png",
    status: "Disponível",
    category: "Naked",
    engine: "803cc",
    power: "75 CV",
    weight: "175 kg",
    fuel: "Gasolina",
    description: "A Ducati Monster 797 representa a essência naked da marca italiana.",
    features: ["ABS", "Controle de Tração", "Display TFT", "Modos de Pilotagem"],
    salesCount: 8
  },
  {
    id: "6",
    name: "Honda CB 650R",
    brand: "Honda",
    model: "CB 650R",
    year: 2024,
    price: 48000,
    stock: 7,
    image: "src/assets/bike-cbr.png",
    status: "Disponível",
    category: "Naked",
    engine: "649cc",
    power: "95 CV",
    weight: "200 kg",
    fuel: "Gasolina",
    description: "A Honda CB 650R é uma naked moderna com design agressivo e performance equilibrada.",
    features: ["ABS", "Display LCD", "LED", "HSTC"],
    salesCount: 20
  }
];

export const getBestSelling = () => {
  return motorcyclesData
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 5);
};

export const getWorstSelling = () => {
  return motorcyclesData
    .sort((a, b) => a.salesCount - b.salesCount)
    .slice(0, 5);
};

export const getTotalInventoryValue = () => {
  return motorcyclesData.reduce((total, bike) => total + (bike.price * bike.stock), 0);
};

export const getTotalStock = () => {
  return motorcyclesData.reduce((total, bike) => total + bike.stock, 0);
};

export const getAvailableStock = () => {
  return motorcyclesData
    .filter(bike => bike.status === "Disponível")
    .reduce((total, bike) => total + bike.stock, 0);
};