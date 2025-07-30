// src/components/search/PromptBox.tsx
"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

interface PromptBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SUGGESTED_SEARCHES = [
  "responsive login form with remember me",
  "data table with sorting and pagination",
  "search bar with filters",
  "card grid layout",
  "form with validation",
  "navigation with dropdown",
  "modal with confirmation",
];

export const PromptBox = ({ onSearch, isLoading = false }: PromptBoxProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 3));
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const newRecents = [
        query.trim(),
        ...recentSearches.filter((r) => r !== query.trim()),
      ].slice(0, 5);
      setRecentSearches(newRecents);
      localStorage.setItem("recentSearches", JSON.stringify(newRecents));

      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);

    // Trigger search
    const newRecents = [
      suggestion,
      ...recentSearches.filter((r) => r !== suggestion),
    ].slice(0, 5);
    setRecentSearches(newRecents);
    localStorage.setItem("recentSearches", JSON.stringify(newRecents));

    onSearch(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const filteredSuggestions = SUGGESTED_SEARCHES.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
    const allSuggestions = [...recentSearches, ...filteredSuggestions];

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, allSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(allSuggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
    setSelectedIndex(-1);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SUGGESTED_SEARCHES.filter(
    (s) => query.length > 0 && s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="w-full relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Try: responsive login form with remember me"
            disabled={isLoading}
            className="w-full pl-10 pr-24 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1434CB] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />

          {/* Right Side Actions */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setShowSuggestions(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="px-4 py-1.5 bg-[#1434CB] text-white text-sm font-medium rounded-md hover:bg-[#021E4C] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions &&
        (recentSearches.length > 0 || filteredSuggestions.length > 0) && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length === 0 && (
              <div className="p-2">
                <p className="text-xs font-semibold text-gray-500 px-3 py-1 flex  justify-between">
                  <span>Recent Searches</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // keep dropdown open if needed
                      clearRecentSearches();
                    }}
                    className="text-[11px] text-blue-600 hover:underline focus:outline-none cursor-pointer"
                    type="button"
                  >
                    Clear
                  </button>
                </p>
                {recentSearches.map((search, index) => (
                  <button
                    key={`recent-${index}`}
                    onClick={() => handleSuggestionClick(search)}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 ${
                      selectedIndex === index ? "bg-gray-100" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Suggested Searches */}
            {filteredSuggestions.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 px-3 py-1">
                  Suggestions
                </p>
                {filteredSuggestions.map((suggestion, index) => {
                  const actualIndex = recentSearches.length + index;
                  return (
                    <button
                      key={`suggestion-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 ${
                        selectedIndex === actualIndex ? "bg-gray-100" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      <span className="text-sm">{suggestion}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

      {/* Helper Text */}
      <p className="mt-2 text-sm text-gray-500">
        Describe the UI component or pattern you need
      </p>
    </div>
  );
};
