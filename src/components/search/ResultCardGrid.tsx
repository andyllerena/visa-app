import { ScoredResult } from "@/lib/scorer";

interface ResultCardGridProps {
  result: ScoredResult;
  onClick: () => void;
}

export const ResultCardGrid = ({ result, onClick }: ResultCardGridProps) => {
  const { item, score, matchedTerms } = result;
  const maxScore = 20;
  const relevancePercent = Math.min(Math.round((score / maxScore) * 100), 100);

  return (
    <button
      onClick={onClick}
      className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#1434CB] hover:shadow-lg transition-all duration-200 text-left h-full flex flex-col"
    >
      {/* Relevance Badge */}
      <div className="text-xs font-semibold text-gray-500 text-right mb-2">
        {relevancePercent}% match
      </div>

      {/* Type Badge - Always 'Component' now */}
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
      <p className="text-sm text-gray-600 mb-4 flex-grow">
        {item.description ||
          `Nova component for ${item.tags.slice(0, 3).join(", ")}`}
      </p>

      {/* Matched Terms */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1">
          {matchedTerms.slice(0, 3).map((term, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-blue-50 text-[#1434CB] rounded"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};
