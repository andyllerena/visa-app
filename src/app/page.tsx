// src/app/page.tsx
"use client";

import { useState } from "react";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { PromptBox } from "@/components/search/PromptBox";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import { ResultCard } from "@/components/search/ResultCard";
import { scoreResults, ScoredResult } from "@/lib/scorer";
import { Component, Pattern } from "@/types";

export default function HomePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ScoredResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ScoredResult | null>(
    null
  );

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSelectedResult(null);

    try {
      const [componentsRes, patternsRes] = await Promise.all([
        fetch("/api/components"),
        fetch("/api/patterns"),
      ]);

      const components: Component[] = await componentsRes.json();
      const patterns: Pattern[] = await patternsRes.json();

      // Score and rank results
      const scoredResults = scoreResults(query, components, patterns);
      setResults(scoredResults);

      // Auto-select first result if any
      if (scoredResults.length > 0) {
        setSelectedResult(scoredResults[0]);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <OnboardingModal />
      <main className="min-h-screen bg-[#F9FAFB] py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              VPDS Component Suggester
            </h1>
            <p className="text-xl text-gray-600">
              Describe what you want to build, get Nova components instantly
            </p>
          </div>

          {/* Search Box */}
          <div className="mb-8">
            <PromptBox onSearch={handleSearch} isLoading={isSearching} />
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Results List */}
            <div>
              {isSearching ? (
                <SkeletonLoader />
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Found {results.length} matches
                  </h2>
                  {results.map((result, index) => (
                    <ResultCard
                      key={`${result.type}-${result.item.id}`}
                      result={result}
                      onClick={() => setSelectedResult(result)}
                      isActive={selectedResult?.item.id === result.item.id}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Code Preview (placeholder for now) */}
            {selectedResult && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-4">Code Preview</h3>
                <pre className="text-sm bg-gray-50 p-4 rounded overflow-x-auto">
                  {JSON.stringify(selectedResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
