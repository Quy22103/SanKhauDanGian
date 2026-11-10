import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ArchivalImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export default function ArchivalImage({
  src,
  alt,
  className = "",
  aspectClass = "aspect-[4/3]",
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F2EDE4] border border-stone-200 text-stone-500 p-4 text-center ${aspectClass} ${className}`}
      >
        <ImageOff className="w-6 h-6 mb-2 text-stone-400" strokeWidth={1.5} />
        <span className="text-xs font-medium text-stone-600 line-clamp-2">{alt}</span>
        <span className="text-[11px] text-stone-400 mt-1">Chưa có tư liệu hình ảnh</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#F2EDE4] ${aspectClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
