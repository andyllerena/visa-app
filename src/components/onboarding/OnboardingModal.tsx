"use client";

import { useState, useEffect } from "react";

import FocusLock from "react-focus-lock";

export const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <FocusLock>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-slide-up">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome to VPDS Component Suggester!
              </h2>
              <button
                onClick={handleClose}
                className=""
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-gray-500"
                >
                  <path
                    d="M15 5L5 15M5 5l10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                Describe the UI you want to build, and I'll suggest the right
                Visa Nova components with ready-to-use code.
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="">Try these examples:</p>
                <ul className="space-y-1 text-sm">
                  <li>• "responsive login form with remember me"</li>
                  <li>• "data table with sorting"</li>
                  <li>• "card grid layout"</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Don't show this again</span>
              </label>

              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </FocusLock>
      </div>
    </>
  );
};
