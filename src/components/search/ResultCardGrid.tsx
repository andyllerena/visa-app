import { useState, useEffect } from "react";
import { ScoredResult } from "@/lib/scorer";

interface ResultCardGridProps {
  result: ScoredResult;
  onClick: () => void;
}

export const ResultCardGrid = ({ result, onClick }: ResultCardGridProps) => {
  const { item, matchedTerms } = result;
  const [isFav, setIsFav] = useState(false);

  const STORAGE_KEY = "favoriteComponents";

  const readFavs = (): string[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const toggleFavorite = () => {
    const current = readFavs();
    let updated: string[];
    if (isFav) {
      updated = current.filter((id) => id !== item.id);
    } else {
      updated = [...current, item.id];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsFav(!isFav);
  };

  useEffect(() => {
    setIsFav(readFavs().includes(item.id));
  }, [item.id]);

  return (
    <button
      onClick={onClick}
      className="group relative bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#1434CB] hover:shadow-lg transition-all duration-200 text-left h-full flex flex-col"
    >
      {/* Heart icon */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        className="absolute top-4 right-4 cursor-pointer"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? (
          /* solid heart */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#E53E3E]"
          >
            <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C13.09 5.01 14.76 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.65 11.54l-1.25 1.31z" />
          </svg>
        ) : (
          /* outline heart */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 hover:text-[#E53E3E]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.24 4 9.91 5.01 10.63 6.44h.74C13.09 5.01 14.76 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.65 11.54L12 21.35z"
            />
          </svg>
        )}
      </span>

      {/* Tag */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
          Component
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#1434CB]">
        {item.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 flex-grow">{item.description}</p>

      {/* Matched Terms */}
      <div className="mt-auto flex flex-wrap gap-1">
        {matchedTerms.slice(0, 3).map((term) => (
          <span
            key={term}
            className="text-xs px-2 py-1 bg-blue-50 text-[#1434CB] rounded"
          >
            {term}
          </span>
        ))}
      </div>
    </button>
  );
};
