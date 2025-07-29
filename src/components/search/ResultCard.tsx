import { ScoredResult } from "@/lib/scorer";
import { Pattern } from "@/types";

interface ResultCardProps {
  result: ScoredResult;
  onClick: () => void;
  isActive?: boolean;
}

export const ResultCard = ({ result, onClick, isActive }: ResultCardProps) => {
  const { item, matchedTerms, type } = result;

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-lg border transition-all
        ${
          isActive
            ? "border-[#1434CB] bg-blue-50 shadow-md"
            : "border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title with type badge */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <span
              className={`
              text-xs px-2 py-0.5 rounded-full
              ${
                type === "pattern"
                  ? "bg-[#FCC015] text-gray-900"
                  : "bg-gray-200 text-gray-700"
              }
            `}
            >
              {type}
            </span>
          </div>

          {/* Description based on type */}
          <p className="text-sm text-gray-600 mb-2">
            {type === "pattern"
              ? `Includes: ${(item as Pattern).components.join(", ")}`
              : `Component for ${item.tags.slice(0, 3).join(", ")}`}
          </p>

          {/* Why it matched */}
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500">Matched:</span>
            {matchedTerms.map((term, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
              >
                {term}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow icon */}
        <svg
          className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  );
};
