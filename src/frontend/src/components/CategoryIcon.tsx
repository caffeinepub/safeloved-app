import { useState } from "react";

const iconMap: Record<string, string> = {
  insan: "/assets/generated/insan-icon-transparent.dim_64x64.png",
  hayvan: "/assets/generated/hayvan-icon-transparent.dim_64x64.png",
  esya: "/assets/generated/esya-icon-transparent.dim_64x64.png",
  arac: "/assets/generated/arac-icon-transparent.dim_64x64.png",
};

const emojiMap: Record<string, string> = {
  insan: "👤",
  hayvan: "🐾",
  esya: "📦",
  arac: "🚗",
};

interface CategoryIconProps {
  category: string;
  className?: string;
}

export default function CategoryIcon({
  category,
  className = "",
}: CategoryIconProps) {
  const [error, setError] = useState(false);

  if (error || !iconMap[category]) {
    return (
      <span
        className={`flex items-center justify-center text-2xl ${className}`}
      >
        {emojiMap[category] || "📋"}
      </span>
    );
  }

  return (
    <img
      src={iconMap[category]}
      alt={category}
      className={className}
      onError={() => setError(true)}
    />
  );
}
