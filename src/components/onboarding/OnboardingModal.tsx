"use client";

import { useState, useEffect } from "react";
import FocusLock from "react-focus-lock";

export const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const pages = [
    {
      title: "Search for Components",
      description:
        "Simply describe what you want to build. Our AI understands natural language and will find the perfect components for your needs.",
      gif: "/onboarding/search.gif",
      example: "Try: 'responsive login form with remember me'",
    },
    {
      title: "Smart Suggestions",
      description:
        "Get instant recommendations with component previews. See exactly what each component looks like before you choose.",
      gif: "/onboarding/modal.gif",
      example: "Browse components with live previews",
    },
    {
      title: "Generate Ready Code",
      description:
        "Get production-ready code instantly. Copy and paste directly into your project with full Visa Nova integration.",
      gif: "/onboarding/generate.gif",
      example: "Export clean, optimized component code",
    },
  ];

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hasSeenOnboarding", "true");
    }
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isOpen) return null;

  const currentPageData = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <FocusLock>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-5 border-b">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {pages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? "bg-blue-600 w-6"
                          : index < currentPage
                          ? "bg-blue-300 w-2"
                          : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {currentPage + 1} of {pages.length}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-400"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* GIF Section */}
              <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 p-10 flex items-center justify-center">
                <div className="w-full max-w-5xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <img
                      src={currentPageData.gif}
                      alt={`${currentPageData.title} demonstration`}
                      className="w-full h-auto"
                      style={{ minHeight: "350px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>

              {/* Text Section */}
              <div className="bg-white px-10 py-3">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    {currentPageData.title}
                  </h2>
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {currentPageData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-8 py-5">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">Don't show this again</span>
                </label>

                <div className="flex gap-3">
                  {currentPage > 0 && (
                    <button
                      onClick={handlePrev}
                      className="px-5 py-2 text-gray-700 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isLastPage ? "Get Started" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FocusLock>
      </div>
    </>
  );
};
