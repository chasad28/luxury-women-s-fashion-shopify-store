import { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const activeImage = images[activeIndex] || '/assets/generated/product-tote-black.dim_800x800.jpg';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="relative overflow-hidden bg-beige aspect-square cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onClick={() => setZoomed(false)}
      >
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300"
          style={
            zoomed
              ? {
                  transform: 'scale(2)',
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : {}
          }
        />
        {!zoomed && (
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-ivory/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={14} className="text-noir" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-16 h-16 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                i === activeIndex ? 'ring-1 ring-gold' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${productName} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
