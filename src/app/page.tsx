"use client";

import { useState } from "react";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { PromptBox } from "@/components/search/PromptBox";
import { SkeletonLoader } from "@/components/common/SkeletonLoader";
import { scoreResults, ScoredResult } from "@/lib/scorer";
import { Component, Pattern } from "@/types";
import { Modal } from "@/components/common/Modal";
import { SnippetPanelModal } from "@/components/snippet/SnippetPanelModal";
import { ResultCardGrid } from "@/components/search/ResultCardGrid";
import { GeneratePatternModal } from "@/components/snippet/GeneratePatternModal";

export default function HomePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ScoredResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<ScoredResult | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSelectedResult(null);
    setCurrentSearchQuery(query);

    try {
      const [componentsRes] = await Promise.all([fetch("/api")]);

      const components: Component[] = await componentsRes.json();

      const scoredResults = scoreResults(query, components);
      setResults(scoredResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result: ScoredResult) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedResult(null), 300);
  };

  return (
    <>
      <OnboardingModal />
      <main className="min-h-screen bg-[#F9FAFB] py-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-[#1434CB]">Design </span>
              <span className="text-[#FDB913]">Smarter </span>
              <span className="text-[#1A1F71]">with </span>
              <span className="text-[#1434CB]">VPDS</span>
            </h1>
            <p className="text-xl text-gray-600">
              Gen-VISA: Prompt-Driven UI Generation with Visa’s Product Design
              System
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto mb-12">
            <PromptBox onSearch={handleSearch} isLoading={isSearching} />
          </div>

          {isSearching ? (
            <SkeletonLoader />
          ) : results.length > 0 ? (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Top {results.length} Matches
                </h2>
                <button
                  onClick={() => setShowGenerateModal(true)}
                  className="px-4 py-2 bg-[#1434CB] text-white rounded-lg hover:bg-[#021E4C] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {results.map((result) => (
                  <ResultCardGrid
                    key={`${result.item.id}`}
                    result={result}
                    onClick={() => handleResultClick(result)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </main>

      {/* Code Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedResult && (
          <SnippetPanelModal result={selectedResult} onClose={closeModal} />
        )}
      </Modal>

      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
      >
        <GeneratePatternModal
          searchQuery={currentSearchQuery}
          onClose={() => setShowGenerateModal(false)}
        />
      </Modal>
    </>
  );
}
