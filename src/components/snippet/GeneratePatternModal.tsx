"use client";
import { useEffect, useState } from "react";
import { patternTemplates, PatternTemplate } from "@/data/patternTemplate";

interface GeneratePatternModalProps {
  searchQuery: string;
  onClose: () => void;
}

export const GeneratePatternModal = ({
  searchQuery,
  onClose,
}: GeneratePatternModalProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const normalizedQuery = searchQuery.toLowerCase().trim();

  let pattern = patternTemplates[normalizedQuery];

  const defaultPattern: PatternTemplate = {
    title: "Unknown Pattern",
    description:
      "We have no idea what you asked for, but here's something to keep the lights on.",
    components: ["🤔", "🧠", "💥"],
    code: `export const CustomComponent = () => (
            <div>¯\\_(ツ)_/¯</div>
      );`,
  };

  const selectedPattern = pattern || defaultPattern;

  const fullText = `
Generating component pattern for: "${searchQuery}"

✅ Analyzing requirements...
✅ Selecting optimal components: ${selectedPattern.components.join(", ")}
✅ Applying VPDS styling...

Pattern: ${selectedPattern.title}
Description: ${selectedPattern.description}

${selectedPattern.code}
`;

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 11);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [index, fullText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedPattern.code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="p-6 text-sm max-h-[80vh] overflow-y-auto">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-2 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1434CB] text-white rounded hover:bg-[#021E4C] transition-colors"
          >
            Close
          </button>
        </div>

        <button
          onClick={handleCopy}
          disabled={!isComplete}
          className={`px-4 py-2 rounded transition-colors ${
            isComplete
              ? "border border-gray-300 hover:bg-gray-50"
              : "border border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>

      {/* Generated content */}
      <div className="font-mono whitespace-pre-wrap">
        {displayedText}
        {!isComplete && (
          <span className="animate-pulse bg-[#1434CB] text-[#1434CB] ml-1">
            |
          </span>
        )}
      </div>

      {/* Pattern info*/}
      {isComplete && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-2">Pattern Details</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Components used:</strong>{" "}
              {selectedPattern.components.join(", ")}
            </p>
            <p>
              <strong>Accessibility:</strong> WCAG 2.1 AA compliant
            </p>
            <p>
              <strong>Framework:</strong> React + TypeScript
            </p>
            <p>
              <strong>Styling:</strong> Visa Nova Design System
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
