// Import all motorcycle images
import heroBike from "@/assets/hero-bike.png";
import showroom from "@/assets/showroom.png";
import bikeCbr from "@/assets/bike-cbr.png";
import bikeYamaha from "@/assets/bike-yamaha.png";
import bikeKawasaki from "@/assets/bike-kawasaki.png";

// Image mapping
export const motorcycleImages = {
  "src/assets/hero-bike.png": heroBike,
  "src/assets/showroom.png": showroom,
  "src/assets/bike-cbr.png": bikeCbr,
  "src/assets/bike-yamaha.png": bikeYamaha,
  "src/assets/bike-kawasaki.png": bikeKawasaki,
};

interface MotorcycleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function MotorcycleImage({ src, alt, className }: MotorcycleImageProps) {
  const imageSrc = motorcycleImages[src as keyof typeof motorcycleImages] || src;
  
  return (
    <img 
      src={imageSrc} 
      alt={alt}
      className={className}
      onError={(e) => {
        // Fallback to a placeholder if image fails to load
        const target = e.target as HTMLImageElement;
        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EImagem não encontrada%3C/text%3E%3C/svg%3E";
      }}
    />
  );
}